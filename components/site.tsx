import Link from "next/link";
import type { Metadata, Viewport } from "next";
import { copy, ORG, REPO, SITE, propose, route, type Locale, type Section } from "@/lib/content";
import { Icon, Mark } from "./icons";
import Navbar from "./navbar";
import Pwa from "./pwa";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff" };

export function metadata(locale: Locale, section?: Section): Metadata {
  const c = copy[locale];
  const label = section ? { projects: c.workbench, notes: c.notes, about: c.aboutLabel, join: c.join }[section] : "Talk about hardware. Build something fun.";
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
  return <html lang={copy[locale].lang}><body><a href="#main" className="skip-link">{copy[locale].skip}</a><Navbar locale={locale}/>{children}<Footer locale={locale}/></body></html>;
}

function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <footer className="site-footer container"><div className="footer-top"><Link href={route(locale)} className="brand"><Mark size={30}/><span>Hardware Chatroom<span className="brand-cn">硬件唠嗑室</span></span></Link><p>Stay curious. Keep hacking.</p></div><div className="footer-bottom"><span>{c.footer}</span><div className="footer-links"><a href={ORG}>GitHub <Icon name="external" size={13}/></a><Link href={route(locale, "about")}>{c.nav[2]}</Link><Pwa locale={locale}/></div></div></footer>;
}

function SectionHeading({ title, label, href, action }: { title: string; label?: string; href?: string; action?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{label}</span><h2>{title}</h2></div>{href && <Link href={href} className="text-link">{action}<Icon name="arrow" size={19}/></Link>}</div>;
}

function CircuitArt() {
  return <svg viewBox="0 0 560 330" fill="none" className="circuit-art" aria-hidden="true"><g stroke="#c6d2cb" strokeWidth="2"><path d="M0 115h130l40 40h95m295 85H410l-40-40H265M280 0v90m0 150v90M0 255h125l40-40h80M560 80H420l-50 50h-75"/><circle cx="130" cy="115" r="6" fill="#f2f6f3"/><circle cx="410" cy="240" r="6" fill="#f2f6f3"/><circle cx="125" cy="255" r="6" fill="#f2f6f3"/><circle cx="420" cy="80" r="6" fill="#f2f6f3"/></g><rect x="207" y="94" width="142" height="142" rx="30" fill="#fff" stroke="#d5ded7"/><g transform="translate(230 115) scale(1.5)" color="#1c4232"><Mark size={64}/></g><g stroke="#9db5a6" strokeWidth="3" strokeLinecap="round"><path d="M225 84V65m35 19V65m35 19V65m35 19V65m-105 181v19m35-19v19m35-19v19m35-19v19M197 115h-19m19 35h-19m19 35h-19m19 35h-19m181-105h19m-19 35h19m-19 35h19m-19 35h19"/></g></svg>;
}

function ProjectIdeas({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <><div className="idea-grid">{c.ideas.map((idea, index) => <a href={propose(idea.issue)} className="idea-card" key={idea.art}><div className={`idea-art idea-art-${idea.art}`}>{index === 0 ? <img src="/images/workbench.webp" alt="" width="1440" height="960" loading="lazy"/> : <CircuitArt/>}<span className="art-index">0{index + 1} / {idea.tag}</span></div><div className="idea-meta"><span className="status-tag"><span className="status-dot"/>{c.proposal}</span><Icon name="external" size={20}/></div><h3>{idea.title}</h3><p>{idea.text}</p><span className="idea-action">{c.ideaAction}<Icon name="arrow" size={17}/></span></a>)}</div><p className="section-note">{c.proposalNote}</p></>;
}

function Directions({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <div className="directions-grid">{c.directions.map(([title, description], i) => <div className="direction" key={title}><span className="direction-icon"><Icon name={["chip", "wave", "tool", "cube"][i]} size={26}/></span><h3>{title}</h3><p>{description}</p></div>)}</div>;
}

function Invite({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <section className="invite"><div><span className="eyebrow">GOOD THINGS START WITH A QUESTION</span><h2>{c.invite}<br/><span>{c.inviteEnd}</span></h2><p>{c.inviteText}</p></div><Link href={route(locale, "join")} className="button primary">{c.join}<Icon name="external" size={20}/></Link></section>;
}

export function Home({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return <main id="main" className="container"><section className="hero"><div className="hero-copy"><p className="hero-kicker"><span className="status-dot"/>{c.kicker}</p><h1>Talk about hardware.<br/>Build something fun.</h1>{locale === "zh" && <p className="hero-tagline">{c.tagline}</p>}<p className="hero-intro">{c.intro}</p><div className="hero-actions"><Link href={route(locale, "projects")} className="button primary">{c.join}<Icon name="external" size={20}/></Link><a href={ORG} className="button quiet"><Icon name="github" size={20}/>GitHub<Icon name="external" size={16}/></a></div></div><figure className="hero-visual"><img src="/images/workbench.webp" alt={c.heroAlt} width="1440" height="960" fetchPriority="high"/><figcaption>{c.illustration}</figcaption></figure></section>
    <section className="section workbench"><SectionHeading title={c.workbench} label={c.workbenchEn} href={route(locale, "projects")} action={c.allProjects}/><ProjectIdeas locale={locale}/></section>
    <section className="section notes-section"><SectionHeading title={c.notes} label="KEEP A TRACE" href={route(locale, "notes")} action={c.allNotes}/><Link href={route(locale, "notes")} className="note-preview"><span className="note-type">01 / {c.noteTag}</span><div><h3>{c.noteTitle}</h3><p>{c.noteIntro}</p></div><span className="circle-arrow"><Icon name="arrow"/></span></Link></section>
    <section className="section"><SectionHeading title={c.explore} label="FOLLOW YOUR CURIOSITY"/><Directions locale={locale}/></section>
    <Invite locale={locale}/>
  </main>;
}

export function SectionPage({ locale, section }: { locale: Locale; section: Section }) {
  const c = copy[locale];
  if (section === "projects") return <main id="main" className="container inner-page"><div className="page-intro"><span className="eyebrow">ON THE WORKBENCH</span><h1>{c.workbench}</h1><p>{c.workbenchIntro}</p></div><ProjectIdeas locale={locale}/><section className="section"><SectionHeading title={c.explore} label="FOLLOW YOUR CURIOSITY"/><Directions locale={locale}/></section><Invite locale={locale}/></main>;
  if (section === "notes") return <main id="main" className="container inner-page"><div className="page-intro"><span className="eyebrow">KEEP A TRACE</span><h1>{c.notes}</h1><p>{c.notesLead}</p></div><article className="article"><div className="article-meta"><span className="status-tag">{c.noteTag}</span><span>Hardware Chatroom</span></div><h2>{c.noteTitle}</h2><p className="article-lead">{c.noteIntro}</p>{c.article.map(([title, text]) => <section key={title}><h3>{title}</h3><p>{text}</p></section>)}<a className="text-link" href={propose(locale === "zh" ? "分享一次实验" : "Share an experiment")}>{c.joinSteps[1][2]}<Icon name="external" size={18}/></a></article><Invite locale={locale}/></main>;
  if (section === "join") return <main id="main" className="container inner-page"><div className="page-intro"><span className="eyebrow">MAKE ROOM FOR YOUR IDEAS</span><h1>{c.joinTitle}</h1><p>{c.joinIntro}</p></div><div className="join-grid">{c.joinSteps.map(([title, text, action], i) => <section className="join-card" key={title}><span className="eyebrow">0{i + 1}</span><h2>{title}</h2><p>{text}</p><a href={i === 2 ? REPO : propose(i === 0 ? (locale === "zh" ? "一个新想法" : "A new idea") : (locale === "zh" ? "分享一次实验" : "Share an experiment"))} className="text-link">{action}<Icon name="external" size={18}/></a></section>)}</div><div className="join-signoff"><Mark size={72}/><h2>Stay curious.<br/>Keep hacking.</h2></div></main>;
  return <main id="main" className="container inner-page"><div className="page-intro"><span className="eyebrow">{c.aboutLabel}</span><h1>{c.aboutTitle}</h1></div><div className="about-intro">{c.aboutParagraphs.map(p => <p key={p}>{p}</p>)}</div><section className="section"><SectionHeading title={c.beliefsTitle} label="A FEW THINGS WE BELIEVE"/><div className="beliefs-grid">{c.beliefs.map(([title, text], i) => <div key={title}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section><section className="section"><SectionHeading title={c.explore} label="FOLLOW YOUR CURIOSITY"/><Directions locale={locale}/></section><section className="brand-story"><div className="brand-symbol"><Mark size={140}/></div><div><span className="eyebrow">{c.logoLabel}</span><h2>{c.brandTitle}</h2><p>{c.brandDescription}</p><a href="/brand/logo.svg" download="hardware-chatroom-logo.svg" className="text-link">{c.downloadLogo}<Icon name="download" size={17}/></a></div></section><Invite locale={locale}/></main>;
}
