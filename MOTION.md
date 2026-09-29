# MOTION.md

## Motion Direction

Create a **minimal, emotional, premium visual language** for a baby clothing brand.

The experience should feel:

* Tender
* Calm
* Warm
* Intimate
* Timeless
* Tactile
* Premium
* Human

Motion should evoke the feeling of **soft fabrics, newborn skin, quiet mornings, handwritten memories, and treasured childhood moments**.

Avoid anything that feels:

* Loud
* Commercial
* Playful in a childish way
* Over-animated
* Tech-heavy
* Fast
* Generic SaaS
* Trend-driven

The goal is not to impress the user with animation.

The goal is to make them **feel something**.

---

## Core Principle

> **Less movement. More feeling.**

Use motion to create emotional continuity between moments.

Every animation should feel as if it could happen naturally:

* fabric gently settling
* a photograph being revealed
* a page being turned
* a drawer opening
* a hand moving across soft cotton
* light slowly entering a room

Motion should never compete with the product or photography.

---

# 01 — Motion Personality

The brand should have a **slow, elegant rhythm**.

Think:

```text
soft
     ↓
slow
     ↓
intentional
     ↓
warm
     ↓
quiet
```

Not:

```text
fast
→ bounce
→ scale
→ glow
→ confetti
→ constant movement
```

Animation should be almost invisible until the user notices how pleasant the interface feels.

---

# 02 — Timing

Use restrained durations.

| Interaction          |   Duration |
| -------------------- | ---------: |
| Hover                |  180–250ms |
| Button feedback      |  180–250ms |
| Image transition     |  400–700ms |
| Product image reveal |  500–800ms |
| Menu opening         |  300–450ms |
| Modal                |  400–600ms |
| Page transition      |  500–800ms |
| Hero reveal          | 700–1200ms |

Longer durations are acceptable for large editorial moments.

Never make everyday interactions feel slow.

---

# 03 — Easing

Use soft, natural easing.

Primary easing:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Secondary easing:

```css
cubic-bezier(0.16, 1, 0.3, 1)
```

Avoid:

```text
bounce
elastic
overshoot
spring-heavy motion
```

The brand should feel **quietly confident**, not energetic.

---

# 04 — Page Entrance

The page should feel like a photograph slowly coming into focus.

Do not animate everything independently.

Instead:

```text
page loads
      ↓
background remains still
      ↓
hero image gently reveals
      ↓
headline appears
      ↓
supporting copy follows
      ↓
CTA appears last
```

Use:

```text
opacity: 0 → 1
translateY: 12px → 0
```

Keep the movement extremely small.

Example:

```css
.hero-content {
  opacity: 0;
  transform: translateY(12px);
  animation: reveal 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

---

# 05 — Hero Images

Photography is the emotional center of the experience.

Do not aggressively animate hero imagery.

Prefer:

```text
image
scale(1.03)
    ↓
scale(1)
```

over several hundred milliseconds.

The effect should feel like **breathing**, not zooming.

Example:

```css
.hero-image {
  transform: scale(1.03);
  animation: settle 1400ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
```

Do not use dramatic parallax.

Do not rotate photography.

Do not add artificial effects over emotional imagery.

---

# 06 — Product Cards

Product cards should feel like objects sitting quietly on a table.

Default:

```text
still
```

On hover:

```text
image subtly enlarges
+
secondary image may appear
+
product information remains stable
```

Use:

```css
.product-image {
  transition:
    transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.product-card:hover .product-image {
  transform: scale(1.025);
}
```

Never make the entire card jump.

Avoid:

```text
card lift
shadow explosion
rotation
large scale
```

The clothing should remain the focus.

---

# 07 — Image Crossfade

When a product has multiple images, use a soft crossfade.

Example:

```text
front image
     ↓
   dissolve
     ↓
detail / back image
```

Duration:

```text
500–700ms
```

Avoid hard cuts when a gentle transition is possible.

---

# 08 — Typography

Typography should move less than imagery.

Headlines should appear through:

```text
opacity
+
small vertical movement
```

Avoid letter-by-letter animation.

Avoid typewriter effects.

Avoid dramatic text reveals.

The typography should feel **editorial and timeless**.

---

# 09 — Emotional Storytelling

For sections about the brand, family, craftsmanship, or childhood memories, use **scroll-based reveals**.

Example:

```text
large photograph
        ↓
slowly enters viewport

"Made for the little moments."

        ↓
copy gently appears
```

Use generous spacing.

Allow sections to breathe.

Do not trigger multiple animations simultaneously.

---

# 10 — Scroll Behavior

Scrolling should feel cinematic but restrained.

Recommended:

```text
image reveal
opacity fade
small vertical translation
subtle image scale
```

Avoid:

```text
aggressive parallax
horizontal scrolling everywhere
scroll hijacking
scroll-jacking
large rotations
rapid section transitions
```

The user should always feel in control of the page.

---

# 11 — Navigation

Navigation should be almost static.

Header:

```text
normal
↓
subtle compression while scrolling
```

If the header becomes sticky:

```text
height
slightly decreases
+
background gently appears
```

Do not make the header bounce into place.

Mobile navigation should open like a **quiet sheet of paper**, not a full-screen animated spectacle.

---

# 12 — Buttons

Buttons should feel tactile.

Default:

```text
stable
```

Hover:

```text
background transition
+
subtle color transition
```

Pressed:

```text
scale(0.98)
```

Example:

```css
.button {
  transition:
    background-color 220ms ease,
    color 220ms ease,
    transform 180ms ease;
}

.button:active {
  transform: scale(0.98);
}
```

Do not use exaggerated button animations.

---

# 13 — Add to Cart

Adding clothing to the cart should feel meaningful but understated.

Avoid:

```text
product flies across the screen
```

Prefer:

```text
button
   ↓
soft state transition
   ↓
"Added"
   ↓
small confirmation
```

For example:

```text
Add to bag
     ↓
Added to bag ✓
```

The product should remain visually anchored.

---

# 14 — Favorite / Wishlist

A favorite action can have a small emotional response.

Example:

```text
♡
 ↓
♥
```

Use a subtle scale:

```text
1
↓
1.08
↓
1
```

Keep the duration around:

```text
250–350ms
```

No particles.

No explosions.

No excessive celebration.

---

# 15 — Cart

The cart should feel like a **small collection of treasured things**.

When opening:

```text
cart panel
opacity: 0 → 1

translateX:
20px → 0
```

Use a soft overlay.

The cart should feel connected to the current page rather than like a completely separate interface.

---

# 16 — Product Detail

The product detail page should feel editorial.

Suggested sequence:

```text
photography
     ↓
product name
     ↓
description
     ↓
price
     ↓
selection
     ↓
CTA
```

Do not animate every element.

Let the photography establish the emotion.

Text should arrive quietly afterward.

---

# 17 — Fabric & Texture

Where possible, use subtle motion to emphasize tactile qualities.

For example:

```text
close-up fabric photograph
       ↓
very subtle scale
       ↓
slow reveal
```

Do not simulate fabric with artificial animated noise.

Real photography should carry the texture.

---

# 18 — Empty States

Empty states should feel human.

Instead of:

```text
Nothing here!
```

prefer a warm, restrained message.

Motion should be minimal:

```text
opacity 0 → 1
```

Avoid cartoon illustrations bouncing around.

---

# 19 — Loading

Prefer a quiet skeleton or soft image placeholder.

Avoid large spinning loaders.

Recommended:

```text
soft neutral placeholder
        ↓
image gently fades in
```

The transition from placeholder to photography should be seamless.

---

# 20 — Microinteractions

Microinteractions should feel like tiny gestures.

Good:

```text
heart fills
chevron rotates
image crossfades
button changes state
menu gently opens
```

Avoid:

```text
shakes
bounces
explosions
confetti
large rotations
```

---

# 21 — Stagger

Use very little stagger.

If used:

```text
40–100ms
```

Example:

```text
headline
   ↓ 70ms
description
   ↓ 70ms
CTA
```

Never create a long chain where the user waits for the interface to finish revealing itself.

---

# 22 — Photography Has Priority

When photography and motion compete:

> **Photography wins.**

Do not animate text over an emotional photograph so aggressively that attention moves away from the image.

Do not apply excessive zooms or filters.

The product should always remain recognizable.

---

# 23 — Mobile

Mobile motion should be even more restrained.

Avoid:

* Large horizontal translations
* Complex hover behavior
* Excessive scroll effects
* Large parallax
* Long entrance sequences

Touch interactions should respond immediately.

Use tap feedback:

```text
scale(0.98)
```

or a subtle color/state transition.

---

# 24 — Accessibility

Always respect reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Reduced motion should preserve:

* State changes
* Visibility
* Hierarchy
* Feedback
* Usability

Motion is never required to understand the interface.

---

# 25 — Performance

Prefer:

```text
transform
opacity
```

Avoid unnecessary animation of:

```text
width
height
top
left
margin
padding
```

Keep animations performant on mobile devices.

Do not introduce a new animation library if the existing framework can handle the interaction.

---

# 26 — Things We Never Do

Never use motion that feels:

* Childish
* Cartoonish
* Hyperactive
* Corporate
* Futuristic
* Gamified
* Aggressive
* Excessively luxurious
* Trend-chasing

Avoid:

```text
❌ bounce
❌ confetti
❌ spinning products
❌ aggressive parallax
❌ cursor-following effects
❌ magnetic buttons everywhere
❌ huge text animations
❌ excessive blur
❌ animated gradients
❌ constant looping animations
❌ unnecessary page transitions
```

---

# 27 — Emotional Reference

The visual rhythm should feel closer to:

```text
a quiet morning
+
fresh cotton
+
sunlight through curtains
+
a family photograph
+
a handwritten note
+
a carefully wrapped gift
```

than:

```text
fashion campaign
+
e-commerce marketplace
+
technology startup
```

The brand should feel like something a parent wants to **keep**, not simply something they want to buy.

---

# 28 — Final Rule

When deciding whether to add an animation, ask:

> **Does this make the brand feel warmer, more human, or easier to understand?**

If the answer is no:

**Do not animate it.**

The strongest visual identity should come from:

```text
beautiful photography
+
excellent typography
+
generous whitespace
+
soft color
+
premium product presentation
+
quiet motion
```

Motion should be the **breath between moments**, not the main event.
