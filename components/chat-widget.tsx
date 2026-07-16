"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

import type { ChatMessage } from "@/lib/chat-schema";

const STORAGE_KEY = "firsthand:chat-history";
const MAX_HISTORY = 20;
const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hey — I'm the Firsthand assistant. Ask me about lawn care, landscape design, irrigation, sod… anything yard-related in Central Florida. Pricing depends on the project, but I can point you toward an estimate when you're ready.",
};

type LeadState =
  | { kind: "hidden" }
  | { kind: "form" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [lead, setLead] = useState<LeadState>({ kind: "hidden" });
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadInterest, setLeadInterest] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Persist conversation so refreshes don't lose context. localStorage is
  // intentional — we don't want this on the server (PII-free here, but
  // the principle stands).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {
      // ignore
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
    } catch {
      // ignore — private mode
    }
  }, [messages]);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open, streaming]);

  useEffect(() => {
    if (open && !lead.kind.startsWith("form")) inputRef.current?.focus();
  }, [open, lead.kind]);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || streaming) return;
    setStreamError(null);
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setStreaming(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-MAX_HISTORY) }),
      });
      if (res.status === 429) {
        setStreamError("Quick break — too many messages in a row. Try again in a minute.");
        setStreaming(false);
        return;
      }
      if (!res.ok || !res.body) {
        throw new Error(`Chat request failed: ${res.status}`);
      }
      // Append a placeholder assistant message we'll fill via stream.
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.replace(/^data:\s*/, "").trim();
          if (!data || data === "[DONE]") continue;
          try {
            const obj = JSON.parse(data) as { text?: string; error?: string };
            if (obj.error) {
              setStreamError("The assistant hit a snag. Try again, or call us at (407) 337-5191.");
              continue;
            }
            if (obj.text) {
              setMessages((m) => {
                const last = m[m.length - 1];
                if (!last || last.role !== "assistant") return m;
                const updated = [...m];
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + obj.text,
                };
                return updated;
              });
            }
          } catch {
            // skip malformed chunk
          }
        }
      }
    } catch (err) {
      console.error("[chat] send failed", err);
      setStreamError("Couldn't reach the assistant. Try again, or call (407) 337-5191.");
    } finally {
      setStreaming(false);
    }
  }

  function openLeadForm() {
    setLead({ kind: "form" });
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    if (!leadName.trim() || (!leadEmail.trim() && !leadPhone.trim())) return;
    setLead({ kind: "sending" });
    try {
      // Compact transcript: last 6 user/assistant turns, oldest first.
      const transcript = messages
        .slice(-12)
        .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
        .join("\n");
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail || undefined,
          phone: leadPhone || undefined,
          interest: leadInterest || undefined,
          transcript,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);

      // Mirror contact-form.tsx: GTM dataLayer push + Meta Pixel Lead event.
      // fbq is only defined after cookie consent (cookie-banner.tsx gates it),
      // so this naturally respects the same consent state — no extra check
      // needed.
      if (typeof window !== "undefined") {
        type W = typeof window & {
          dataLayer?: Array<Record<string, unknown>>;
          fbq?: (event: string, name: string) => void;
        };
        const w = window as W;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "lead_chat_submit",
          form_id: "chat",
          page_path: window.location.pathname,
        });
        if (typeof w.fbq === "function") w.fbq("track", "Lead");
      }
      setLead({ kind: "sent" });
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Got it — Ryan or someone on the team will reach out within one business day, usually sooner. If it's urgent, the phone is answered around the clock: (407) 337-5191.",
        },
      ]);
    } catch (err) {
      console.error("[chat-lead] submit failed", err);
      setLead({
        kind: "error",
        message: "Couldn't send that — try again, or call (407) 337-5191.",
      });
    }
  }

  return (
    <>
      {/* Floating button — bottom-left so it doesn't fight the cookie banner
          on the right. z-50 sits BELOW the banner (z-[60]) so consent gets
          first claim on attention. */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Firsthand assistant"
          className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-card-hover hover:bg-primary-hover transition-colors sm:px-5 sm:py-3.5"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold">Ask Firsthand</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Firsthand chat assistant"
          className="fixed inset-x-3 bottom-3 top-3 sm:inset-auto sm:bottom-5 sm:left-5 sm:top-auto sm:w-[380px] sm:h-[560px] z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-card-hover"
        >
          <header className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">Ask Firsthand</div>
                <div className="text-[11px] opacity-80">Yard questions, answered fast</div>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-primary-hover"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  }`}
                >
                  {m.content || (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      thinking…
                    </span>
                  )}
                </div>
              </div>
            ))}
            {streamError && (
              <div className="text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
                {streamError}
              </div>
            )}
          </div>

          {lead.kind === "form" || lead.kind === "sending" || lead.kind === "error" ? (
            <form
              onSubmit={submitLead}
              className="border-t border-border bg-elevated px-4 py-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Request an estimate</span>
                <button
                  type="button"
                  onClick={() => setLead({ kind: "hidden" })}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
              <input
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                required
                placeholder="Your name"
                autoComplete="name"
                className="block w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
              <input
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                type="email"
                placeholder="Email (or phone below)"
                autoComplete="email"
                className="block w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
              <input
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                type="tel"
                placeholder="Phone (optional if email above)"
                autoComplete="tel"
                className="block w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
              <input
                value={leadInterest}
                onChange={(e) => setLeadInterest(e.target.value)}
                placeholder="Briefly — what you're hoping to fix"
                className="block w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
              {lead.kind === "error" && (
                <div className="text-xs text-destructive">{lead.message}</div>
              )}
              <button
                type="submit"
                disabled={
                  lead.kind === "sending" ||
                  !leadName.trim() ||
                  (!leadEmail.trim() && !leadPhone.trim())
                }
                className="cta-pill inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
              >
                {lead.kind === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>Send to Ryan</>
                )}
              </button>
            </form>
          ) : lead.kind === "sent" ? (
            <div className="border-t border-border bg-accent text-accent-foreground px-4 py-3 text-xs font-medium">
              Sent — you&apos;ll hear back within one business day.
            </div>
          ) : (
            <div className="border-t border-border bg-elevated px-4 py-2">
              <button
                type="button"
                onClick={openLeadForm}
                className="w-full text-xs font-semibold text-primary hover:text-primary-hover"
              >
                Request an estimate →
              </button>
            </div>
          )}

          <form
            onSubmit={sendMessage}
            className="border-t border-border bg-card px-3 py-2 flex items-end gap-2"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
              placeholder="Ask about your yard…"
              rows={1}
              maxLength={2000}
              className="flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring max-h-32"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cta text-cta-foreground hover:bg-cta-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
