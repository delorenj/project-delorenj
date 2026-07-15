# Consistency & Cross-Reference Audit — Career Ascent PRD

*Role: consistency & cross-reference auditor. Scope: verify FR/UJ/SM references resolve and are used consistently; §-references resolve; Glossary terms used verbatim (flag synonyms); PRD body vs `addendum.md` contradictions (tech/hosting/KG/dates/education); Non-Goals vs Features; the §6 fidelity-tier NOTE vs §6.1's waypoint list. Known-open §8 items (exact dates, MVP era set, physics-in-MVP, success numbers, audio, WebGPU) are out of scope by instruction and not re-flagged as defects.*

## Reference-integrity spot-check (passed)

- **FR-1…FR-32** are defined contiguously (§4.1–§4.8) with no gaps; every FR cited in §6, §7, §12, §13, §15 resolves to a real definition.
- **UJ-1…UJ-5** all defined in §2.3; every "Realizes UJ-N" tag resolves.
- **SM-1…SM-5 + SM-C1…SM-C3** all defined in §7; validation back-references (e.g. SM-2 → FR-1–FR-6/FR-19; SM-5 → FR-29–FR-32) resolve.
- **Non-Goals vs Features:** §5 ("Not an open-source product… public for inspection") is consistent with §4.8/FR-29 Out-of-Scope; §5 ("Not an on-page live KG visualization") is consistent with §4.4/FR-18 and the Glossary. No contradiction found.
- **§6 fidelity NOTE vs §6.1 waypoint list:** partially consistent (both name BAE = ground bookend); the failure is the *top* bookend — see finding C2.

## Findings (most severe first)

---

### C1 — HIGH — FR-6 still lists "Drexel"; PRD's own §8 and the addendum say Stevens
**§4.2 / FR-6 (line 164) vs §8 Q1 (line 410) and addendum §H (line 125).**

FR-6's canonical era set opens with `Prologue (Lockheed/Unisys/Drexel, launchpad)`. But §8 Q1 is marked **[RESOLVED]** and states the LinkedIn source *"corrected education to Stevens Institute of Technology (not Drexel, as the braindump said)."* Addendum §H likewise reads *"Stevens Institute of Technology — LinkedIn corrects the braindump's 'Drexel'."*

So the PRD contradicts itself: the requirement body carries the known-wrong fact that two other sections explicitly retracted. FR-6 is the surface most likely to be copied verbatim into Career-Data-Layer authoring and Scene set-pieces, so this error propagates downstream.

**Fix:** Change FR-6 line 164 to `Prologue (Lockheed/Unisys/Stevens, launchpad)`.

---

### C2 — MEDIUM — The MVP "AI" waypoint conflates two distinct FR-6 eras, and the §6 fidelity NOTE's top bookend isn't the same era the MVP actually renders
**§6.1 (lines 370, 374), §6 NOTE, FR-6 (line 164), UJ-1 (line 52), SM-2 (line 394).**

FR-6 defines **two** distinct top eras: `ACD/IntelliForia (orbit, agentic AI)` and `Axioms of AI (deep space)`. Downstream the single token **"AI"** is used for a single MVP waypoint (§6.1 "BAE, Warby, Justworks, **AI**"; SM-2 "orbit/AI era"), with no Glossary anchor, so it is unclear which era it denotes.

This becomes a real contradiction against the §6 fidelity-tier NOTE, which reserves full 3D for bookends **"ground radio-waves + deep-space agentic-AI"** — i.e. the *deep-space Axioms* era. But the described MVP endpoint is the **orbit** era: UJ-1's climax "settles on the **agentic-AI station**" (MCP docking ports = the ACD/IntelliForia *orbit* set-piece per addendum §H), and SM-2 measures reaching "the **orbit**/AI era." So the NOTE promises a full-3D *deep-space* bookend that the §6.1 waypoint list and UJ-1 do not clearly include.

**Fix:** Decide whether MVP's top waypoint is `ACD/IntelliForia (orbit)` or `Axioms of AI (deep-space)` (or both collapsed), name it with the FR-6 term instead of bare "AI" in §6.1/SM-2, and align the §6 NOTE's "deep-space agentic-AI" bookend to whichever era MVP actually renders.

---

### C3 — MEDIUM — §6.1 declares "three bands (ground/clouds/space)" but its own waypoint Justworks is `stratosphere`, and "space" is not a Glossary Altitude Band
**§6.1 (line 374) vs §3 Glossary Altitude Band (line 90) and FR-6.**

§6.1: *"Three working Altitude Bands (ground / clouds / space) with at least four Waypoints… **BAE, Warby, Justworks, AI**."* Mapping the waypoints to their FR-6 bands: BAE = ground, Warby = clouds, **Justworks = stratosphere**, AI = orbit/deep-space. Justworks falls in none of the three declared bands, so "three bands" cannot cover the four listed waypoints. Separately, **"space"** is not one of the six enumerated Altitude Band values (`ground, low-atmosphere, clouds, stratosphere, orbit, deep-space`) — it is an undefined synonym, violating the Glossary's "No synonyms elsewhere in the PRD" mandate.

**Fix:** State the actual bands the four MVP waypoints touch (ground / clouds / stratosphere / orbit-or-deep-space — that is four, not three) using Glossary values, or reduce the MVP waypoint set to match a true three-band claim.

---

### C4 — MEDIUM — Prologue and Splash have no valid Altitude Band, but FR-6's testable consequence requires every Era to have one
**FR-6 (lines 164, 166–167) vs §3 Glossary (line 90) and addendum §H (lines 125, 130).**

FR-6's consequences state *"Each Era in the Career Data Layer has a corresponding Scene and **Altitude Band**"* and *"Scenes appear in **non-decreasing altitude order**."* But in the same era list, **Prologue** is tagged `launchpad` (not among the six enum values) and **Splash** is tagged `platform decomposition` with **no band at all**. Addendum §H repeats this (Splash = "platform decomposition", no band). This makes the "non-decreasing altitude order" consequence untestable (you cannot order an era with no band, and `launchpad` has no defined altitude), and the `altitudeBand` type in addendum §D has no value that fits Prologue.

**Fix:** Assign every era a Glossary Altitude Band value — e.g. Prologue → `ground`, Splash → `clouds` or `stratosphere` — or add the missing values to the Glossary enum and addendum §D type.

---

### C5 — MEDIUM — The Prologue waypoint cannot be placed by the Year-to-Distance Mapping (starts before START_YEAR)
**addendum §C (lines 37–47) and §H (line 125) vs FR-6, FR-3, and §3 Glossary Waypoint (line 92).**

The Glossary says a Waypoint exists "one per Era (**and the Prologue**)," and FR-3 jumps the camera to a Waypoint's year via `jumpToWaypoint(waypoint.startYear)` (addendum §E). But the mapping (`addendum §C`) hardcodes `START_YEAR = 2004`, and the Prologue is *pre-2004* (Lockheed/Unisys/Stevens internships/college, addendum §H) with no assigned years. `yearToScrollY`/`yearToWorldY` of any pre-2004 year is **negative**, so the Prologue waypoint has no valid scroll/world position and cannot be a jump target — silently breaking FR-1 (monotonic mapping from year) and FR-3 (waypoint jump) for the Prologue.

**Fix:** Either move `START_YEAR` back to the Prologue's earliest year, or explicitly define the Prologue's year range and confirm it maps to non-negative world distance, or state that the Prologue is a fixed pre-roll not driven by the year→distance mapping.

---

### C6 — MEDIUM — PRD/addendum disagree on Knowledge Graph data-flow direction
**addendum §D (line 91) vs §3 Glossary (line 101), §4.4/FR-18 (line 245), and addendum §I (lines 137–142).**

The Glossary defines the Knowledge Graph as the process that *"ingests source material… and **produces** Career Data Layer content"* (KG → Career Data), and addendum §I's pipeline diagram agrees: `… -> Knowledge Graph -> Career World Data (Career Data Layer) -> … Portfolio`. But addendum §D says the Career Data Layer *"single source of truth **powers**: … the **Knowledge Graph**…"* — i.e. Career Data → KG, the reverse direction. One of these is wrong; as written the KG is both upstream producer and downstream consumer of the same layer.

**Fix:** Remove "the Knowledge Graph" from the addendum §D "powers" list (KG is the producer, not a consumer), keeping the §I direction.

---

### C7 — MEDIUM — addendum §I re-opens a §8-resolved question and names a specific KG tool, contradicting the tool-agnostic resolution
**addendum §I (line 144) vs §8 Q7 (line 416, **[RESOLVED]**), §4.4/FR-18 (line 245), and §5 (line 361).**

§8 Q7 is **[RESOLVED → tool-agnostic; … no vendor lock-in]**, FR-18 states *"No specific graph product is mandated"* and lists Out-of-Scope *"any specific vendor/tool lock-in,"* and §5 lists the KG as an offline aid only. Yet addendum §I still frames it as live and vendor-specific: *"Open question (PRD §8 Q7): is **'Ace Knowledge Graph'** a specific tool or a generic enrichment step?"* This both contradicts the RESOLVED status and introduces a named product ("Ace Knowledge Graph") that appears nowhere else and conflicts with the "no vendor lock-in" decision.

**Fix:** Update addendum §I to reflect the resolution (tool-agnostic, post-MVP authoring aid, no named vendor); delete the "Ace Knowledge Graph" open question.

---

### C8 — MEDIUM — addendum's `cameraMode` value "jumping" violates the Glossary Motion Mode term "waypoint-jump"
**addendum §D (line 87) vs §3 Glossary Motion Mode (line 97).**

The Glossary mandates verbatim Motion Mode values `free-scroll`, `waypoint-jump`, `inspect` ("must use these terms exactly. No synonyms"). The PRD body honors this (FR-2/FR-3/FR-4/FR-23). But the addendum's `CareerWorldState` type declares `cameraMode: "free-scroll" | "jumping" | "inspect"` and even annotates it `// maps to PRD "Motion Mode"` — using **"jumping"** where the Glossary requires **"waypoint-jump."** Since this is the proposed data-model literal, the divergence will bake a synonym into code/state and downstream Architecture.

**Fix:** Rename the addendum §D literal to `"waypoint-jump"` to match the Glossary.

---

### C9 — LOW — Ambiguity over whether the Prologue is an "Era"
**§3 Glossary Waypoint (line 92) vs FR-6 (line 164) and §6.2 (line 381).**

The Glossary defines a Waypoint as "one per Era (**and the Prologue**)," which reads the Prologue as *not* an Era. But FR-6 says *"The world presents the defined **Eras**… Canonical set: **Prologue** → BAE → …"* (Prologue counted among Eras), and §6.2's "Full set of **nine** high-fidelity Scenes" only reaches nine by counting the Prologue as an era/scene. The status of the Prologue (Era or a distinct pre-roll) is inconsistent, which affects era counts and the data model.

**Fix:** Pick one framing — either add "Prologue" as an Era to the Glossary Era definition, or keep it distinct and adjust FR-6/§6.2 language and counts accordingly.

---

### C10 — LOW — §8 hosting resolution says "Pages/Workers"; §13 / §9 / addendum §N reject the Pages adapter
**§8 Q8 (line 417) vs §13 (line 512), §9 (line 439), addendum §N (line 198).**

§8 Q8 **[RESOLVED]** reads hosting on *"Cloudflare (**Pages**/Workers + R2)."* But §13 states the app deploys *"via the OpenNext adapter on **Workers**… the deprecated `next-on-pages` is **not** used,"* §9 records "OpenNext on Workers + R2," and addendum §N explicitly says *"Do NOT use `@cloudflare/next-on-pages`."* The "Pages" mention in the resolution contradicts the rest of the document's Workers-only decision.

**Fix:** Drop "Pages" from §8 Q8 → "Cloudflare (Workers via OpenNext + R2)."

---

### C11 — LOW — North-star copy says "twenty years"; resolved source and mapping say ~22–25
**§1 (lines 17, 21) vs §8 Q1 (line 410) and addendum §C (line 37).**

§1 repeats *"twenty-year career,"* *"twenty years of software history,"* *"feeling twenty years."* But §8 Q1's resolved authoritative source carries a *"Staff Engineer & Systems Architect, **25+ years**"* headline, and the mapping's `START_YEAR = 2004` to the present (2026) is ~22 years. The hero/north-star span figure and the resolved source disagree. (Flagged as a copy-vs-source consistency issue, not as an "exact dates" open item.)

**Fix:** Reconcile the span number in §1 with the authoritative headline (e.g. "two decades+"/"25 years") or state which figure is canonical for hero copy.

---

### C12 — LOW — Glossary "no synonyms" rule broken in §1 ("SSR'd truth layer")
**§1 (line 23) vs §3 Glossary (line 89) which forbids synonyms.**

The Glossary term is **"Content Truth Layer"** with the instruction "No synonyms elsewhere in the PRD." §1 uses the shorthand *"co-equal, SSR'd **truth layer**"* (and "the truth"). Minor, but per the Glossary's own strict rule it is a synonym in the PRD body.

**Fix:** Use "Content Truth Layer" in §1, or relax the Glossary rule to permit the shorthand explicitly.

---

## Verdict

Pass-with-concerns. No reference (FR/UJ/SM/§) is dangling and Non-Goals do not contradict Features. The material problems are (a) one uncorrected factual contradiction the PRD already resolved elsewhere (Drexel/Stevens, C1), (b) a cluster of top-of-world naming/altitude/mapping inconsistencies that will block clean Career-Data-Layer and Scene authoring (C2–C5), and (c) three PRD↔addendum contradictions (KG direction, KG resolution/vendor, Motion Mode literal — C6–C8). C1 and C6–C8 are cheap, unambiguous fixes and should be made before UX/Architecture consume the docs.
