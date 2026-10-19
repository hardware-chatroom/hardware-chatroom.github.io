import Link from "next/link";
import type { Metadata, Viewport } from "next";
import { copy, ORG, SITE, route, type Locale, type Section } from "@/lib/content";
import { Icon, Mark } from "./icons";
import Navbar from "./navbar";
import Pwa from "./pwa";
import Onboarding from "./onboarding";
import { onboarding, issueFor } from "@/lib/onboarding";
import { getProjects } from "@/lib/projects";
import { ProjectList } from "./projects";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff" };

export function metadata(locale: Locale, section?: Section): Metadata {
  const c = copy[locale];
  const label = section ? { projects: c.workbench, notes: c.notes, about: c.aboutLabel, join: onboarding[locale].join }[section] : "Talk about hardware. Build something fun.";
  return {
    metadataBase: new URL(SITE), title: `${label} | Hardware Chatroom · 硬件唠嗑室`, description: c.intro,
    applicationName: "Hardware Chatroom", manifest: locale === "en" ? "/en/manifest.webmanifest" : "/manifest.webmanifest",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "Hardware Chatroom" },
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/icons/apple-touch-icon.png" },
    alternates: { canonical: route(locale, section), languages: { "zh-CN": route("zh", section), en: route("en", section), "x-default": route("zh", section) } },
    openGraph: { type: "website", title: "Hardware Chatroom · 硬件唠嗑室", description: c.intro, url: route(locale, section), siteName: "Hardware Chatroom", locale: locale === "zh" ? "zh_CN" : "en_US", images: [{ url: "/images/social-card.png", width: 1200, height: 630, alt: "Hardware Chatroom — Talk about hardware. Build something fun." }] },
    twitter: { card: "summary_large_image", title: "Hardware Chatroom", description: c.intro, images: ["/images/social-card.png"] },
  };
}

export function Document({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <html lang={copy[locale].lang}><body><a href="#main" className="skip-link">{copy[locale].skip}</a><Navbar locale={locale} translatedSlugs={{ zh: getProjects("zh").map(p => p.slug), en: getProjects("en").map(p => p.slug) }}/>{children}<Footer locale={locale}/></body></html>;
}

function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <footer className="site-footer container"><div className="footer-top"><Link href={route(locale)} className="brand"><Mark size={30}/><span>Hardware Chatroom<span className="brand-cn">硬件唠嗑室</span></span></Link><p>Stay curious. Keep hacking.</p></div><div className="footer-bottom"><span>{c.footer}</span><div className="footer-links"><a href={ORG}>GitHub <Icon name="external" size={13}/></a><Link href={route(locale, "about")}>{c.nav[2]}</Link><Pwa locale={locale}/></div></div></footer>;
}

function SectionHeading({ title, label, href, action }: { title: string; label?: string; href?: string; action?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{label}</span><h2>{title}</h2></div>{href && <Link href={href} className="text-link">{action}<Icon name="arrow" size={19}/></Link>}</div>;
}

function Directions({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <div className="directions-grid">{c.directions.map(([title, description], i) => <div className="direction" key={title}><span className="direction-icon"><Icon name={["chip", "wave", "tool", "cube"][i]} size={26}/></span><h3>{title}</h3><p>{description}</p></div>)}</div>;
}

function Invite({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section className="invite"><div><span className="eyebrow">GOOD THINGS START WITH A QUESTION</span><h2>{c.invite}<br/><span>{c.inviteEnd}</span></h2><p>{c.inviteText}</p></div><Link href={route(locale, "join")} className="button primary">{onboarding[locale].join}<Icon name="arrow" size={20}/></Link></section>;
}

function HowToPlay({ locale }: { locale: Locale }) {
  const c = onboarding[locale];
  return <section className="section how-to-play" id="how-to-play"><SectionHeading title={c.how} label="GET CURIOUS. GET INVOLVED." href={route(locale, "join")} action={c.start}/><div className="how-grid">{c.howSteps.map(([title, text], i) => <Link href={route(locale, "join") + "?intent=" + ["idea", "help", "share"][i]} key={title} className="how-step"><span className="eyebrow">0{i + 1}<Icon name="arrow" size={18}/></span><h3>{title}</h3><p>{text}</p></Link>)}</div></section>;
}

export function Home({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const projects = getProjects(locale);
  return <main id="main" className="container"><section className="hero"><div className="hero-copy"><p className="hero-kicker"><span className="status-dot"/>{c.kicker}</p><h1>Talk about hardware.<br/>Build something fun.</h1>{locale === "zh" && <p className="hero-tagline">{c.tagline}</p>}<p className="hero-intro">{c.intro}</p><div className="hero-actions"><Link href={route(locale, "join")} className="button primary">{c.join}<Icon name="external" size={20}/></Link><a href={ORG} className="button quiet"><Icon name="github" size={20}/>GitHub<Icon name="external" size={16}/></a></div></div><figure className="hero-visual"><img src="/images/workbench.webp" alt={c.heroAlt} width="1440" height="960" fetchPriority="high"/><figcaption>{c.illustration}</figcaption></figure></section>
    <HowToPlay locale={locale}/>
    {projects.length > 0 && <section className="section workbench"><SectionHeading title={c.workbench} label={c.workbenchEn} href={route(locale, "projects")} action={c.allProjects}/><ProjectList locale={locale} projects={projects.slice(0, 4)}/></section>}
    <section className="section notes-section"><SectionHeading title={c.notes} label="KEEP A TRACE" href={route(locale, "notes")} action={c.allNotes}/><Link href={route(locale, "notes")} className="note-preview"><span className="note-type">01 / {c.noteTag}</span><div><h3>{c.noteTitle}</h3><p>{c.noteIntro}</p></div><span className="circle-arrow"><Icon name="arrow"/></span></Link></section>
    <section className="section"><SectionHeading title={c.explore} label="FOLLOW YOUR CURIOSITY"/><Directions locale={locale}/></section>
    <Invite locale={locale}/>
  </main>;
}

export function SectionPage({ locale, section }: { locale: Locale; section: Section }) {
  const c = copy[locale];
  if (section === "projects") {
    const projects = getProjects(locale); const guide = onboarding[locale];
    return <main id="main" className="container inner-page"><div className="page-intro"><span className="eyebrow">ON THE WORKBENCH</span><h1>{c.workbench}</h1>{projects.length > 0 && <p>{c.workbenchIntro}</p>}</div>{projects.length > 0 ? <ProjectList locale={locale} projects={projects}/> : <section className="empty-workbench"><Icon name="plus" size={28}/><h2>{guide.empty}</h2><p>{guide.emptyText}</p><Link href={route(locale, "join")} className="text-link">{guide.join}<Icon name="arrow" size={18}/></Link></section>}<Invite locale={locale}/></main>;
  }
  if (section === "notes") return <main id="main" className="container inner-page"><div className="page-intro"><span className="eyebrow">KEEP A TRACE</span><h1>{c.notes}</h1><p>{c.notesLead}</p></div><article className="article"><div className="article-meta"><span className="status-tag">{c.noteTag}</span><span>Hardware Chatroom</span></div><h2>{c.noteTitle}</h2><p className="article-lead">{c.noteIntro}</p>{c.article.map(([title, text]) => <section key={title}><h3>{title}</h3><p>{text}</p></section>)}<a className="text-link" href={issueFor("share")}>{c.joinSteps[1][2]}<Icon name="external" size={18}/></a></article><Invite locale={locale}/></main>;
  if (section === "join") return <main id="main" className="container inner-page"><div className="page-intro onboarding-intro"><span className="eyebrow">MAKE ROOM FOR YOUR IDEAS</span><h1>{onboarding[locale].join}</h1></div><Onboarding locale={locale} hasProjects={getProjects(locale).length > 0}/></main>;
  return <main id="main" className="container inner-page"><div className="page-intro"><span className="eyebrow">{c.aboutLabel}</span><h1>{c.aboutTitle}</h1></div><div className="about-intro">{c.aboutParagraphs.map(p => <p key={p}>{p}</p>)}</div><section className="section"><SectionHeading title={c.beliefsTitle} label="A FEW THINGS WE BELIEVE"/><div className="beliefs-grid">{c.beliefs.map(([title, text], i) => <div key={title}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section><section className="section"><SectionHeading title={c.explore} label="FOLLOW YOUR CURIOSITY"/><Directions locale={locale}/></section><section className="brand-story"><div className="brand-symbol"><Mark size={140}/></div><div><span className="eyebrow">{c.logoLabel}</span><h2>{c.brandTitle}</h2><p>{c.brandDescription}</p><a href="/brand/logo.svg" download="hardware-chatroom-logo.svg" className="text-link">{c.downloadLogo}<Icon name="download" size={17}/></a></div></section><Invite locale={locale}/></main>;
}
