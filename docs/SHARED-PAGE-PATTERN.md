# Anchor Point shared page pattern

Status: accepted visual/UI contract for secondary-page propagation. The homepage is frozen and remains the reference implementation.

## Core rule

Propagate presentation and interaction, not homepage content. Each page keeps its own purpose, information architecture, wording, tools, forms and order. Do not rewrite page-specific material merely to resemble the homepage.

## Identity, header and navigation

- Use the original AP emblem with the Barlow Condensed wordmark, Barlow tagline and accepted divider/lockup proportions.
- The header belongs to the current canvas: deep state over deep zones, light state over light zones, then deep again where the page returns to navy. State changes must be scroll-responsive, calm and readable.
- Navigation behavior, keyboard access and mobile menu behavior remain consistent across pages.

## Actions and progress

- Gold CTAs use one AP emblem, never an arrow-circle or duplicate mark. Maintain the accepted emblem-to-label ratio, gold family and restrained hover/focus/press response.
- Each scrolling page uses one segmented right-side page-progress indicator only. Do not add a second slider, square track or decorative scroll meter.
- Use the shared bottom utility bar labels exactly: Ecosystem, Ask Anchor Point, Examples. All three use identical active, hover, focus and tap logic; motion is disabled under reduced-motion preferences.
- Preserve the shared back-to-top control where it is already part of the global implementation.

## Type, palette and surfaces

- The page hero is the strongest typographic moment. Major non-hero headings use the accepted smaller, calm hierarchy; body copy stays readable, unhurried and high-contrast.
- Use the accepted deep-navy family and light-canvas family. Build a continuous deep → light → deep journey where the page warrants it.
- Transitions are soft and sfumato-like. Avoid hard section boundaries, boxed-slide rhythm and unrelated tonal blocks.
- Cards and tools are embedded surfaces: restrained borders, tonal separation and quiet depth. Do not turn every block into a cage.
- Engineering drawings, sketches and technical artwork belong to the page canvas. Do not paste them as white rectangular screenshots unless the content is genuinely an interface proof.

## Rhythm and responsive behavior

- Use deliberate vertical solitude without dead-air gaps. Shared spacing tokens may tighten or expand containers, but must not reorder or reinterpret page content.
- Desktop and mobile must preserve hierarchy, readable measure, touch targets and horizontal containment. Fixed controls must not cover primary content or the footer.
- Hover is supplementary. Every control must work with keyboard focus and touch/tap. Maintain semantic labels and visible focus.
- Under `prefers-reduced-motion: reduce`, disable decorative travel, orbit and transition motion while retaining clear static states.

## Footer and truthfulness

- Keep the footer thin, deep navy, readable and institutionally restrained. Preserve page-relevant links and the public `info@anchorpoint.com.bd` treatment where present.
- Never invent maturity, team scale, offices, clients, certifications, authority, tools, routes or outcomes. Clearly distinguish verified fact, owner-supplied fact, constructed demonstration, sample output and future intent.
- Trade, do not accumulate. When a shared pattern is accepted, remove competing variants instead of stacking another layer of effects.

## Review protocol

1. Compare shared components with the frozen homepage.
2. Confirm page-specific content, meaning and order are unchanged.
3. Verify desktop and 390 px mobile layouts, keyboard focus, touch behavior, reduced motion, internal links and zero horizontal overflow.
4. Keep all work on a review branch and Cloudflare preview until explicit production approval.
