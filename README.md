# MILESIMA

Bilingual static site for MILESIMA. Lithuanian is the default at `/`. English is at `/en`.

```bash
npm install
npm run dev      # http://localhost:4321, admin at http://localhost:4321/admin
npm run check    # astro check (TypeScript and .astro diagnostics)
npm run build    # static site in dist/
```

Node 22 or newer is required.

Design spec, project summary and moodboard are in `docs/`.

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). One-time setup in the repository: **Settings → Pages → Build and
deployment → Source: GitHub Actions**. The workflow passes the Pages URL and project path to the build
(`SITE_URL`, `BASE_PATH`), so links work under `https://<user>.github.io/<repo>/`. Locally the site runs at `/`.

`public/robots.txt` blocks search engines while the site is a client preview. Change it to `Allow: /` for
launch.

## Drink data

All drinks and producers live in one file: `src/data/drinks.json`. Its shape and validation rules are in
`src/data/schema.ts`; the public pages read it through `src/data/catalog.ts`. Bottle images live in
`src/assets/drinks/` and are referenced by file name. Category and tag names are in `src/data/labels.ts`.

The build validates `drinks.json` and stops with a list of problems if anything is wrong.

- `status: "hidden"` keeps a drink in the file but removes it from every public page.
- `featured: true` puts a drink on the homepage. The first six in file order are shown.
- `formats` lists each size or pack. A format may have its own image.
- `story` overrides the producer's story on the product page. Leave it empty to use the producer's.
- `price` is internal only. It is never rendered. The source decks have no prices.

The data was extracted from the three decks in the parent folder (`Vynas_be_kainu.pptx`,
`Sampanas ir putojantis vynas be kainu.pptx`, `Stiprieji gerimai be kainu.pptx`): 48 slides, 42 drinks once
pack variants (gift box, tube, glasses, 4.5 l cradle) are grouped as formats. English text is a translation of
the Lithuanian deck copy and should be reviewed before publishing.

## Admin

`/admin` exists only while `npm run dev` runs. It is added by `src/admin/integration.ts` and is not part of
`npm run build`, so the published site has no admin page and no write endpoint.

It can add, edit, hide, show and delete drinks, upload bottle images, and filter by name, category and status.
Saves go straight to `src/data/drinks.json` (and uploads to `src/assets/drinks/`) on this computer. The dev
site updates immediately. **The published site changes only after `npm run build` and a deploy.**

Safeguards: the API answers only on localhost, requires a custom header and same-origin requests, validates
every save with the same rules as the build, refuses to overwrite a file that changed since the page loaded,
writes atomically, and checks uploaded image types by content.

There is no login. That is deliberate: the admin is a local tool, not a hosted one. Editing the live site
from a browser, by other people or from other machines, needs a real backend: for example a Git-based CMS such
as Keystatic or Decap with GitHub sign-in, or a hosted CMS or database with proper authentication.

## Photography

Category tiles and section photographs in `src/assets/scenes/` are from Unsplash, free under the
[Unsplash License](https://unsplash.com/license) (commercial use allowed, no attribution required):

| File                     | Photographer                    |
| ------------------------ | ------------------------------- |
| `cat-sparkling.jpg`      | @cherenkevich                   |
| `cat-whisky.jpg`         | @nampoh                         |
| `cat-cognac.jpg`         | @moniqa                         |
| `cat-rum.jpg`            | @ymoran                         |
| `hero-vineyard-dusk.jpg` | Tim Mossholder (@timmossholder) |
| `approach-cellar.jpg`    | @raulmermans                    |
| `trade-olives.jpg`       | @throughalekslens               |

All category tiles share one treatment: a single glass on a near-black ground in warm light. Bottle images in
`src/assets/drinks/` come from the portfolio decks.

## Still to add

A Canela licence, contact email and phone, social URLs, a domain, a privacy policy, reviewed English copy,
and higher-resolution bottle photographs (the deck images are 450–1300 px tall).
