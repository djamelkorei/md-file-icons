<h1 align="center">MD File Icons</h1>

<p align="center">Material Design file icons drawn entirely in CSS — no SVG, no icon font.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/md-file-icons"><img src="https://img.shields.io/npm/v/md-file-icons.svg" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/md-file-icons.svg" alt="license"></a>
</p>

<p align="center"><a href="https://djamelkorei.github.io/md-file-icons/">Live demo &amp; playground →</a></p>

## Install

```bash
npm install md-file-icons
```

Or via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/md-file-icons/dist/md-file-icons.css" />
```

## Usage

Import the stylesheet, then add the `.md-file` class:

```css
@import "md-file-icons";
```

```html
<span class="md-file"></span>
<span class="md-file">TXT</span>
<span class="md-file"><i class="fa-solid fa-music"></i></span>
```

### File-type presets

`.md-file-<ext>` sets the matching Material color and, when the element is left
empty, renders an auto label:

```html
<span class="md-file md-file-pdf"></span>   <!-- red · "PDF"  -->
<span class="md-file md-file-ts"></span>    <!-- blue · "TS"   -->
<span class="md-file md-file-xlsx"></span>  <!-- green · "XLS"  -->
```

~75 extensions are covered (documents, code, media, archives, config). Put your
own text inside to override the label. For anything not in the map, use
`data-ext`:

```html
<span class="md-file" data-ext="rs"></span>
```

Extend or edit the map from SCSS via `$md-file-extensions`.

### Runtime theming

Every icon reads CSS custom properties, so you can retheme without recompiling:

```css
:root {
  --md-file-bg: #222;      /* body color                */
  --md-file-color: #eee;   /* label color               */
  --md-file-fold: rgba(0, 0, 0, 0.35); /* folded corner  */
}
```

### Sizes

`.md-file-xs` · `.md-file-sm` · `.md-file-md` (default) · `.md-file-lg` ·
`.md-file-xl` · `.md-file-2xl` · `.md-file-3xl` · `.md-file-4xl` · `.md-file-5xl`

Every icon is a portrait document shape; height and label size scale from the
width. Tune the proportions with `$md-file-aspect` and `$md-file-font-ratio`.

### Colors

Add `.md-file-<name>`:

`red` · `pink` · `purple` · `deep-purple` · `indigo` · `blue` · `light-blue` ·
`cyan` · `teal` · `green` · `light-green` · `lime` · `yellow` · `amber` ·
`orange` · `deep-orange` · `brown` · `grey` · `blue-grey`

```html
<span class="md-file md-file-blue md-file-lg">PDF</span>
```

### Customizing with SCSS

Override any design token before the module loads:

```scss
@use "md-file-icons/scss" with (
  $md-file-background: #222,
  $md-file-font-weight: 600
);
```

## Development

```bash
npm run dev         # demo page with HMR
npm run build       # compile dist/md-file-icons.css
npm run build:site  # build the demo site into dist-site/
```

Built with [Vite 8](https://vite.dev). The demo deploys to GitHub Pages from
`main` on every push.

## License

[MIT](LICENSE) © Djamel Eddine Korei
