# Metabrain — landing page

The early-access landing page for [Metabrain](https://x.com/HelloMetabrain), an operating system for life.

**Stack:** SvelteKit 2 · Svelte 5 · Tailwind CSS 4 · TypeScript, prerendered and deployed to Vercel
with `@sveltejs/adapter-vercel`.

## Develop

```sh
npm install
npm run dev       # http://localhost:5173
npm run check     # type-check
npm run build     # production build → .vercel/output
npm run format    # prettier
```

Deploys automatically on push through the Vercel Git integration (Node 20+).

## Configuration

| Variable          | Purpose                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `PUBLIC_SITE_URL` | Optional. Absolute origin for canonical/Open Graph tags, e.g. `https://metabrain.app`. Defaults to Vercel's production domain. |

## Structure

```
src/
  app.css                    design tokens (view hues, type, surfaces) + shared components
  lib/canvas/lattice.ts      the hero animation engine (framework-free)
  lib/components/
    LatticeCanvas.svelte     mounts the engine: resize, visibility, pointer, bloom layer
    SignupForm.svelte        Mailchimp signup (inline JSONP, POST fallback)
    ComposerDemo.svelte      animated #metatag composer demo
    ScatterToFabric.svelte   "scattered apps → one fabric" problem visual
    ViewsBento.svelte        Notes / Projects / Web / Communications / Review mockups
    TagWeave.svelte          animated "one tag, every view" walkthrough
    TagPill.svelte           metatag pill; shared tags light up together on hover
    Logo.svelte              the mark
  routes/+page.svelte        page content and copy
static/                      favicon, icons, og.png social card
```

### Colour carries meaning

Each domain view owns one hue, used consistently for its chips, mockups, tags and the strands of
the hero lattice: **Notes** amber, **Projects** violet, **Web** teal, **Communications** rose.
**Review** reads across all four, so it wears the spectrum gradient of all four. The logo's four
strokes are the four domain views.

Every heading sets its key phrase in italic with the `.accent` class (the spectrum). Italic is
reserved for that accent.

### The lattice

Strands grow along a triangular (hex) lattice, turn and branch at nodes and fade, leaving a faint
trace of every path. The engine runs a fixed 60 Hz simulation (identical on 60/120/144 Hz
displays), is DPR-aware, pauses when off-screen or in a background tab, renders a single settled
frame under `prefers-reduced-motion`, and grows new strands from the mouse pointer. A
quarter-resolution copy, blurred and screened on top, provides the bloom.

### Mailing list

`SignupForm` posts to the Mailchimp audience via the JSONP endpoint so visitors stay on the page.
If that endpoint is unreachable, it falls back to a regular POST to Mailchimp's hosted signup, which
is also the no-JS behaviour. Successful signups fire a GA4 `sign_up` event.
