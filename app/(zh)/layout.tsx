import { Document, metadata as siteMetadata, viewport } from "@/components/site";
import "../globals.css";
export { viewport };
export const metadata = siteMetadata("zh");
export default function Layout({ children }: { children: React.ReactNode }) { return <Document locale="zh">{children}</Document>; }
