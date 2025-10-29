# Foundations — Baap Connect UI

This document captures the initial design token decisions implemented in code. Values are sourced from the Baap Connect XD file and will be refined with design sign-off.

## Color Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--color-brand` | `#635BFF` | Primary actions, highlights |
| `--color-brand-foreground` | `#FFFFFF` | Text on brand background |
| `--color-ink` | `#1B1F3B` | Headlines and primary text |
| `--color-muted-ink` | `#5A6072` | Secondary copy |
| `--color-bg` | `#FFFFFF` | Base background |
| `--color-bg-soft` | `#F0F4FF` | Hero background and soft surfaces |
| `--color-border` | `#E0E3EF` | Dividers and card borders |
| `--color-muted` | `#EFF1FA` | Input backgrounds, subtle pills |
| `--color-ring` | `rgba(99, 91, 255, 0.45)` | Focus ring accent |

## Typography

- Display / H1: 48–56 px, Bold (Inter)
- H2 / H3: 28–32 px, SemiBold
- Body: 16 px regular, 14 px secondary
- Buttons & Inputs: 16 px medium, pill radius

## Radii

- Pill (fully rounded) for primary buttons and inputs (applied via Tailwind utility `rounded-full`)
- Cards use `rounded-2xl` (24 px)

## Shadows

- `shadow-card`: `0px 20px 40px rgba(22, 25, 79, 0.08)`
- `shadow-soft`: `0px 10px 20px rgba(22, 25, 79, 0.06)`

## Spacing Scale

4, 8, 12, 16, 24, 32, 48, 64 px increments applied through Tailwind spacing utilities.

## Assets

- Logo and hero illustration exported from XD should be placed inside `public/assets` when ready.

Screenshots from XD and implementation comparisons will be added after design review.
