"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { copy, ORG, route, type Locale } from "@/lib/content";
import { Icon, Mark } from "./icons";
import { onboarding } from "@/lib/onboarding";

export default function Navbar({ locale, translatedSlugs }: { locale: Locale; translatedSlugs: Record<Locale, string[]> }) {
  const c = copy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const shell = useRef<HTMLElement>(null);
  const other = locale === "zh" ? "en" : "zh";
  const localPath = pathname.replace(/^\/en(?=\/|$)/, "").replace(/^\/+|\/+$/g, "");
  const languagePath = localPath.startsWith("projects/") && !translatedSlugs[other].includes(localPath.slice(9)) ? "projects" : localPath;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); button.current?.focus(); } };
    const outside = (e: PointerEvent) => { if (!shell.current?.contains(e.target as Node)) setOpen(false); };
    window.addEventListener("keydown", onKey); window.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", outside); };
  }, [open]);
  return <header className="site-header" ref={shell}>
    <div className="nav-wrap container">
      <Link href={route(locale)} className="brand" aria-label="Hardware Chatroom · 硬件唠嗑室" onClick={() => setOpen(false)}><Mark size={34}/><span>Hardware Chatroom<span className="brand-cn">硬件唠嗑室</span></span></Link>
      <nav id="site-nav" className={`navigation ${open ? "is-open" : ""}`} aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
        {["explore", "notes", "about"].map((path, i) => <Link key={path} href={route(locale, path)} className={localPath === path ? "active" : ""} aria-current={localPath === path ? "page" : undefined} onClick={() => setOpen(false)}>{c.nav[i]}</Link>)}
        <span className="nav-divider"/>
        <Link href={route(other, languagePath)} hrefLang={copy[other].lang} lang={copy[other].lang} onClick={() => setOpen(false)} className="language-link">{locale === "zh" ? "EN" : "中文"}<span className="sr-only">{locale === "zh" ? " — Switch to English" : " — 切换到中文"}</span></Link>
        <a href={ORG} className="github-link" aria-label={locale === "zh" ? "GitHub 社区" : "GitHub community"} title={locale === "zh" ? "GitHub 社区" : "GitHub community"}><Icon name="github" size={20}/></a>
      </nav>
      <Link href={route(locale, "join")} className="nav-join" aria-current={localPath === "join" ? "page" : undefined} onClick={() => setOpen(false)}>{onboarding[locale].join}</Link>
      <button className="menu-toggle icon-button" aria-label={open ? c.close : c.menu} aria-expanded={open} aria-controls="site-nav" ref={button} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"}/></button>
    </div>
  </header>;
}
