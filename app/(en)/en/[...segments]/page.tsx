import { notFound } from "next/navigation";
import { metadata, SectionPage } from "@/components/site";
import { ProjectArticle, projectMetadata } from "@/components/projects";
import { getProjects } from "@/lib/projects";
import { sections, type Section } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return [...sections.map(section => ({ segments: [section] })), ...getProjects("en").map(project => ({ segments: ["projects", project.slug] }))]; }
export async function generateMetadata({ params }: { params: Promise<{ segments: string[] }> }) { const { segments } = await params; if (segments.length === 1 && sections.includes(segments[0] as Section)) return metadata("en", segments[0] as Section); const project = segments.length === 2 && segments[0] === "projects" ? getProjects("en").find(p => p.slug === segments[1]) : undefined; return project ? projectMetadata("en", project) : {}; }
export default async function Page({ params }: { params: Promise<{ segments: string[] }> }) { const { segments } = await params; if (segments.length === 1 && sections.includes(segments[0] as Section)) return <SectionPage locale="en" section={segments[0] as Section}/>; const project = segments.length === 2 && segments[0] === "projects" ? getProjects("en").find(p => p.slug === segments[1]) : undefined; if (!project) notFound(); return <ProjectArticle locale="en" project={project}/>; }
