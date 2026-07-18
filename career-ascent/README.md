# Career Ascent — walking skeleton

Spectacle-first, client-only R3F build of the cel-shaded career world.
Architecture: `../_bmad-output/planning-artifacts/architecture/architecture-project-delorenj-2026-07-18/ARCHITECTURE-SPINE.md`
Visual identity: `../_bmad-output/planning-artifacts/ux-designs/ux-project-delorenj-2026-07-16/DESIGN.md`

## Run
```bash
pnpm install
pnpm dev        # http://localhost:5173 — scroll to ascend
pnpm build      # static bundle -> dist/ (deploys to Cloudflare Pages)
```

## What the skeleton proves (maps to the spine)
- **AD-3** one `GlobalCanvas` · **AD-4** one scroll authority (Lenis) drives the camera up the Career Sequence
- **AD-6** the cel pipeline: `MeshToonMaterial` + stepped gradient ramp + inverted-hull ink outline
- **AD-7** capability gate → boots the world **or** the static bail-out card
- **AD-1/AD-2** one typed World-Data core on the altitude axis; grit→neon sky climbs with progress
- **AD-10** in-world HUD projected from the data core

## Not yet (next passes)
- glTF set-pieces via the Blender→glTF pipeline (currently procedural cel primitives)
- GSAP ScrollTrigger scrubbable camera timeline + interruptible waypoint jumps
- halftone/grain post FX, fidelity-tier auto-downgrade, audio, self-hosted display fonts
