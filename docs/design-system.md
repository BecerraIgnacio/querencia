# Design System Specification: High-End Editorial Livestock Intelligence

## 1. Overview & Creative North Star
**The Creative North Star: "The Clinical Archivist"**

This design system rejects the "app-like" fluidity of modern SaaS in favor of the rigid, authoritative weight of a scientific broadsheet. It is inspired by Swiss International Style and mid-century archival journals. The goal is to present complex livestock disease data not as a digital dashboard, but as a living, high-end editorial infographic.

To break the "template" look, we employ **Intentional Asymmetry**. Containers do not always align to a centered spine; instead, they shift along a modular grid to create active white space. We avoid the "softness" of modern UI by enforcing a strict **0px radius policy** and high-contrast, razor-sharp divider lines. This is a system of "Modern Brutalism"—clean, serious, and uncompromisingly structured.

---

## 2. Colors
The palette is rooted in a warm, organic base to evoke the feeling of bone-white paper, contrasted by a high-alert "Global Red" and specific scientific accents.

### Core Palette
- **Background (`surface`):** `#F6F1E8` (Bone White) - The foundation of the archival feel.
- **Global System Color (`primary`):** `#D72626` - Used for critical alerts, primary branding, and systemic high-priority data.
- **Neutral On-Surface:** `#111111` - All text and structural lines use this high-contrast black.

### Species Accents (Data Categorization Only)
These colors are used exclusively for species-specific data visualization and tagging. They should never be used for primary UI actions.
- **Cattle:** `#6E4BD8` (Deep Violet)
- **Pig:** `#D97A9A` (Muted Rose)
- **Sheep:** `#3C7BEA` (Scientific Blue)
- **Poultry:** `#C9A200` (Ochre Gold)

### The "Structured Line" Rule
Unlike traditional modern UI which uses background shifts, this system **mandates** the use of `#111111` 1px divider lines. 
- **Rule:** Use lines to define sections, not background fills. 
- **The Asymmetry Hack:** Lines should often extend beyond the content container or stop short of the edge to create an editorial, "un-boxed" feel.
- **Prohibited:** No gradients. No glassmorphism. No blurs. Everything must feel like ink on paper.

---

## 3. Typography
The system relies on a "Dual-Typeface Authority." We use the serif **Newsreader** for narrative and editorial weight, and the sans-serif **Public Sans** for data-heavy utility.

### Typography Scale
- **Display LG (`newsreader`, 3.5rem):** Reserved for hero statistics or major disease names. Kerned tight for a premium feel.
- **Headline MD (`newsreader`, 1.75rem):** Used for section headers. Always paired with a `#111111` 1px top-border.
- **Title LG (`publicSans`, 1.375rem):** Bold, all-caps. Used for data category labels.
- **Body MD (`publicSans`, 0.875rem):** The workhorse for descriptions. High line-height (1.6) for readability.
- **Label SM (`publicSans`, 0.6875rem):** Monospaced-style tracking (+5%) for metadata, timestamps, and species tags.

---

## 4. Elevation & Depth
In this system, "depth" is an illusion created by layering and borders, not shadows.

- **Zero Elevation:** Shadows are strictly prohibited. The UI is 2D. 
- **The Stacking Principle:** To create hierarchy, use "Inky" overlays. A secondary container is not defined by a shadow, but by a 1px border or a subtle shift to `surface_container` (`#F2EDE4`).
- **The "Technical" Border:** Use the `outline` token (`#916F6B`) only for disabled states. For all active structural elements, use the "Thin Black Divider" (`#111111`).
- **Asymmetrical Offsets:** To show "lift," physically offset a container by `0.7rem` (spacing 2) from its background grid, allowing the background color to act as a "shadow."

---

## 5. Components

### Buttons
- **Primary:** Solid `#D72626` background, white text, 0px radius. No hover gradient; hover state is a simple shift to a slightly darker red or an inversion to black.
- **Secondary:** 1px `#111111` border, transparent background, black text. 
- **Tertiary:** Underlined text (`#111111`), no container.

### Data Chips & Tags
- **Species Tags:** 1px border of the species color (e.g., `#6E4BD8` for Cattle) with a 20% opacity fill of the same color. Square corners only.
- **Status Chips:** High-contrast black background with white `label-sm` text for "ARCHIVED" or "CONFIRMED."

### Tables & Lists (The Editorial Grid)
- **Forbid:** Alternating row colors (zebra striping).
- **Enforce:** Use 1px `#111111` horizontal lines between all list items. 
- **Asymmetry:** Align labels to the far left and data values to the far right, leaving a wide "gut" of white space in the middle to emphasize the editorial layout.

### Input Fields
- **Styling:** A simple 1px bottom-border (`#111111`). No four-sided boxes unless part of a multi-input grid. 
- **Focus State:** The bottom border thickens to 2px in `primary` red.

### The "Specimen Card"
A custom component for this system. A large square container with a 1px border, featuring a large Serif title in the top left and a Species Accent color block (24px x 24px) in the bottom right.

---

## 6. Do's and Don'ts

### Do
- **Do** use vertical text for sidebar labels or category markers to enhance the "poster" aesthetic.
- **Do** allow content to "bleed" off the edge of a divider line to create visual interest.
- **Do** use significant white space (Scale 16 or 20) between major editorial sections.
- **Do** treat every page as if it were being sent to a high-end offset printer.

### Don't
- **Don't** use rounded corners (`0px` is the absolute rule).
- **Don't** use "soft" colors or pastels for anything other than secondary species accents.
- **Don't** use drop shadows to indicate importance; use size, line weight, or the Global Red.
- **Don't** use "standard" center-aligned layouts. If a section feels too balanced, offset a column to create "Active Tension."

---

## 7. Spacing Logic
The system uses a **base-7 increment** to feel slightly off-beat compared to standard 8pt grids:
- **Small (2):** 0.7rem (Tight grouping)
- **Medium (4):** 1.4rem (Standard padding)
- **Large (8):** 2.75rem (Section breathing room)
- **Massive (16):** 5.5rem (Major editorial breaks)