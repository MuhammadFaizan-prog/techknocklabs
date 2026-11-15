# Image prompt log (Ultimate Image & 3D Prompt §6, §12)

Engine: Hark `generate_image` (model not exposed). Seeds not exposed. One engine for the set. Brief: docs/VISUAL-BRIEF.md.

Style lock (byte-identical in both): `quiet dark architectural minimalism, single warm practical light source, cinematic film still`
Palette lock (byte-identical in both): `walls and floor near-black #0A0A0A to charcoal #141414, door leaf matte black #141414, hairline frame #2B2925, cool grey concrete highlights #8E8B85, the only warm colour is the door light amber #F2A65A`

## door-ajar (v2, keeper) → public/img/door-ajar.webp (1584×672, q90, 32 KB)
Original PNG: project root `door-ajar-v2.png`.
Prompt: Photorealistic wide landscape cinematic film still for a website hero background. Subject: a tall, flush, matte black interior door standing slightly ajar, opened about ten degrees, set in a thin dark frame, placed in the right third of the frame. Through the narrow gap a vertical slit of warm amber light glows and spills onto the floor as a long, thin, hard-edged wedge of light that stretches diagonally toward the lower left of the image. Setting: an empty room with a matte black plaster wall and a polished dark concrete floor with faint seam lines that catch a little of the light. Composition: eye-level camera at about 1.2 metres, 35mm lens, deep focus, straight verticals; the left 55 percent of the image is an empty, almost pure-dark wall and floor, a calm negative space reserved for a large headline. Lighting: the only light source in the scene is behind the door, a warm 2700K practical light; everything else falls off into deep shadow with soft bounce on the concrete, no other lamps or windows. Materials: slight plaster texture on the wall, subtle reflections and micro-scratches on the concrete, a slim black lever handle on the door. Style: [style lock], fine film grain, low-key grade. Palette: [palette lock]. The scene is completely empty: no text, no lettering, no logos, no people, no furniture, no plants, no lens flare, no haze orbs or particles, no purple or blue tint.
Review: single subject ✓, amber only as light ✓, left 55% dark ✓, straight verticals ✓. Biggest remaining gap: slit slightly wider than "narrow". Accepted on try 1.

## door-open (v2, keeper) → public/img/door-open.webp (1584×672, q90, 50 KB)
Original PNG: project root `door-open-v2.png`. Reference image: door-ajar-v2.png (consistency lock).
Prompt: Photorealistic wide landscape cinematic film still, the companion shot to the reference image: the same room, the same tall flush matte black door in the same thin dark frame with the same slim black lever, now swung fully open, about seventy-five degrees, toward the viewer. Keep exactly from the reference: the matte black plaster wall, the polished dark concrete floor with faint seam lines, the camera height of about 1.2 metres, the 35mm lens, the warm amber light temperature and the palette. Change only: the camera now faces the doorway square-on with the doorway centred, and warm amber light floods out of the open doorway across the floor toward the viewer in a broad wedge that widens into the foreground, with soft bounce lighting the lower edges of the wall. Beyond the doorway, a softly overexposed warm-lit empty space with no visible detail. Keep a dark band of shadow across the top quarter and the bottom edge of the frame for overlaid headline text. Lighting: the only light source is the open doorway, warm 2700K practical, falling off naturally into deep shadow at the sides. Style: [style lock], fine film grain, low-key grade. Palette: [palette lock]. The scene is completely empty: no text, no lettering, no logos, no people or silhouettes, no furniture, no plants, no lens flare, no haze orbs or particles, no purple or blue tint.
Review: same room/door/palette ✓, light floods out ✓, no text/people ✓. Gap: door swings inward rather than toward camera; acceptable. Accepted on try 1.

Alt text: both are decorative (`alt=""`) because the headline carries the meaning.
Superseded: earlier `door-ajar.png` / `door-open.png` (2026-11-12, project root) were replaced by v2 to follow the structured-prompt workflow.

## Blog covers, first set (2026-11-15, superseded by the per-post covers below; files removed) → public/img/blog/{ai,product,strategy,saas,engineering}.webp (1376×768, q82, 11-27 KB)
Engine: Hark `generate_image`, one engine for the set, seeds not exposed. Originals: project root `blog-*.png`.
Style lock (byte-identical in all five): `quiet dark architectural minimalism, single warm practical light source, cinematic film still, fine grain, low-key grade`
Palette lock (all five): `walls and floor near-black #0A0A0A to charcoal #141414, hairline frame #2B2925, cool grey highlights #8E8B85, the only warm colour is the amber light #E8A24A`
Shared closing constraint: `The scene contains no text, no lettering, no logos, no people, no watermark, no purple or blue tint, no lens flare.`

- **AI**: tall flush matte black door slightly ajar; through the narrow gap a slim slit of warm amber light, and inside the gap a delicate network of small glowing nodes joined by thin luminous lines. Door gap right third, eye-level, 35mm, dark negative space left.
- **Product**: a single small matte prototype block with fine engraved panel lines (a blueprint made solid) on polished dark concrete inside a thin wedge of amber light from a door gap at the right edge. Floor-level camera, 50mm, shallow DoF.
- **Strategy**: minimal matte black chess-like pieces on a dark stone floor with faint inlaid grid paths, lit by a diagonal wedge of amber light from a slightly open door at far right. Low three-quarter camera, 50mm.
- **SaaS**: four thin translucent smoked-glass slabs floating as stacked tiers, edges catching the amber slit of a narrow door gap behind them. Eye-level, 50mm.
- **Engineering**: two interlocking machined steel gears, a bearing ring and a threaded shaft on dark concrete inside a thin wedge of amber light from a door gap at the right edge. Low camera, 85mm macro-like.

Review (read at 800px): all five on-palette, amber only as light, no text/people/logos. Strategy original had a thin light border frame; cropped 14/10 px per side and resized back. Accepted on try 1. Alt text: decorative (`alt=""`), the card title carries the meaning.


## Per-post blog covers (2026-11-15) → public/img/blog/<post-slug>.webp (18 files, 1376×768, WebP q82)
One generated cover per article, in the same Door Ajar style and palette locks as the first set. Originals: project root `cover-<slug>.png` (for multi-tenant-saas and saas-pricing-models the `-v2` files). The per-post prompts were not recorded in this repo.
Processing: six sources with a thin frame (ai-customer-support, ai-intake-law-firms, ai-voice-agents-for-business, engagement-models, model-context-protocol, what-an-mvp-costs) were center-cropped to 1294×722, then resized to 1376×768. All covers are decorative (`alt=""`).
