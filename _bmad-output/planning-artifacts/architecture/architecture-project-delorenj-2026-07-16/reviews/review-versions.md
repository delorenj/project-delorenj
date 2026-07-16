---
title: 'Version-Currency Review — Career Ascent Architecture Spine'
type: architecture-review
review-kind: version-currency
target: '../ARCHITECTURE-SPINE.md'
reviewer: version-currency reviewer (web-verified)
date: '2026-07-16'
verdict: PASS-WITH-CONCERNS
---

# Version-Currency Review — Architecture Spine (Career Ascent)

**Scope:** verify every pinned technology in the Stack table, AD-7, AD-12, AD-13, and Deferred
was web-researched and is (a) real + current/stable, (b) still maintained (not abandoned),
(c) cross-compatible — as of **2026-07-16**. Every row below carries the source URL used.

**Verdict: PASS-WITH-CONCERNS.** Every committed baseline pin resolves to a real, current,
mutually-compatible release. The R3F↔React19↔three-r185 interlock holds. Both staleness flags
the spine already makes are **CONFIRMED** with sources (the spine correctly routed both away from
the runtime baseline). Concerns are minor and sourced: `detect-gpu`'s benchmark corpus froze
Dec 2025, a few postprocessing effects misbehave on React 19, and the Rapier/drei lines have gone
quiet — none invalidates a decision, all are watch-items.

---

## 1. Stack table — pinned baseline

| Pin (spine) | Verified current (2026-07-16) | Exists? | Maintained? | Fits? | Source |
| --- | --- | --- | --- | --- | --- |
| TypeScript 5.x | 5.x current line | ✅ | ✅ | ✅ | (industry baseline; not separately contested) |
| **Next.js 16.2.x (LTS)** | **16.2.10 LTS** (July 2026); 16.2.7 was stable in June | ✅ | ✅ active | ✅ | [nextjs.org/blog/next-16-2](https://nextjs.org/blog/next-16-2), [endoflife.date/nextjs](https://endoflife.date/nextjs), [eosl.date](https://eosl.date/eol/product/nextjs/) |
| **@opennextjs/cloudflare 1.20.x** | **1.20.1** latest (patch on 1.20.0); 1.19.9 bumped bundled Next to 15.5.18 / **16.2.6** | ✅ | ✅ active | ✅ supports all Next 16 minors | [github releases](https://github.com/opennextjs/opennextjs-cloudflare/releases), [opennext.js.org/cloudflare](https://opennext.js.org/cloudflare) |
| **React 19.x** | **19.2.7** (June 2026) | ✅ | ✅ | ✅ | [react.dev/versions](https://react.dev/versions) |
| **three 0.185.x** | **0.185.1** (r185 tagged 2026-06-25; .1 ~2 wks before review) | ✅ | ✅ very active | ✅ | [github r185](https://github.com/mrdoob/three.js/releases/tag/r185), [npm three](https://www.npmjs.com/package/three) |
| **@react-three/fiber 9.6.x** | **9.6.1** (2026-04-28); v9 pairs React 19.0–19.2 (9.5.0 added 19.2 `Activity`) | ✅ | ✅ active | ✅ | [github r3f releases](https://github.com/pmndrs/react-three-fiber/releases), [v9 migration guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide) |
| **@react-three/drei 10.7.x** | **10.7.7** latest stable (v10 is the R3F-v9/React-19 line; v11 in alpha) | ✅ | ⚠️ stable line quiet ~8 mo | ✅ | [npm drei](https://www.npmjs.com/package/@react-three/drei), [drei disc #2213](https://github.com/pmndrs/drei/discussions/2213) |
| **@react-three/rapier 2.2.x** (post-MVP) | **2.2.0** (2024-11-03, latest); v2 = "react 19 + @react-three/fiber v9 support" | ✅ | ⚠️ line ~20 mo old | ✅ | [github rapier releases](https://github.com/pmndrs/react-three-rapier/releases), [npm rapier](https://www.npmjs.com/package/@react-three/rapier) |
| **gsap 3.13.x + ScrollTrigger** | **3.13** current; 100% free incl. ALL plugins (ScrollTrigger, SplitText, MorphSVG…), commercial use OK | ✅ | ✅ active (Webflow-backed) | ✅ | [gsap.com/blog/3-13](https://gsap.com/blog/3-13/), [webflow.com/updates/gsap-becomes-free](https://webflow.com/updates/gsap-becomes-free), [gsap.com/pricing](https://gsap.com/pricing/) |
| **lenis 1.3.x (lenis/react)** | 1.3.x current; `lenis/react` is the live import; Darkroom Engineering maintains | ✅ | ✅ active | ✅ | [npm lenis](https://www.npmjs.com/package/lenis), [lenis/react README](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md) |
| **zustand 5.x** | **5.0.14** (May 2026); v5 native `useSyncExternalStore`, React 19-ready | ✅ | ✅ active | ✅ | [github zustand releases](https://github.com/pmndrs/zustand/releases), [npm zustand](https://www.npmjs.com/package/zustand) |
| **@pmndrs/detect-gpu (latest)** | **6.0.11** (published ~4 days before review) | ✅ | ✅ active | ✅ | [npm @pmndrs/detect-gpu](https://www.npmjs.com/package/@pmndrs/detect-gpu) |
| **@react-three/postprocessing (latest, R3F-v9)** | current line supports @react-three/fiber@9 + react ≥19, three ≥0.156 (types); ESM-only | ✅ | ✅ active | ⚠️ some effects buggy on R19 | [github react-postprocessing releases](https://github.com/pmndrs/react-postprocessing/releases), [drei disc #2213](https://github.com/pmndrs/drei/discussions/2213) |
| **@next/mdx (Next 16-compatible)** | **16.2.10** (published ~9 days before review); official, tracks Next core | ✅ | ✅ active | ✅ App Router/RSC | [npm @next/mdx](https://www.npmjs.com/package/@next/mdx), [Next MDX guide](https://nextjs.org/docs/app/guides/mdx) |
| **Hosting: CF Workers (OpenNext) + R2 + KV** | see §3 (limits all current) | ✅ | ✅ | ✅ | see §3 |

**Interlock check (the load-bearing chain):** React **19.2.7** ↔ R3F **9.6.1** (explicitly supports
19.0–19.2) ↔ three **0.185.1** (R3F is three-version-agnostic; postprocessing needs three ≥0.156 for
types, r185 clears it) ↔ drei **10.7.7** (v10 = the R3F-v9 line) ↔ rapier **2.2.0** (v2 = R3F-v9/React-19)
↔ postprocessing (current = R3F-v9/React-19). **The chain interlocks — no version straddles a major
boundary it shouldn't.** Note the drei peer-dep friction reported online is against **drei v9** (which
pinned `@react-three/fiber ">=8.0"`); the spine correctly pins **drei v10**, which is the aligned line.

---

## 2. Spine claims re-verified

### AD-12 — "next-on-pages is deprecated; use OpenNext" — ✅ CONFIRMED
`@cloudflare/next-on-pages` is officially deprecated with an npm deprecation message directing users to
the OpenNext Cloudflare adapter; Cloudflare's own docs now recommend deploying Next.js via
`@opennextjs/cloudflare` on **Workers** (Node runtime), not Pages/Edge runtime. The spine's choice and
its "not used (deprecated)" note are accurate.
Source: [npm next-on-pages](https://www.npmjs.com/package/@cloudflare/next-on-pages),
[Cloudflare Workers Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/),
[Cloudflare blog: deploying with OpenNext](https://blog.cloudflare.com/deploying-nextjs-apps-to-cloudflare-workers-with-the-opennext-adapter/).

### AD-7 — Theatre.js `@theatre/r3f` "~2y stale" — ✅ CONFIRMED (refutes nothing; supports the spine)
`@theatre/r3f` latest is **0.7.2**, last published **~2 years ago (≈May 2024)**; still flagged pre-release
("API… will drastically change"), single maintainer, slowed cadence. This **confirms** the spine's
`[ASSUMPTION]` that Theatre.js be dev-only/baked-to-`state.json`, never a runtime dep. Keeping the
runtime authority as a code-authored GSAP timeline is the correct call.
Source: [npm @theatre/r3f](https://www.npmjs.com/package/@theatre/r3f),
[theatrejs.com releases](https://www.theatrejs.com/docs/latest/releases).

### Deferred — `@14islands/r3f-scroll-rig` "8.15.0, ~1yr+ stale, React 19 compat unconfirmed" — ✅ CONFIRMED
Latest is **8.15.0**, last published **~1 year ago**; no published React 19 compatibility statement found.
The spine's decision to keep this behind a throwaway spike (vs. hand-rolling the single-GlobalCanvas +
DOM-tunnel) is well-founded.
Source: [npm @14islands/r3f-scroll-rig](https://www.npmjs.com/package/@14islands/r3f-scroll-rig),
[github r3f-scroll-rig](https://github.com/14islands/r3f-scroll-rig).

### Deferred — "WebGPU exists but not the launch bet" — ✅ CONFIRMED as still-correct-to-defer
three ships a production WebGPU renderer (GA since r171, Sept 2025; Safari 26 added WebGPU). R3F **v10 is
in alpha** carrying WebGPU. Deferring WebGPU to a WebGL2 baseline remains defensible for a
broad-compatibility portfolio launch; revisit once R3F v10 is stable.
Source: [three r185 notes / utsubo 2026 recap](https://www.utsubo.com/blog/threejs-2026-what-changed),
[github r3f releases (v10 alpha)](https://github.com/pmndrs/react-three-fiber/releases).

---

## 3. Cloudflare limits cited in AD-12 / AD-13 — all ✅ CURRENT

| Cited limit | Verified (2026-07-16) | Source |
| --- | --- | --- |
| Server Worker bundle **~10 MiB** (gzip) | **10 MiB after compression on Workers Paid** (3 MiB free; 64 MiB pre-compression). Only gzipped size counts. | [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) |
| Max static asset file **25 MiB** | **25 MiB per individual asset file, unchanged for all customers.** | [Static assets billing & limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) |
| **R2 zero egress** | Confirmed: no egress/data-transfer charges via Workers API, S3 API, or r2.dev. | [R2 pricing](https://developers.cloudflare.com/r2/pricing/), [cloudflare.com/products/r2](https://www.cloudflare.com/products/r2/) |

The AD-12 "3D binaries in R2 behind `assets.jaradd.com`, immutable, 206 range" pattern and the AD-13
"Worker bundle under limit" CI gate both rest on numbers that are still exactly right. (Aside: the
~10 MiB gzip cap is *why* AD-12's "R3F/Three are client-only, never in the server Worker bundle" rule
matters — that constraint is real and correctly load-bearing.)

---

## 4. Findings (flag list)

- **[MED] `@pmndrs/detect-gpu` benchmark corpus is frozen (Dec 2025).** The package (6.0.11) is actively
  maintained, but its GPU benchmark data source (gfxbench.com) **stopped updating December 2025**;
  maintainers are "exploring alternatives." Boot-time tiering (AD-9) may **misclassify GPUs released after
  Dec 2025** into a wrong Fidelity Tier. *Mitigated by design:* AD-9/AD-13 drive runtime tier via
  `PerformanceMonitor` hysteresis + the <40 fps auto-downgrade, so a bad initial guess self-corrects. No
  spine change required; treat detect-gpu output as a *seed*, not a verdict.
  Source: [npm @pmndrs/detect-gpu](https://www.npmjs.com/package/@pmndrs/detect-gpu).

- **[MED] `@react-three/postprocessing`: specific effects misbehave on React 19.** Community reports flag
  **Godrays, Lensflare, and FXAA** misbehaving under React 19, and drei+EffectComposer combos occasionally
  needing `__r3f` patches. The library overall supports R3F v9/React 19, but AD-13's "selective bloom"
  EffectComposer should be validated in a spike and the flaky effects avoided/patched. Pinning "latest"
  (spine) is slightly risky for a v9-era package — consider pinning an exact known-good version at build.
  Source: [drei disc #2213](https://github.com/pmndrs/drei/discussions/2213),
  [react-postprocessing releases](https://github.com/pmndrs/react-postprocessing/releases).

- **[MED] `@react-three/rapier` line is ~20 months old (2.2.0, Nov 2024).** It is the current v2/R3F-v9
  line and correct today, but it's post-MVP and quiet. Re-verify freshness (and that no 2.3/3.0 has landed)
  at the point physics is actually built, not at spine-time. Source:
  [github rapier releases](https://github.com/pmndrs/react-three-rapier/releases).

- **[LOW] `@react-three/drei` 10.7.x stable has been quiet ~8 months while v11 is in alpha.** 10.7.7 is the
  correct R3F-v9 stable pin today; just don't drift onto v11 alpha, and expect the eventual v11 to land
  with the R3F v10/WebGPU wave. Source: [npm drei](https://www.npmjs.com/package/@react-three/drei).

- **[LOW / advisory] Two "latest" pins in the Stack table** (`@pmndrs/detect-gpu`, `@react-three/postprocessing`)
  are unversioned. Given the postprocessing R19 edge cases, lock exact versions in the lockfile once the
  spike confirms a good combination — "latest" invites a silently-breaking transitive bump on a v9-era pkg.

**Nothing rises to [HIGH]/[CRITICAL]. No pinned technology is abandoned, hallucinated, or version-mismatched.**
The two staleness flags the spine itself raised are the two genuinely-stale packages, and the spine already
routes both out of the runtime baseline — a point in its favor, not against it.

---

## 5. Method note

Each row was checked against a primary source (npm registry page, GitHub releases, official docs, or the
vendor changelog) dated within the current release window, not from training memory. Where a claim was a
*negative* ("deprecated", "stale"), it was confirmed against the package's own npm/GitHub metadata. The
one item not independently re-litigated is TypeScript 5.x (uncontested industry baseline).
