import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";
import type { Locale } from "./content";

export type Project = { slug: string; locale: Locale; title: string; summary: string; date: string; category: string; status: string; cover?: string; discussion?: string; body: string };
const root = join(process.cwd(), "content", "projects");
const escape = (text: string) => text.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
const safeUrl = (value: string) => /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(value);

export function getProjects(locale: Locale): Project[] {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory() && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)).flatMap(entry => {
    const file = join(root, entry.name, `${locale}.md`);
    if (!existsSync(file)) return [];
    const { data, content } = matter(readFileSync(file, "utf8"));
    if (data.draft !== false) return [];
    for (const field of ["title", "summary", "date"]) if (typeof data[field] !== "string" || !data[field].trim()) throw new Error(`${file}: published projects require a text ${field}.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) throw new Error(`${file}: use a quoted YYYY-MM-DD date.`);
    if (data.cover && (typeof data.cover !== "string" || !/^\/images\/[a-zA-Z0-9/_.-]+$/.test(data.cover) || data.cover.includes(".."))) throw new Error(`${file}: cover must be a local /images/ path.`);
    if (data.cover && !existsSync(join(process.cwd(), "public", data.cover))) throw new Error(`${file}: cover image does not exist.`);
    if (data.discussion && (typeof data.discussion !== "string" || !/^https:\/\/github\.com\/hardware-chatroom\/[a-zA-Z0-9_.-]+\/(issues|discussions)\/\d+$/.test(data.discussion))) throw new Error(`${file}: discussion must link to an existing community issue or discussion.`);
    return [{ slug: entry.name, locale, title: data.title, summary: data.summary, date: data.date, category: typeof data.category === "string" ? data.category : "Hardware", status: typeof data.status === "string" ? data.status : (locale === "zh" ? "探索中" : "Exploring"), cover: data.cover, discussion: data.discussion, body: content }];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function projectHtml(body: string): string {
  const renderer = new Renderer();
  renderer.html = () => "";
  renderer.link = ({ href, tokens }) => {
    const text = marked.Parser.parseInline(tokens, { renderer });
    return safeUrl(href) ? `<a href="${escape(href)}">${text}</a>` : text;
  };
  renderer.image = ({ href, text }) => safeUrl(href) ? `<img src="${escape(href)}" alt="${escape(text)}" loading="lazy">` : escape(text);
  return marked.parse(body, { renderer, async: false }) as string;
}
