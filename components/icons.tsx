import type { CSSProperties } from "react";

export function Mark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}><path d="M17 11h30a9 9 0 0 1 9 9v22a9 9 0 0 1-9 9H29L15 59V50a9 9 0 0 1-7-8V20a9 9 0 0 1 9-9Z" fill="currentColor"/><path d="M20 26h10v12h14M38 24h6" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="26" r="3" fill="white"/><circle cx="44" cy="24" r="3" fill="#76d5ab"/><circle cx="44" cy="38" r="3" fill="white"/></svg>;
}

export function Icon({ name, size = 22, style }: { name: string; size?: number; style?: CSSProperties }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    external: <><path d="M7 17 17 7M7 7h10v10"/></>,
    github: <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 6a4.3 4.3 0 0 0-.1-3.5s-1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6 2.2 5 2.5 5 2.5A4.3 4.3 0 0 0 4.9 6a4.7 4.7 0 0 0-1.3 3.5c0 4.7 2.9 5.7 5.6 6A3 3 0 0 0 8.4 18v3.5"/>,
    chip: <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4Z"/></>,
    wave: <><path d="M3 10v4m4-8v12m5-16v20m5-16v12m4-8v4"/></>,
    tool: <><path d="m14 6 4 4M5 19l-1-3L15 5l4 4L8 20l-3-1ZM15 5l2-2 4 4-2 2"/></>,
    cube: <><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10v9M3 8l9 5 9-5M7.5 5.5l9 5"/></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name] || paths.arrow}</svg>;
}
