"use client";

import { useState } from "react";
import Link from "next/link";
import { exploreCopy, type ExploreItem } from "@/lib/explore-copy";
import type { Locale } from "@/lib/content";
import { Icon } from "./icons";

export default function ExploreFeed({ locale, items }: { locale: Locale; items: ExploreItem[] }) {
  const c = exploreCopy[locale];
  const [filter, setFilter] = useState<"all" | ExploreItem["kind"]>("all");
  const shown = filter === "all" ? items : items.filter(item => item.kind === filter);
  return <div className="explore-feed"><div className="explore-filters" role="group" aria-label={locale === "zh" ? "内容分类" : "Content categories"}>{(["all", "article", "event", "live"] as const).map(kind => <button key={kind} aria-pressed={filter === kind} onClick={() => setFilter(kind)} className={filter === kind ? "selected" : ""}>{c[kind]}</button>)}</div><div className="explore-results" aria-live="polite" aria-atomic="true">{shown.length > 0 ? <div className="explore-grid">{shown.map(item => <article className="explore-card" key={item.id}><div className="explore-meta"><span className="status-tag">{c[item.kind]}</span>{item.date && <span>{item.date}</span>}</div><h2>{item.title}</h2><p>{item.summary}</p>{item.label && <span className="eyebrow">{item.label}</span>}<Link href={item.href} className="text-link" target={item.href.startsWith("https:") ? "_blank" : undefined} rel={item.href.startsWith("https:") ? "noopener noreferrer" : undefined}>{item.kind === "article" ? c.read : item.kind === "event" ? c.eventAction : c.liveAction}<Icon name={item.href.startsWith("https:") ? "external" : "arrow"} size={18}/></Link></article>)}</div> : <div className="explore-empty"><span className="explore-empty-icon"><Icon name="wave" size={28}/></span><h2>{filter === "all" ? c.emptyTitle : c.emptyCategory}</h2><p>{c.emptyText}</p></div>}</div></div>;
}
