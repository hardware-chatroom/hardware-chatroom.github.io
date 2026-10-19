import Link from "next/link";
import type { Metadata } from "next";
import { copy, route, SITE, type Locale } from "@/lib/content";
import { onboarding } from "@/lib/onboarding";
import { getProjects, projectHtml, type Project } from "@/lib/projects";
import { Icon } from "./icons";

export function ProjectList({ locale, projects }: { locale: Locale; projects: Project[] }) {
  const c = onboarding[locale];
  return <div className="idea-grid">{projects.map(project => <Link href={route(locale, `projects/${project.slug}`)} className="idea-card" key={project.slug}>{project.cover && <div className="idea-art"><img src={project.cover} alt="" loading="lazy"/></div>}<div className="idea-meta"><span className="status-tag">{project.status}</span><span className="eyebrow">{project.category}</span></div><h3>{project.title}</h3><p>{project.summary}</p><span className="idea-action">{c.read}<Icon name="arrow" size={17}/></span></Link>)}</div>;
}

export function projectMetadata(locale: Locale, project: Project): Metadata {
  const languages: Record<string, string> = {};
  for (const language of ["zh", "en"] as const) if (getProjects(language).some(p => p.slug === project.slug)) languages[copy[language].lang] = route(language, `projects/${project.slug}`);
  return { metadataBase: new URL(SITE), title: `${project.title} | Hardware Chatroom`, description: project.summary, alternates: { canonical: route(locale, `projects/${project.slug}`), languages }, openGraph: { type: "article", title: project.title, description: project.summary, url: route(locale, `projects/${project.slug}`), ...(project.cover ? { images: [project.cover] } : {}) } };
}

export function ProjectArticle({ locale, project }: { locale: Locale; project: Project }) {
  const c = onboarding[locale];
  return <main id="main" className="container inner-page"><Link href={route(locale, "projects")} className="text-link"><Icon name="arrow" size={18} style={{ transform: "rotate(180deg)" }}/>{c.backProjects}</Link><article className="article project-article"><header><div className="article-meta"><span className="status-tag">{project.status}</span><time dateTime={project.date}>{project.date}</time><span>{project.category}</span></div><h1>{project.title}</h1><p className="article-lead">{project.summary}</p>{project.cover && <img className="article-cover" src={project.cover} alt=""/>}</header><div className="markdown" dangerouslySetInnerHTML={{ __html: projectHtml(project.body) }}/><div className="article-participate">{project.discussion ? <a href={project.discussion} target="_blank" rel="noopener noreferrer" className="button primary">{c.discuss}<Icon name="external" size={18}/></a> : <Link href={route(locale, "join")} className="button primary">{c.join}<Icon name="arrow" size={18}/></Link>}</div></article></main>;
}
