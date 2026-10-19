"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { route, type Locale } from "@/lib/content";
import { onboarding, issueFor, type Intent } from "@/lib/onboarding";
import { Icon } from "./icons";

export default function Onboarding({ locale, hasProjects }: { locale: Locale; hasProjects: boolean }) {
  const c = onboarding[locale];
  const [step, setStep] = useState(0);
  const [intent, setIntent] = useState<Intent>("idea");
  const [offline, setOffline] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const initial = useRef(true);
  useEffect(() => {
    if (initial.current) { initial.current = false; return; }
    heading.current?.focus();
  }, [step]);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("intent");
    if (query && ["idea", "question", "help", "share"].includes(query)) { setIntent(query as Intent); setStep(1); }
  }, []);
  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync(); window.addEventListener("online", sync); window.addEventListener("offline", sync);
    return () => { window.removeEventListener("online", sync); window.removeEventListener("offline", sync); };
  }, []);
  const selected = c.types[intent];
  const href = intent === "help" ? (hasProjects ? route(locale, "projects") : issueFor("idea")) : issueFor(intent);
  const external = href.startsWith("https:");
  const action = intent === "help" ? (hasProjects ? c.helpCta : c.fallbackCta) : selected.action;
  return <section className="onboarding" aria-label={c.join}>
    <ol className="onboarding-progress" aria-label={locale === "zh" ? "参与步骤" : "Getting started steps"}>{c.steps.map((label, i) => <li key={label} aria-current={step === i ? "step" : undefined} className={step === i ? "current" : step > i ? "complete" : ""}><span>{i + 1}</span>{label}</li>)}</ol>
    <div className="onboarding-panel">
      <p className="eyebrow" aria-live="polite">{locale === "zh" ? `第 ${step + 1} 步 / 共 3 步` : `STEP ${step + 1} OF 3`}</p>
      <h2 ref={heading} tabIndex={-1}>{step === 0 ? c.choose : step === 1 ? selected.title : c.ready}</h2>
      <p className="onboarding-lead">{step === 0 ? c.chooseIntro : step === 1 ? selected.detail : c.readyIntro}</p>
      {step === 0 ? <div className="intent-grid">{(["idea", "question", "help", "share"] as Intent[]).map((key, i) => <button className="intent-card" key={key} onClick={() => { setIntent(key); setStep(1); }}><span className="intent-number">0{i + 1}<Icon name="arrow" size={20}/></span><strong>{c.types[key].title}</strong><span>{c.types[key].text}</span></button>)}</div> : step === 1 ? <>
        <blockquote className="onboarding-example"><span className="eyebrow">{locale === "zh" ? "比如，你可以这样说" : "FOR EXAMPLE"}</span><p>“{selected.example}”</p></blockquote>
        {intent === "help" && <p className="onboarding-help">{hasProjects ? c.helpDescription : c.noProjects}</p>}
        <div className="github-explainer"><Icon name="github" size={21}/><div><strong>{c.githubTitle}</strong><p>{c.githubIntro}</p><p>{c.githubSteps[0]}</p></div></div>
      </> : <>
        <div className="ready-action"><strong>{intent === "help" && !hasProjects ? c.browseReady : selected.title}</strong>{intent === "help" && !hasProjects && <p>{c.noProjects}</p>}<Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="button primary" onClick={event => { if (external && !navigator.onLine) { event.preventDefault(); setOffline(true); } }}>{action}<Icon name={external ? "external" : "arrow"} size={18}/></Link><small>{external ? c.willOpen : c.available}</small></div>
        <details className="github-guide"><summary>{c.githubTitle}</summary><p>{c.githubIntro}</p><ol>{c.githubSteps.map(text => <li key={text}>{text}</li>)}</ol><a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-link">{c.signup}<Icon name="external" size={16}/></a></details>
      </>}
      {offline && <p role="status" className="onboarding-offline">{c.needNetwork}</p>}
      <div className="onboarding-controls">{step > 0 && <button className="text-link" onClick={() => setStep(step - 1)}><Icon name="arrow" size={17} style={{ transform: "rotate(180deg)" }}/>{c.back}</button>}{step === 1 && <button className="button primary" onClick={() => setStep(2)}>{c.next}<Icon name="arrow" size={18}/></button>}{step === 2 && <button className="text-link" onClick={() => setStep(0)}>{c.finish}</button>}</div>
    </div>
    <Link href={route(locale, "explore")} className="onboarding-skip text-link">{c.skip}<Icon name="arrow" size={17}/></Link>
  </section>;
}
