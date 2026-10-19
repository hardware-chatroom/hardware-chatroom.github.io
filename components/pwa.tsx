"use client";

import { useEffect, useRef, useState } from "react";
import { copy, type Locale } from "@/lib/content";
import { Icon, Mark } from "./icons";

interface InstallEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }>; }

export default function Pwa({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [offline, setOffline] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [ready, setReady] = useState(false);
  const [ios, setIos] = useState(false);
  const [updating, setUpdating] = useState(false);
  const deferred = useRef<InstallEvent | null>(null);
  const registration = useRef<ServiceWorkerRegistration | null>(null);
  const acceptedUpdate = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(display-mode: standalone)");
    const nav = navigator as Navigator & { standalone?: boolean };
    const installed = () => setStandalone(media.matches || Boolean(nav.standalone));
    const connection = () => setOffline(!navigator.onLine);
    const beforeInstall = (e: Event) => { e.preventDefault(); deferred.current = e as InstallEvent; setReady(true); };
    const appInstalled = () => { deferred.current = null; setReady(false); setStandalone(true); dialog.current?.close(); };
    connection(); installed();
    setIos(/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
    window.addEventListener("online", connection); window.addEventListener("offline", connection);
    window.addEventListener("beforeinstallprompt", beforeInstall); window.addEventListener("appinstalled", appInstalled); media.addEventListener("change", installed);
    let disposed = false;
    let refreshing = false;
    const controllerChange = () => { if (!refreshing && acceptedUpdate.current) { refreshing = true; window.location.reload(); } };
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).then(reg => {
        if (disposed) return;
        registration.current = reg;
        if (reg.waiting && navigator.serviceWorker.controller) setUpdating(true);
        reg.addEventListener("updatefound", () => { const worker = reg.installing; worker?.addEventListener("statechange", () => { if (worker.state === "installed" && navigator.serviceWorker.controller) setUpdating(true); }); });
      }).catch(() => { /* The site remains usable when service workers are unavailable. */ });
      // Reload only after the visitor explicitly accepts an update.
      navigator.serviceWorker.addEventListener("controllerchange", controllerChange);
    }
    return () => { disposed = true; window.removeEventListener("online", connection); window.removeEventListener("offline", connection); window.removeEventListener("beforeinstallprompt", beforeInstall); window.removeEventListener("appinstalled", appInstalled); media.removeEventListener("change", installed); navigator.serviceWorker?.removeEventListener("controllerchange", controllerChange); };
  }, []);

  const install = async () => { const event = deferred.current; if (!event) return; await event.prompt(); await event.userChoice; deferred.current = null; setReady(false); dialog.current?.close(); };
  return <>
    {!standalone && <button className="install-link" onClick={() => dialog.current?.showModal()}><Icon name="download" size={16}/>{c.install}</button>}
    <div className="app-notices" aria-live="polite">
      {offline && <div className="app-notice"><span className="status-dot offline"/>{c.offline}</div>}
      {updating && <div className="app-notice"><span>{c.update}</span><button onClick={() => { acceptedUpdate.current = true; registration.current?.waiting?.postMessage({ type: "SKIP_WAITING" }); setUpdating(false); }}>{c.refresh}</button><button aria-label={c.dismiss} onClick={() => setUpdating(false)}><Icon name="close" size={16}/></button></div>}
    </div>
    <dialog ref={dialog} className="install-dialog" aria-labelledby="install-title" onClick={e => { if (e.target === dialog.current) dialog.current?.close(); }}>
      <button className="dialog-close icon-button" onClick={() => dialog.current?.close()} aria-label={c.dismiss}><Icon name="close"/></button>
      <Mark size={64}/><h2 id="install-title">{c.installTitle}</h2><p>{c.installIntro}</p>
      {ready ? <button className="button primary" onClick={install}>{c.installReady}<Icon name="download" size={18}/></button> : <div className="install-instructions">{ios ? c.ios : c.manual}</div>}
      <small>{c.offlineHint}</small>
    </dialog>
  </>;
}
