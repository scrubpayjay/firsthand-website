"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Sparkles } from "lucide-react";
const ChatWidget = dynamic(
  () => import("@/components/chat-widget").then((m) => m.ChatWidget),
  { ssr: false },
);
// Keep the existing assistant available without downloading its UI until asked.
export function ChatLauncher() {
  const [launched, setLaunched] = useState(false);
  if (launched) return <ChatWidget initialOpen />;
  return (
    <button
      type="button"
      onClick={() => setLaunched(true)}
      aria-label="Ask Firsthand — open chat assistant"
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-card-hover hover:bg-primary-hover transition-colors sm:px-5 sm:py-3.5"
    >
      <Sparkles className="h-4 w-4" />
      <span className="text-sm font-semibold">Ask Firsthand</span>
    </button>
  );
}
