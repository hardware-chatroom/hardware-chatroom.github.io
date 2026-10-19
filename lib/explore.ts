import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getProjects } from "./projects";
import { route, type Locale } from "./content";

import type { ExploreItem } from "./explore-copy";

export function getExploreItems(locale: Locale): ExploreItem[] {
  const file = join(process.cwd(), "content", "explore", `${locale}.json`);
  const data: unknown = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(data)) throw new Error(`${file}: expected an array of content entries.`);
  const seen = new Set<string>();
  const items: ExploreItem[] = data.filter(item => item?.draft === false).map(item => {
    for (const key of ["id", "title", "summary", "href"]) if (typeof item[key] !== "string" || !item[key].trim()) throw new Error(`${file}: each published entry needs ${key}.`);
    if (!["article", "event", "live"].includes(item.kind)) throw new Error(`${file}: kind must be article, event, or live.`);
    if (seen.has(item.id)) throw new Error(`${file}: duplicate id ${item.id}.`);
    seen.add(item.id);
    if (!/^(\/(?!\/)|https:\/\/)/.test(item.href)) throw new Error(`${file}: href must be a site path or HTTPS link.`);
    for (const key of ["date", "label"]) if (item[key] !== undefined && typeof item[key] !== "string") throw new Error(`${file}: ${key} must be text.`);
    return { id: `entry-${item.id}`, kind: item.kind, title: item.title, summary: item.summary, href: item.href, date: item.date, label: item.label };
  });
  const projects: ExploreItem[] = getProjects(locale).map(project => ({ id: `project-${project.slug}`, kind: "article", title: project.title, summary: project.summary, href: route(locale, `projects/${project.slug}`), date: project.date, label: project.category }));
  return [...items, ...projects].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
