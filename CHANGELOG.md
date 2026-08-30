# Changelog

All notable changes to this project are documented here.

## 2.0.0

### Added

- **File-type presets** — `.md-file-<ext>` sets the matching Material color and,
  when the element is left empty, renders an auto label (`.md-file-pdf`,
  `.md-file-ts`, `.md-file-xlsx`, …). ~75 extensions covered, editable from SCSS
  via the new `$md-file-extensions` map.
- **`data-ext` attribute** — `<span class="md-file" data-ext="rs"></span>`
  auto-labels any extension not in the preset map.
- **Runtime theming via CSS custom properties** — `--md-file-bg`,
  `--md-file-color`, `--md-file-fold`, and `--md-file-cut` can be overridden on
  `:root`, a wrapper, or a single element without recompiling SCSS.

### Changed

- Size scale expanded from 4 to 9 steps: `xs`, `sm`, `md` (default), `lg`, `xl`,
  `2xl`, `3xl`, `4xl`, `5xl`. Height and label size now derive from the width via
  `$md-file-aspect` / `$md-file-font-ratio`.
- Icons are now a portrait document shape instead of a square.
- The folded corner is now drawn with `clip-path` plus a gradient tint instead of
  border triangles; the small top-left tab has been dropped. The icon reads the
  same but the exact pixels differ.
- Color modifiers (`.md-file-blue`, …) now set `--md-file-bg` instead of hard
  `background-color` / `border-color` declarations.
- Build toolchain migrated from Gulp + Dart Sass to Vite 8 (Rolldown). Demo now
  deploys to GitHub Pages from `main` via GitHub Actions.

### Breaking

- `package.json` gained an `exports` map — deep imports other than `./css`,
  `./scss`, and `./package.json` are no longer resolvable.
- SCSS partial renamed `_variable.scss` → `_variables.scss`.
- `$md-file-font-sizes` token removed; the old size ratios changed.
- `.md-file` markup that relied on the top-left tab or exact corner geometry will
  render slightly differently.

## 1.x

Material Design file icons in pure CSS: `.md-file` base, four sizes, 19 Material
colors, any label or icon as child content.
