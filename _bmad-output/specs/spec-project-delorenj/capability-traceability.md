<!-- STALE-BANNER v2026-07-18 -->
> ⚠️ **PARTIALLY STALE — 2026-07-18 pivot.** Traces to the **superseded** architecture spine; the a11y / SEO / truth-layer rows are dropped. See `architecture-project-delorenj-2026-07-18`.

# Capability Traceability — Career Ascent

Bridges the SPEC's capabilities to the PRD's functional requirements, the architecture spine's binding decisions, and MVP phasing. Downstream epics/stories cite these three coordinate systems together: a story realizes a `CAP-N`, satisfies specific `FR-n` testable consequences (in `prd.md`), and is governed by specific `AD-n` invariants (in `ARCHITECTURE-SPINE.md`).

| CAP | Capability | FRs (PRD) | Governing ADs (spine) | MVP? |
| --- | --- | --- | --- | --- |
| CAP-1 | Pilot the career by scrolling | FR-1, FR-2, FR-4, FR-5 | AD-4, AD-6, AD-7, AD-8 | **MVP** (core loop) |
| CAP-2 | Jump to any Era (click-to-launch) | FR-3, FR-19 | AD-7, AD-18 | **MVP** |
| CAP-3 | Era scenes & worldbuilding | FR-6, FR-7, FR-8, FR-9, FR-33 | AD-3, AD-13, AD-14 | **MVP** (4 waypoints / 4 bands; full nine-scene fidelity + full band transitions post-MVP) |
| CAP-4 | Content Truth Layer | FR-10, FR-11, FR-12, FR-13, FR-14 | AD-1, AD-2, AD-17 | **MVP** (non-disposable foundation) |
| CAP-5 | Career Data Layer as SSOT | FR-15, FR-16, FR-17, FR-18 | AD-1, AD-8 | **MVP** for FR-15/16 hand-authored; FR-17 visual lines + FR-18 KG ingestion **post-MVP** |
| CAP-6 | Navigation & wayfinding | FR-19, FR-20, FR-21 | AD-11, AD-18, AD-7 | **MVP** |
| CAP-7 | Physics & artifact interaction | FR-22, FR-23, FR-24 | AD-14 (physics sub-rule), AD-9 | **post-MVP** (Phase 3; optional idle-drift teaser TBD) |
| CAP-8 | Accessibility & fallback parity | FR-25, FR-26, FR-27, FR-28 | AD-9, AD-10, AD-16, AD-17 | **MVP** (full §10 launch gate, not a floor) |
| CAP-9 | Source-as-Exhibit | FR-29, FR-30, FR-31, FR-32, FR-35 | AD-15 | **MVP** (repo integrity/secret-hygiene FR-35 is a launch checklist item; build case study can trail) |
| CAP-10 | Instrumentation & consent | FR-34 | AD-19 | **MVP** (schema + consent); analytics vendor + RUM choice open |

## Non-disposable foundations (build first, keep)

Per PRD §16 and the truth-layer-first walking skeleton, these are built early to stay — spikes hang on them but they are not themselves throwaway:

1. Single persistent GlobalCanvas + single scroll authority + single RAF loop *(AD-3, AD-4)*
2. SSR'd Content Truth Layer + the one Static Timeline component *(AD-2, AD-10; CAP-4, CAP-8)*
3. Fidelity-Tier detection + the runtime quality monitor *(AD-9, AD-13)*
4. The perf-budget CI gate + the a11y (axe + PEAT) and secret-scan gates *(AD-13, AD-16, AD-15)*
5. The Career Data Layer schema + the shared `sequence.config` that drives both DOM and world *(AD-1, AD-6; CAP-5)*

## Suggested walking-skeleton slice (for phase 2 epic sequencing)

A thin end-to-end vertical: stand up the SSR Content Truth Layer + Static Timeline over the Career Data Layer (CAP-4, CAP-5, CAP-8) and the non-disposable foundations, then enhance **one** real Era end-to-end — scroll → sequence → camera → scene → panel (CAP-1, CAP-2, CAP-3, CAP-6) — as progressive enhancement over it, before widening to the remaining MVP waypoints.
