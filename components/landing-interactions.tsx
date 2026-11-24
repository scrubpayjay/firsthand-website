"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { NAP } from "@/lib/site-config";
import { landingServices, type LandingKind } from "@/lib/landing-pages";
import { captureAttribution, hasTrackingConsent, landingEvent } from "@/lib/landing-tracking";
export function LandingLink({kind,href,children,className,placement}:{kind:LandingKind;href:string;children:ReactNode;className?:string;placement:string}) {
  return <a href={href} className={className} onClick={() => { captureAttribution(); landingEvent(href.startsWith("tel:") ? "phone_click" : "cta_click",kind,{placement,click_url:href}); }}>{children}</a>;
}
export function LandingSticky({kind}:{kind:LandingKind}) {
  useEffect(() => { captureAttribution(); const capture=()=>captureAttribution(); window.addEventListener("firsthand:consent",capture); return ()=>window.removeEventListener("firsthand:consent",capture); },[]);
  return <div className="landing-sticky"><LandingLink kind={kind} href="#estimate" placement="mobile_sticky" className="cta-pill">Free estimate <ArrowRight size={16}/></LandingLink><LandingLink kind={kind} href={`tel:${NAP.phoneTel}`} placement="mobile_sticky" className="landing-sticky-call"><Phone size={16}/> Call now</LandingLink></div>;
}
export function EstimateForm({kind}:{kind:LandingKind}) {
  const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [reference,setReference]=useState("");
  const started=useRef(false); const submission=useRef(""); const pending=useRef(false);
  async function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault(); if(pending.current)return; pending.current=true; setBusy(true);setError("");
    const data=Object.fromEntries(new FormData(e.currentTarget));
    if(!submission.current)submission.current=crypto.randomUUID();
    try {
      const response=await fetch("/api/estimate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,landingPage:kind,submissionId:submission.current,trackingConsent:hasTrackingConsent(),attribution:captureAttribution()})});
      const result=await response.json();
      if(!response.ok || result.ok!==true)throw new Error(result.error || "Please try again or call us.");
      setReference(result.reference);
      // Container v14: lead_form_submit owns GA4 + Ads; generate_lead maps
      // to Meta's standard Lead. Neither event duplicates the other's tag.
      landingEvent("lead_form_submit",kind,{form_id:kind,lead_reference:result.reference});
      landingEvent("generate_lead",kind,{lead_reference:result.reference});
    } catch(err) { setError(err instanceof Error ? err.message : "Please try again or call us."); }
    finally { pending.current=false;setBusy(false); }
  }
  if(reference)return <div role="status" className="estimate-success"><span className="landing-eyebrow">REQUEST RECEIVED</span><h3>Let’s bring your space to life.</h3><p>Your estimate request has been accepted. The Firsthand team will contact you to discuss your project.</p><p className="text-sm">Reference: {reference}</p><a href={`tel:${NAP.phoneTel}`}>Questions? Call {NAP.phone}</a></div>;
  return <form className="estimate-form" onSubmit={submit} onFocusCapture={()=>{if(!started.current){landingEvent("form_start",kind);started.current=true;}}}>
    <fieldset disabled={busy}><legend className="sr-only">Your project details</legend><div className="estimate-fields">
      <label>Name<input name="name" autoComplete="name" required minLength={2} maxLength={100}/></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" required maxLength={40} pattern="[+0-9().\\s\\-]{10,40}"/></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={200}/><small>For your estimate and project follow-up.</small></label>
      <label>ZIP code<input name="zip" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" required maxLength={10}/></label>
      <label className="estimate-wide">Project type<select name="projectType" defaultValue="" required><option value="" disabled>Select your project</option>{landingServices(kind).map(s=><option key={s.title}>{s.title}</option>)}</select></label>
      {kind==="artificial-turf" ? <label className="estimate-wide">Approximate square footage<input name="squareFootage" type="number" inputMode="numeric" min={1} max={9999999} step={1} required placeholder="Your best estimate is fine"/></label> : <>
        <label>Estimated project budget<select name="budget" defaultValue="" required><option value="" disabled>Select a range</option>{["Under $10,000","$10,000–$25,000","$25,000–$50,000","$50,000+","Help me plan"].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Anticipated start date<select name="startDate" defaultValue="" required><option value="" disabled>Select timing</option>{["As soon as possible","1–3 months","3–6 months","Planning ahead"].map(x=><option key={x}>{x}</option>)}</select></label>
      </>}
    </div><div className="estimate-honeypot" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    {error && <p role="alert" className="estimate-error">{error}</p>}
    <button type="submit" className="cta-pill estimate-submit">{busy ? "Sending your request…" : kind==="artificial-turf" ? "Get a Free Artificial Turf Estimate" : "Request Your Free Estimate"}<ArrowRight size={18}/></button>
    <p className="estimate-privacy">By submitting, you ask Firsthand to contact you about this project. This form does not opt you into marketing texts. See our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
    </fieldset>
  </form>;
}
