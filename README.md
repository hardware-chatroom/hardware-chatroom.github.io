# Hardware Chatroom · 硬件唠嗑室

**Talk about hardware. Build something fun.**

The bilingual, responsive website for Hardware Chatroom. Built with Next.js, exported as static files, and hosted on GitHub Pages.

硬件唠嗑室的中英双语官网：白色工作台风格、响应式页面、可安装 PWA、完整静态导出。

## Develop

Use Node.js 24 and pnpm 10 or later.

```sh
pnpm install
pnpm dev
```

## Production preview

```sh
pnpm build
pnpm typecheck
pnpm preview
```

Visit http://127.0.0.1:4173. The production preview includes service-worker registration; development mode deliberately does not register a worker.

## Pages and content

- Chinese: `/`, `/projects/`, `/notes/`, `/about/`, `/join/`.
- English: `/en/` and matching subpages. Language links preserve the current page.
- `lib/content.ts`: paired English/Chinese copy and the first community note.
- `content/projects/<slug>/zh.md` and `en.md`: published project articles, automatically discovered at build time.
- `lib/projects.ts`: Markdown/frontmatter reader, publication checks, and ordering.
- `lib/onboarding.ts`, `components/onboarding.tsx`: the bilingual three-step introduction and participation paths.
- `components/site.tsx`: page composition and metadata.
- `components/navbar.tsx`, `components/pwa.tsx`: navigation and installation/update interactions.
- `app/globals.css`: responsive design, safe-area handling, reduced-motion support.

The homepage workbench is hidden while there are no published projects. No sample projects are displayed. Once an article is published, the homepage (up to four recent items), project list, detail route, sitemap, and offline cache update on the next build. The first field note explains the community's approach; it does not report a fabricated experiment.

The About page preserves the approved organization introduction. Keep its Chinese and English copy aligned with the organization profile in `hardware-chatroom/.github`.

To publish a project, follow [the content guide](content/projects/README.md). Create a folder with a `zh.md` and/or `en.md` file, include its title, summary, quoted date, and `draft: false`, then commit/push. A rebuild automatically publishes it. Drafts and absent translations remain hidden. New GitHub issues do not automatically become website articles; select and write up the material first.

The Join us page explains the public GitHub workflow without requiring organization membership. Four paths (idea, question, helping, and sharing) lead through a short guide to a relevant issue template or existing projects. With no published projects, the helping path explicitly offers starting an idea instead. Website buttons open GitHub; they never submit a post on a visitor's behalf. Issue forms live in `.github/ISSUE_TEMPLATE/`.

## PWA

- Language-specific manifests retain one app identity, with a start URL matching the installation language.
- Standalone window, 192/512px app icons, maskable icon, and Apple touch icon.
- A small footer entry opens installation guidance; compatible browsers offer the native install prompt. Safari/iOS displays Add to Home Screen instructions.
- The post-build script fingerprints the complete static export and precaches both languages and local assets. Navigation uses the network with an offline fallback; static assets are cached locally.
- Updates wait until a visitor presses Update. Offline pages remain available after the first successful service-worker installation.
- External GitHub links require a network connection. Browser and OS installation capabilities differ.

PWA behavior needs HTTPS in production or localhost during development. There is no backend, tracking, login, push service, or runtime GitHub API dependency.

## GitHub Pages

`.github/workflows/pages.yml` validates pull requests and builds/deploys `main` using GitHub Actions. Set repository **Settings → Pages → Source → GitHub Actions** for this workflow. The exported `out/` directory includes `.nojekyll`, `sitemap.xml`, and the generated service worker. Node server features are not used.

## Brand and assets

The original conversation-and-circuit logo is in `public/brand/logo.svg`. See [brand notes](docs/brand.md). The generated concept photograph in `public/images/workbench.webp` illustrates hardware exploration and is not a photograph of a completed community project. Its generation brief is recorded in [asset notes](docs/assets.md).

## Validation checklist

- Production build and TypeScript check.
- Both languages and all 10 page routes.
- Desktop/tablet/mobile widths, including 320px, without horizontal overflow.
- Keyboard navigation, Escape dismissal, language switching, missing images.
- Manifest, icons, service-worker control, offline navigation/fallback, and waiting-worker updates.
- Final deployment status and live asset responses.
