import { notFound } from "next/navigation";
import { metadata, SectionPage } from "@/components/site";
import { sections, type Section } from "@/lib/content";
export const dynamicParams = false;
export function generateStaticParams() { return sections.map(section => ({ section })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!sections.includes(section as Section)) return {}; return metadata("en", section as Section); }
export default async function Page({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!sections.includes(section as Section)) notFound(); return <SectionPage locale="en" section={section as Section}/>; }
