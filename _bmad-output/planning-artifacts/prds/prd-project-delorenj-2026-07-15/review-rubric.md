# PRD Quality Review — Career Ascent (Jarad DeLorenzo Portfolio World)

*Rubric walk against `prd.md` (with `addendum.md` and `research-digest.md` as companions). Scoped to defects — §8-tracked open items (exact dates, MVP era set, physics-in-MVP, SM numbers, audio, WebGPU) are deliberately NOT re-flagged.*

## Overall verdict

This is a strong, unusually disciplined PRD: the Vision is specific and defended (credibility-over-spectacle is a real thesis, not furniture), the Glossary is rigorous, nearly every FR carries a "Consequences (testable)" block, and §10 NFRs are genuinely measured against research. What holds up is the *spine* and the *done-ness bar*. What is at risk is one **load-bearing structural gap** the core mechanic never resolves — the career has overlapping/concurrent tenures, but the entire Motion Engine assumes a single monotonic year→altitude axis — plus a cluster of **MVP-scoping inconsistencies** (band count, undefined "space" band, unbanded eras) that will force UX/Architecture to guess. Verdict: **pass-with-concerns** — the concerns are fixable and don't invalidate the spine, but the overlapping-tenure issue must be answered before the Year-to-Distance Mapping is designed.

## Decision-readiness — strong

Trade-offs are named honestly (credibility vs. spectacle in §1; Cloudflare-vs-Vercel with the bandwidth cost stated in addendum §N; fidelity-tiering as an explicit scope defense in §15). `[NOTE FOR PM]` callouts sit at real tensions (fidelity-tier strategy §6.1, physics being emotionally load-bearing §6.2, Relationship Lines complexity FR-17). §8 open questions are genuinely open, with resolved items marked `[RESOLVED →]`. No finding here.

## Substance over theater — strong

Five UJs, each with a named protagonist that drives a real decision (UJ-4 → FR-25/§10 reduced-motion architecture; UJ-5 → the entire §4.8 Source-as-Exhibit feature). No persona is decorative. NFRs are product-specific with thresholds, not boilerplate. The one thing to watch is minor: SM-5 counts "stars/clones" as a success signal (§7) while §5 explicitly declares "Not an open-source product" — not a contradiction (engagement ≠ OSS maintenance) but worth a one-line reconciliation so it doesn't read as mixed messaging.

## Strategic coherence — strong

Clear thesis (the ascent is *diegetic to this specific career*, so spectacle == résumé). Feature priority follows the thesis: the Content Truth Layer and accessibility floor are MVP, not deferred (§6.1), which is the thesis made literal. Counter-metrics (SM-C1–C3) are present and correctly oppose the primary SMs. No finding.

## Done-ness clarity — adequate

Most FRs are unusually testable. Two soft spots:

### Findings
- **medium** Untestable acceptance language in §4.8 (§4.8 / FR-30) — "consistent enough that the discipline is **self-evident to a senior reader**" and FR-31's "non-trivial easter egg" have no verifiable condition; they're aesthetic judgments dressed as consequences. *Fix:* replace with checkable artifacts — e.g. "a `CONVENTIONS.md`/`ARCHITECTURE.md` exists and CI lint enforces the stated module boundaries," and "≥1 easter egg is listed in an internal registry file with a reproduction path."
- **low** FR-4 "Tilt magnitude is bounded" and FR-24 "object count is bounded" cite a bound but no value or source-of-truth (§4.1 / §4.6). *Fix:* point each at the constant/config that defines the bound (addendum §C / §K), as FR-5 already does with "per the mapping constants."

## Scope honesty — strong

Non-Goals (§5) does real work. `[ASSUMPTION]` tags are used on inferences and mostly indexed in §9. `[NOTE FOR PM]` marks deferred decisions. Open-items density is appropriate for a draft feeding downstream (this is not a green-light-to-build doc). See Mechanical notes for two un-indexed assumptions.

## Downstream usability — adequate (one high-impact gap)

Glossary is present and mostly used verbatim; IDs are contiguous (FR-1..32, UJ-1..5, SM-1..5 + C1..C3, no gaps/dupes). But three inconsistencies will actively block UX/Architecture and the Career Data Layer authoring:

### Findings
- **high** Overlapping career tenures collide with the monotonic single-axis mapping (§4.1 / FR-1, FR-5 + §4.2 / FR-6) — FR-1 mandates a monotonic year→altitude mapping and FR-5 gives each Era a proportional, non-overlapping scroll span, but addendum §H's own tenures overlap heavily: Warby (2013) and ClassPass/SagePoint (2013–2016) share a start; Splash (2014–2018) fully overlaps both ClassPass and the start of Justworks (2018–2024). Two eras occupying the same years at different altitudes cannot be placed on one monotonic year axis, and a rail jump into an overlapped year is ambiguous. This is the core mechanic, and it is unaddressed (not covered by §8 Q1 "exact dates" — this is a *shape* conflict, not a date-accuracy one; nor by the §15 "height drift" / "scroll fatigue" risks). *Fix:* decide the model explicitly — e.g. collapse to a single "primary track" timeline (concurrent roles become artifacts/branches within one Era's band) or define how altitude resolves when year ranges overlap — and state it in §4.1 before Architecture designs the Year-to-Distance Mapping.
- **high** MVP band count is internally inconsistent and uses an undefined band name (§6.1) — "Three working Altitude Bands (**ground / clouds / space**)" but the four MVP waypoints map to four distinct Glossary bands: BAE=`ground`, Warby=`clouds`, Justworks=`stratosphere`, AI=`orbit`. "space" is not one of the six Glossary bands (`ground`/`low-atmosphere`/`clouds`/`stratosphere`/`orbit`/`deep-space`), so either the count (3) or the mapping (4 bands) is wrong. Collapsing stratosphere+orbit into "space" erases the altitude distinction between Justworks and AI — half the MVP waypoints — undercutting the metaphor the MVP exists to prove. *Fix:* state the exact MVP bands using Glossary terms (likely four: ground/clouds/stratosphere/orbit) or justify the collapse and rename "space" to a defined term.
- **medium** Two Eras in FR-6 have no valid Altitude Band (§4.2 / FR-6) — the canonical set assigns "Prologue (…**launchpad**)" and "Splash (**platform decomposition**)" placeholders that are not members of the Glossary band set, yet FR-6's own testable consequence requires "Each Era … keyed to its Altitude Band." Splash sits between Warby (clouds) and Justworks (stratosphere) with no band resolved. *Fix:* assign every Era a Glossary band in FR-6 (or in the Career Data Layer schema), including Prologue and Splash.

## Shape fit — strong

Consumer/multi-stakeholder experience product → UJs with named protagonists are correctly load-bearing and present. The §16 "Ways of Working" section is appropriately fenced as a process constraint, not a product requirement, and it correctly informs downstream epic sizing. No over/under-formalization.

## Mechanical notes

- **medium — stale fact contradicting a resolved decision (§4.2 / FR-6):** FR-6 still lists "Prologue (Lockheed/Unisys/**Drexel**, launchpad)" although §8 Q1 is `[RESOLVED →]` to **Stevens Institute of Technology** and addendum §H explicitly states "Stevens Institute of Technology — LinkedIn corrects the braindump's 'Drexel'." The PRD body contradicts its own resolution and will seed a wrong fact into the Career Data Layer / Prologue scene. *Fix:* change "Drexel" → "Stevens Institute of Technology" in FR-6.
- **medium — SM-2 does not validate its cited FRs (§7 / SM-2):** SM-2 ("share of engaged desktop visitors who reach the orbit/AI era") is said to "Validate FR-1–FR-6, FR-19," but the north-star journey UJ-1 has Dana *jump* straight to the AI era via the rail (FR-3/FR-19), reaching AI without exercising scroll-to-time (FR-1/FR-2/FR-5). Counting arrivals therefore validates jump navigation, not the scroll ascent. *Fix:* either measure scroll-traversal depth distinctly from jump arrivals, or restate which FRs SM-2 actually validates (FR-3, FR-19).
- **medium — Fidelity Tier defined with 3 levels but used as 4 (§3 Glossary vs §10):** Glossary defines Fidelity Tier as "full / reduced / static" (3), while §10 and addendum §L drive quality off a GPU "tier 0–3" (4 levels, with per-tier instancing caps ~100k/30k/10k/static). "Auto-downgrade one Fidelity Tier" is ambiguous under two different scales. *Fix:* reconcile to one tier model in the Glossary.
- **medium — addendum Scene list is not 1:1 with FR-6 Eras (addendum §F vs FR-6):** FR-6's consequence asserts "Each Era … has a corresponding Scene," but addendum §F's nine Scene classes don't map 1:1 to the nine Eras — Web/Agency gets two (`WebEraScene` + `CreativeAgencyScene`), `GroundScene` vs `RadioLabScene` is ambiguous between Prologue and BAE, and Splash has no scene. Since the addendum feeds Architecture, this will propagate. *Fix:* align the Scene enumeration to the Era set (or state the intentional 1-Era→N-Scene relationship in FR-6).
- **low — Motion Mode literal drift (§3 Glossary vs addendum §D/§E):** Glossary and FR-3 use `waypoint-jump`; addendum's `CareerWorldState.cameraMode` uses `"jumping"` (it flags "maps to PRD Motion Mode" but keeps the divergent literal). *Fix:* use `waypoint-jump` in the addendum types to prevent enum drift in code.
- **low — Assumptions Index roundtrip incomplete (§9):** two inline assumptions are not indexed — §14's `[ASSUMPTION: no hard external deadline…]` and §10's `[ASSUMPTION: latest 2 versions of major evergreen browsers…]` (§9's "§10" entry covers only the numeric-NFR assumption, a different one). Also §5 inline says "WebGL-first" while §9 indexes it as "WebGL2-first" (term drift). *Fix:* add the two missing entries; standardize on "WebGL2."

## Summary of findings by severity
- **high (2):** overlapping-tenure vs. monotonic mapping (FR-1/5/6); MVP band count + undefined "space" band (§6.1).
- **medium (5):** unbanded Prologue/Splash (FR-6); stale "Drexel" fact (FR-6); SM-2 mis-traced (§7); Fidelity Tier 3-vs-4 (§3/§10); addendum Scene↔Era mismatch (§F); untestable FR-30/31 language.
- **low (3):** FR-4/24 unspecified bounds; Motion Mode literal drift; Assumptions Index gaps.
