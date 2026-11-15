# Visual brief: door images (Ultimate Image & 3D Prompt §2, §6, §10)

## Purpose and placement
- `door-ajar` — home hero, right half behind the headline. Seen first by founders/CTOs evaluating a software + AI agency. Job: make "Tech knocks at your door." literal and calm in one glance.
- `door-open` — final "Let's build what's next." CTA. Job: the payoff of the hero — the same door, now open, light flooding toward the viewer.

## Format
- 16:9-ish wide landscape, exported as JPG/WebP ≤ 400 KiB for the hero, displayed `object-fit: cover` at 1440×~860 and cropped to the door on 390px.
- Text-safe area: left 55% of `door-ajar` must stay near-black and empty (headline sits there). `door-open` keeps a dark band at top and bottom for the CTA copy.

## Subject truth
Pure invention (no product, no people, no logo). No real place.

## Style tokens (reused byte-for-byte in both prompts)
`quiet dark architectural minimalism, single warm practical light source, cinematic film still`

## Palette line (reused byte-for-byte)
`walls and floor near-black #0A0A0A to charcoal #141414, door leaf matte black #141414, hairline frame #2B2925, cool grey concrete highlights #8E8B85, the only warm colour is the door light amber #F2A65A`

## Lighting / camera
Only light source is behind the door: warm 2700K practical, hard-edged, spilling a narrow wedge across polished concrete. 35mm, eye level ~1.2 m, deep focus, fine film grain, low-key grade.

## Consistency locks between the two images
Same room (matte black plaster wall, polished dark concrete floor with faint seam lines), same tall flush handle-less-looking black door with thin dark frame and slim black lever, same camera height and lens, same amber temperature, same palette. Only change: door angle (ajar ~10° → open ~75°) and amount of light; camera moves to face the door square-on for the CTA.

## Constraints
No text, no logos, no people, no furniture, no plants, no windows, no extra light sources, no purple/blue cast, no lens flares, no particles or haze orbs.

## Acceptance checks
1. Door is the clear, single subject; amber appears only as light (slit, floor wedge), never as a painted surface.
2. Left 55% of the hero is dark enough for #EDEAE3 text at ≥ 7:1.
3. Both images read as the same room and door.
4. No artefacts: straight verticals, plausible light falloff, no warped door frame.

## Review loop
Generate → view at real size → name single biggest gap → change one variable → regenerate (max 3 tries, then stop and keep best).
