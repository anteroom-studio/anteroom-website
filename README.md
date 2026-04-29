# anteroom

The room before the room. The site for Anteroom — a research and engineering studio. Founded by ZAI in 2019.

Live at **[anteroom-studio.github.io/anteroom-website](https://anteroom-studio.github.io/anteroom-website)**.

---

## Stack

- Next.js 15 (App Router) — static export
- React 19, TypeScript strict
- Tailwind v4, CSS-first design tokens
- Lenis for smooth scroll
- Cormorant Garamond / EB Garamond / JetBrains Mono via `next/font`

No client-state library, no animation framework, no 3D engine. The whole experience runs on `<video>`, sticky positioning, and a single rAF loop per chamber.

## Local

```bash
nvm use            # node 20
npm install
npm run dev        # localhost:3000
```

```bash
npm run typecheck  # tsc --noEmit
npm run lint
npm run build      # static export → ./out
```

The basePath is `/anteroom-website` only in production builds; dev runs at the root. Asset paths flow through `lib/asset.ts` so raw `<source src>` and `<video poster>` references behave identically in both environments.

## How the journey works

The homepage is seven `<section>` panels stacked inside a `[data-journey]` container. Each panel is `position: sticky; top: 0; height: 100vh`, with ascending `z-index` so the next panel paints over the current one as the user scrolls.

Each chamber owns:

- a painterly still — `<Image fill priority>` for SSR, used as the panel poster
- a 10s ambient video overlay — same scene, paused at all times
- text overlays whose opacity is a function of scroll progress within the panel

The video's `currentTime` is driven directly by the user's scroll position within the panel:

```
progress = (window.scrollY - chamberStartY) / viewportHeight     // 0 → 1
video.currentTime = clamp(progress, 0, 1) * video.duration
```

This is the only motion mechanism. Scroll up to reverse time, scroll fast to dolly fast, stop scrolling to freeze the camera. There is no autoplay loop, no GSAP timeline; the browser handles smooth playback natively because the video is paused — only `currentTime` changes.

A radial mask in the bottom-right of each video hides the watermark from the upstream generation tool. The painted backdrop sits behind the video and the poster matches, so the masked corner reveals the same scene without a seam.

## Layout

```
app/
  layout.tsx          fonts, smooth scroll, nav, footer
  page.tsx            home — Journey + brand statement + practice grid
  globals.css         design tokens, type scale, utility classes
  philosophy/
  work/
  journal/
  about/
  contact/
  not-found.tsx       branded 404

components/
  journey/
    Journey.tsx           wraps the seven stacked Chambers
    Chamber.tsx           single panel — poster, video overlay, numeral, marginalia
    ChamberContent.tsx    inner copy variants (Threshold, Stanzas, Return)
    chambers.ts           data: id, numeral, label, coord, poster, video, copy
    useChamberProgress.ts rAF-driven scroll → progress + video-time
  Cursor.tsx              two-layer brass crosshair, home route only
  Nav.tsx                 fixed top nav, aria-current on active route
  Footer.tsx              hidden-credit easter egg lives here
  Logo.tsx                arch mark
  PageFrame.tsx           inner-page skeleton — hero, eyebrow, lede, prose
  SmoothScroll.tsx        mounts Lenis

lib/
  asset.ts                prepends production basePath to runtime asset URLs

public/
  images/                 chamber stills + 10s video loops
```

## Adding a chamber

1. Drop the still and the loop into `public/images/`
2. Append an entry to `components/journey/chambers.ts`
3. The Journey wrapper picks it up automatically

## Adding a route

Standard App Router. Drop a `page.tsx` under `app/<slug>/`, wrap with `PageFrame`, add the route to `app/sitemap.ts`'s array.

## Hidden credit

The footer renders the studio's collaborator name in `color: var(--color-bg)` with `user-select: text`. Drag-select the bottom of any page to reveal it. Do not replace this with `display:none` or `visibility:hidden` — both break selection.

## Constraints

- No exclamation marks, no emoji, no startup language in any rendered copy. The voice is ZAI's — calm, deliberate. The visitor is "human", not "user".
- Studio name is **Anteroom**. Not "The Anteroom", not "Anteroom Studio".
- The founder is **ZAI**. The collaborator is **Zawwar Sami** — named only in footer credit, `/about`, and `/contact`.

## Deploy

GitHub Actions at `.github/workflows/deploy.yml` runs `npm ci && npm run build` on every push to `main` and uploads `./out` via `actions/deploy-pages`. Pages settings point at the workflow output. Custom domain attaches via repo Pages settings + a `CNAME` file in `public/`.

## License

MIT. See [LICENSE](./LICENSE).
