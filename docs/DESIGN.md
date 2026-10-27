# MILESIMA — UI/UX design system

Target for implementation. This spec follows the moodboard (`Moodboard.jpg`) and the palette and typefaces named for the build. It replaces the slightly different colours already in `src/styles/global.css`.

The moodboard’s display face is Canela. Canela is a commercial font and is not used here. **Cormorant Garamond** is the headline face: it is already loaded, it covers Lithuanian, and at large sizes with weight 500 it carries the same quiet, high-contrast editorial tone. Playfair Display is the only approved substitute if Cormorant is dropped later. Do not mix the two.

---

## 1. Brand style direction

MILESIMA should feel like a printed portfolio for the wine and spirits trade, not a shop. The page is calm, wide, and slow. Photography does the selling. Type names the idea and then gets out of the way.

**Feeling.** Editorial luxury. Refined, timeless, quiet. A trade house presenting origins, producers, and a short list of bottles. The reader is a sommelier, buyer, or restaurateur, not a casual cart user.

**Visual principles.**

- One idea per band. A section is a heading, a short paragraph, and either images or a single action.
- Ivory is the page. Charcoal is the voice. Olive and wine are used in small amounts.
- Photography is large, warm, and naturalistic: vineyards, glass still lifes, bottle labels, olive leaves. Same tonal family across the site. No cut-out product grids on pure white, no lifestyle stock with people toasting.
- Headlines are serif, large, and light in weight (500). They are sentences, not slogans in all caps.
- Labels, navigation, and buttons are small, uppercase, sans-serif, widely tracked.
- Structure is drawn with 1px lines, not with cards, shadows, or colour blocks.
- Buttons are flat rectangles. Corners are square. Radius is 0 everywhere, including images, fields, and buttons.
- Motion is limited to colour and opacity, about 150ms. No lifts, parallax, or sliding panels.
- Nothing on the page looks like a SaaS dashboard, a marketplace tile, or a promotional banner. No prices, badges, stars, “add to cart”, icon grids, or coloured category chips.

**Voice, already in the copy.** Short declarative lines. “Rare origins. Lasting partnerships.” “Distinctive by choice.” “More than distribution.” Keep new lines in that register, in both Lithuanian and English.

---

## 2. Colour palette

Use these values exactly. They are close to the moodboard swatches, with the hex values specified for this build.

| Token        | Hex / value              | Role                                                        |
| ------------ | ------------------------ | ----------------------------------------------------------- |
| `--ivory`    | `#F6F1E7`                | Page background, text on charcoal and on photos             |
| `--sand`     | `#E6E0D6`                | Alternate quiet field, bottle image well, input fill        |
| `--olive`    | `#68705C`                | Eyebrows and captions at 13px and above, secondary emphasis |
| `--wine`     | `#8B2E2E`                | Hover, focus, active text. Never a section fill             |
| `--charcoal` | `#1A1A1A`                | Primary text, primary button, approach panel, wordmark      |
| `--muted`    | `#6F6A61`                | Secondary body and product meta at 14px and above           |
| `--line`     | `rgba(26, 26, 26, 0.18)` | Header rule, section rules, field borders, footer rule      |

**Derived, not new hues.**

- `--ivory-80`: `rgba(246, 241, 231, 0.82)` for body copy on charcoal and on photographs.
- `--line-light`: `rgba(246, 241, 231, 0.35)` for rules and secondary buttons on dark bands.
- Photo scrim, only where type sits on a photograph: a left-to-right gradient from `rgba(26, 26, 26, 0.45)` to transparent, covering at most the left 55% of the frame. This is for legibility. It is not a drop shadow, and it is not used on components.

**Usage rules.**

- The page background is ivory. Sand is a nested field (a bottle well, a form), not a band that stripes the homepage.
- Charcoal text on ivory is the default. Muted is for supporting sentences and origins. Olive is for small labels when they need to recede; at 11–12px, labels use charcoal so contrast stays comfortable.
- Wine appears on hover and on `:focus-visible`. It is not used for headings, buttons at rest, or category labels.
- Do not introduce pure white, pure black, gold, bright green, or a second red.
- Do not tint photographs with overlays except the scrim above.

**Contrast.** Charcoal on ivory, ivory on charcoal, and wine on ivory are the combinations for text and controls. Muted on ivory is about 4.8:1, so keep it at 14px or larger. Olive on ivory is similar; do not set 11px labels in olive.

---

## 3. Typography system

Load the same families already in `Base.astro`: Cormorant Garamond 500 and 600 (latin and latin-ext), Inter 400 and 500 (latin and latin-ext). Lithuanian copy must use the latin-ext files.

| Role                  | Family             | Desktop | Mobile           | Weight | Line height | Tracking |
| --------------------- | ------------------ | ------- | ---------------- | ------ | ----------- | -------- |
| H1                    | Cormorant Garamond | 76px    | 44px             | 500    | 0.96        | −0.02em  |
| H2                    | Cormorant Garamond | 56px    | 36px             | 500    | 1.02        | −0.02em  |
| H3                    | Cormorant Garamond | 32px    | 26px             | 500    | 1.15        | −0.015em |
| Body                  | Inter              | 17px    | 16px             | 400    | 1.6         | 0        |
| Small uppercase label | Inter              | 12px    | 11px             | 500    | 1.35        | 0.16em   |
| Navigation            | Inter              | 12px    | 14px in the menu | 500    | 1           | 0.14em   |
| Button                | Inter              | 12px    | 12px             | 500    | 1           | 0.14em   |

Scale headings with `clamp()` between the mobile and desktop sizes. Do not let H1 exceed 84px.

**H1.** Two short sentences, left aligned, max width about 12ch so the line breaks after the first sentence in English (“Rare origins.” / “Lasting partnerships.”). Colour is ivory on the hero photograph, charcoal everywhere else. Weight 500, not 600. No italic.

**H2.** Section title. Max width about 16ch. One weight, one colour per band (charcoal on ivory, ivory on the approach and trade bands).

**H3.** Product name and any subhead inside a band. Charcoal. Not uppercase.

**Body.** Max width 38rem for paragraphs. Colour `--muted` on ivory, `--ivory-80` on charcoal and on photos. Measure stays narrow even when the section is wide.

**Small uppercase label.** The eyebrow above a heading (“Our portfolio”, “Featured”, “For trade”) and the caption under a category image. Uppercase, no punctuation except an existing ampersand. Colour charcoal for captions under images; olive is allowed for eyebrows at 12px on ivory. On dark bands, eyebrows are ivory at 70% opacity.

**Navigation.** Same uppercase treatment as labels, colour charcoal. The current item is charcoal with a 1px underline offset 6px, not a colour change and not wine. Hover colour is wine. Language codes “LT” and “EN” use this style; the active locale is underlined.

**Buttons.** Uppercase Inter, charcoal fill and ivory text (primary), or a 1px border and transparent fill (secondary). Include a trailing arrow as the text character `→`, separated by a normal space. The arrow is part of the label, not an icon font.

**The moodboard quotation** (“Quality reveals itself in the details.”) is a typographic sample, not a homepage element. Do not place it in the hero. If it is used later, set it in Cormorant 500 italic at H3 size, charcoal, with no quotation marks in the design chrome.

---

## 4. Layout system

**Max width.** `--max: 1320px` for text, category rows, product rows, and the header contents. Full-bleed bands (hero, approach, trade) run to the viewport edges. Their inner text still aligns to the 1320px column.

**Page gutters.** `--gutter: clamp(20px, 4vw, 40px)` on the header, footer, and contained sections. The 1320px column is `width: min(1320px, calc(100% - gutter * 2))`, centered.

**Section padding.**

- Desktop: 112px top and bottom.
- Tablet (700–1099px): 80px.
- Mobile: 56px.
- The first contained section after the hero keeps the full top padding. Do not collapse it into the photograph.

**Grid.** A 12-column grid inside the max width. Column gap 24px from 1100px up, 16px below.

- Editorial heading block: 5 columns for the title, 6 columns for the paragraph, starting at column 7. One column of air between them.
- Approach band: 6 columns text, 6 columns image, full bleed, no gap. The text column is padded with the page gutter plus enough left inset to align with the 1320px column.
- Trade band: 6 columns headline, 5 columns copy, starting at column 8, vertically centered.
- Category row and product row are not forced onto the 12-column grid. They use their own equal columns (see components) so seven categories and a variable product count stay even.

**Vertical rules.** A 1px `--line` rule may separate the footer from the page. Do not box every section. The short rule under the hero headline is 48px wide and 1px, ivory, sitting 28px below the H1.

**Header offset.** Sticky header height is 72px desktop, 64px mobile. `scroll-padding-top` equals that height plus 16px.

**Mobile behaviour.** Below 700px the 12-column grid becomes one column. Heading, then paragraph, then action, then images. Gutters stay at least 20px. Nothing scrolls horizontally except the document itself. Category and product images wrap into a two-column grid rather than a carousel.

---

## 5. Component design

Shared rules for every component: border-radius 0, box-shadow none, no gradient fills except the photo scrim, no icon library. Interactive elements have a visible `:focus-visible` outline of 2px wine, offset 3px. Minimum hit target 44px.

### Header / navigation

Sticky, top, ivory background, 1px bottom border `--line`. Contents are a single row inside the max width, vertically centered.

- Left: wordmark “MILESIMA”. Cormorant Garamond 500, 22px, tracking 0.14em, charcoal, uppercase. Links to the locale home (`/` or `/en`).
- Center-right: Portfolio, Producers, For trade, Our approach, Contact. Moodboard order. Uppercase nav style. Gap 28px.
- Then the language pair “LT” and “EN”, gap 12px, with 24px of space before them. Active locale underlined.
- Right: “Trade login →” as a **secondary** button (transparent, 1px charcoal, height 40px, padding 0 16px). There is no account system yet. The control links to the trade band (`#trade`). It is a visual commitment from the moodboard, not a login flow.

Desktop only above 1100px. Below that, the wordmark stays left and a “Menu” / “Close” text button (not an icon) sits right. The open menu is a full-width ivory panel under the header, links stacked at 14px uppercase with 20px vertical padding, language pair, then the trade button full width. No dimmed overlay, no drawer from the side.

The header does not overlay the hero. The photograph starts below it.

### Hero section

Full viewport width. Height `clamp(560px, 78vh, 820px)`. One photograph (`vineyard2.jpg` or a replacement in the same warm coastal-vineyard register), `object-fit: cover`, object position weighted toward the horizon and the right so the left third stays darker for type.

Content sits in the upper-left of the frame, aligned to the max-width column, about 12% down from the top of the image.

1. H1, ivory.
2. 48px ivory hairline.
3. Small uppercase label, ivory, max width 36ch, the lede: “A curated portfolio of exceptional wines and spirits for discerning professionals.”
4. Primary button, 32px below the lede. On the photograph the primary button inverts: ivory fill, charcoal text. Hover fills wine, text ivory.
5. On the right edge of the same column, vertically centered in the frame, a stack of four labels with 18px between them, ivory at 75%: People / Places / Character / In every bottle. Hidden below 900px. These are `aria-hidden` decoration; the sentence is not extra information.

No card, no search, no down-arrow, no quotation in this band.

### Editorial heading block

The pattern used above the category row and, in a looser form, above featured products.

Desktop, inside the max width:

- Left: optional eyebrow, then H2.
- Right, top-aligned with the H2: one paragraph, then an optional text action.

The text action is not a filled button. It is the button style as a link: uppercase, tracking, charcoal, trailing arrow, no border. Hover colour wine. Example: “Browse portfolio →”.

Gap between the two columns is at least 48px. On small screens the paragraph falls under the heading, then the link.

### Category cards

A category is a link, not a card.

- Image: square, `object-fit: cover`, radius 0. Still-life of a glass or bottle in the category’s register. Warm, dim, consistent across the row.
- Caption directly under the image, 12px uppercase, centered, charcoal, margin-top 12px. Names from the moodboard: Wine, Champagne & sparkling, Whisky, Cognac, Tequila & mezcal, Gin, Rum & other spirits.
- No border, background, shadow, index number, or count.
- Hover: image opacity 0.88, caption colour wine. No movement.
- The whole tile is the hit area, including the caption.

Desktop: seven equal columns, gap 20px. If the data has fewer categories, the row still uses equal columns for however many exist. Do not leave an empty eighth slot, and do not stretch one image to fill.

The live catalog has five categories (wine, sparkling, whisky, cognac, rum). The component must accept a list, so tequila and gin can be added without a layout change. Until those images and entries exist, render the five. Do not invent placeholder tiles.

Each tile links to the portfolio catalog filtered by that category (`/portfolio/wine`, and the `/en` equivalent). Until those routes exist, link to `#portfolio`.

### Product cards

A product is a vertical stack on the ivory background. No plate, no border, no shadow.

- Image well: aspect ratio 3 / 4, background `--sand` only if the file has transparency. Otherwise the photograph sits directly on ivory. `object-fit: contain` for cut-out bottles, `cover` for photographs that already include a background. Padding 8px inside a contain well so the bottle does not touch the edges.
- Name: H3 at the product scale, 22px Cormorant 500, charcoal, left aligned, margin-top 16px.
- Meta: 14px Inter, muted, one line: region and country, separated by a middle dot. Example: “Champagne · France”. Producer is omitted on the homepage tile if the name already begins with the house; it is present on the catalog and detail views.
- No price, volume, badge, or button on the tile. The whole tile links to `/portfolio/[slug]`.

Hover: name colour wine. Image does not zoom.

Homepage shows only `featured: true`, in catalog order, up to six. The grid is `repeat(6, 1fr)` with gap 28px when six are shown, and `repeat(n, 1fr)` for fewer so five bottles share the row evenly. Adding a seventh featured product wraps to a second row of the same column size; the homepage should still cap the query at six. The catalog page shows all of them.

### Image banner section

Used for “Our approach”. Full bleed, two halves, min-height 560px desktop, 0 gap.

**Text half.** Background charcoal. Padding 80px 64px, and the left edge of the text aligns with the page column. Contents, stacked:

- Eyebrow “Our approach”, ivory at 70%.
- H2 “More than distribution.”, ivory.
- Body, max width 36ch, ivory at 82%.
- Secondary button, ivory border, ivory text, transparent fill: “Our approach →”. Hover fills ivory, text charcoal.

**Image half.** Bottle or label photograph, edge to edge, `object-fit: cover`. No caption on the image. Alt text describes the bottle, not the heading (the heading is already in the text half).

Desktop: text left, image right, 50 / 50. Below 800px: text first, image second, image height 320px.

### CTA section

“For trade”. Full-bleed photograph (olive leaves, dark, the existing `olive4.jpg` family), height `clamp(480px, 62vh, 680px)`. Scrim on the left as defined in the palette.

Inside the max-width column, vertically centered, two columns:

- Left, H2 ivory: “Let’s build something meaningful together.”
- Right, body ivory at 82%, max width 36ch, then primary button inverted (ivory fill, charcoal text): “Become a partner →”. The button links to the contact page.

Below 800px the columns stack, headline then copy then button, all left aligned, with 48px padding from the edges of the screen.

### Footer

Ivory background, 1px top border `--line`. Padding 48px 0 32px. Contents inside the max width.

**Top row.** Wordmark left, same treatment as the header but 18px. Under it, the tagline in 14px Inter muted: “People. Places. Exceptional spirits.” To the right, the same nav links as the header in one line, then two text links “LinkedIn” and “Instagram” (real URLs when they exist; until then omit the icons rather than drawing fake glyphs). Gap 24px.

**Bottom row.** Copyright left, 12px muted: “© 2026 MILESIMA. All rights reserved.”

**Motto.** Centered under the bottom row, 12px uppercase tracking 0.16em, charcoal, with a 32px hairline on each side: “Good people. Great drinks. A brighter tomorrow.”

Below 700px the nav wraps under the wordmark, the motto’s side rules hide, and everything is left aligned except the motto, which stays centered.

### Contact form

Not a homepage band. It is the body of the Contact page, linked from the header.

Page structure, max width, one section of normal padding:

- Editorial heading block. Eyebrow “Contact”. H2 “Enquiries.” Paragraph: one sentence on who the form is for (restaurants, hotels, retailers, private clients). No map, no office illustration.
- Form on sand is unnecessary. Fields sit on ivory.

Fields, single column, max width 560px:

| Field   | Control  | Notes                                                                         |
| ------- | -------- | ----------------------------------------------------------------------------- |
| Name    | text     | Required                                                                      |
| Company | text     | Optional                                                                      |
| Email   | email    | Required                                                                      |
| Enquiry | select   | Portfolio, price list, tasting, partnership. The empty option reads “Select”. |
| Message | textarea | 6 rows, required                                                              |

Labels sit above controls, small uppercase, charcoal, margin-bottom 8px. Controls: height 48px (textarea auto), background ivory, border 1px `--line`, radius 0, padding 0 14px, Inter 16px charcoal. Placeholder colour muted. Focus: border charcoal, plus the global wine outline.

Error text: 14px wine, under the field, no icon. Submit is the primary charcoal button, label “Send enquiry →”, placed 8px below the last field, left aligned. Success replaces the form with an H3 and one sentence. Do not use a toast.

There is no phone-number grid, no newsletter checkbox, and no captcha widget drawn as a card. Spam protection can be added later without changing the layout.

---

## 6. Homepage layout

Single page, top to bottom, in this order. No producers index and no contact form on this page. Those are separate destinations linked from the header. Copy below is the English source; Lithuanian stays the existing strings in `src/i18n/ui.ts`.

### 6.1 Header

As specified. Sits on ivory above the hero.

### 6.2 Hero

Photograph of the coastal vineyard. Headline “Rare origins. Lasting partnerships.” Hairline. Uppercase lede. Button “Explore our selection →” scrolling to `#portfolio`. Right-hand stack: People, Places, Character, In every bottle.

### 6.3 Portfolio / category section

`id="portfolio"`. Ivory. Editorial heading block.

- Eyebrow: “Our portfolio”.
- H2: “Distinctive by choice.”
- Paragraph, right column: “Thoughtfully selected wines and spirits from independent producers around the world. Authentic expressions, made by people who care.”
- Action: “Browse portfolio →”, linking to the catalog route, or `#portfolio` until that route exists.

Then the category row. Five tiles until tequila and gin exist. Order: Wine, Champagne & sparkling, Whisky, Cognac, Rum & other spirits. When the two missing categories are added, insert Tequila & mezcal and Gin before Rum, matching the moodboard.

### 6.4 Our approach image band

`id="approach"`. Charcoal text half, bottle photograph half. Heading “More than distribution.” Body is the existing approach paragraph. Button “Our approach →” scrolls to this band’s text; once an approach page exists it links there. On the homepage the button can be omitted if it only repeats the section the reader is already in. Preferred: keep it, linking to `#approach` is pointless, so link it to the contact page with the same sentence the band already makes. Label remains “Our approach →” only if a longer approach page exists. Until then use no button in this band rather than a self-link. The moodboard shows the button; the honest spec is: render “Our approach →” as a link to `/approach` when that page is added, and omit the control on the first build.

### 6.5 Featured products

`id="featured"`. Ivory. A lighter editorial head:

- Left: eyebrow “Featured”, H2 “A closer look”.
- Right, one line of 14px muted copy, vertically centered with the heading on desktop: “A few highlights from our portfolio.” Then the text action “View full portfolio →” to the catalog.

Then the featured product row. Current featured set, in this order: Vivanco Reserva, Soligo Prosecco DOC Treviso Brut, Kinahan’s Cask Project LL, Naud VS, Naud Ron Panama 15 YO. Five columns until a sixth featured product is flagged.

### 6.6 For trade CTA

`id="trade"`. Olive-leaf photograph. H2 “Let’s build something meaningful together.” Body: “We work with restaurants, hotels, retailers and private clients who value quality, provenance and long-term relationships.” Button “Become a partner →” to the contact page.

### 6.7 Footer

As specified. Anchor links for Portfolio, Our approach, and For trade point at the homepage ids. Producers points at `/producers`. Contact points at `/contact`.

---

## 7. Portfolio / products system

The homepage is a curated view. The catalog is the full list. Both read the same data. Adding a product is adding an object, an image, and nothing else.

### Product shape

```ts
type CategoryId =
  'wine' | 'sparkling' | 'whisky' | 'cognac' | 'tequila' | 'gin' | 'rum';

type Product = {
  name: string;
  slug: string; // unique, lowercase, ascii, hyphens
  category: CategoryId;
  producer: string;
  country: string; // stored per locale, lt and en
  region: string; // stored per locale
  description: string; // short, one or two sentences, per locale
  image: ImageMetadata; // imported in the data module or a sibling map
  featured: boolean;
};
```

`slug` is the URL key: `/portfolio/vivanco-reserva` and `/en/portfolio/vivanco-reserva`. It does not change when the marketing name is edited.

`featured` controls the homepage only. The catalog ignores it except as a possible future sort. Several products may be featured; the homepage takes the first six in array order.

Country and region stay separate so the tile can print “Rioja · Spain” and a later filter can group by country. The current `place` string is split into those two fields during the data migration. Volume and ABV are out of this view. They can be added later as optional fields without changing the card.

### Category shape

```ts
type Category = {
  id: CategoryId;
  label: { lt: string; en: string };
  image: ImageMetadata;
};
```

Order in the array is the display order. Counts are not shown.

### Catalog page

Route: `/portfolio` and `/en/portfolio`. Optional filter route `/portfolio/[category]`.

Page anatomy:

- Header and footer, same as home.
- Editorial heading. Eyebrow “Portfolio”. H2 “The selection.” One sentence of introduction.
- A filter row, not a tab bar: text links in the nav style for All, then each category. The active filter is underlined. They are real links, so a category URL can be shared.
- Product grid: `repeat(auto-fill, minmax(200px, 1fr))`, gap 32px 24px. Same product card as the homepage. On a catalog card, add the producer as a second meta line when it is not already obvious from the name.
- Empty filter: one sentence, no illustration. “Nothing in this category yet.”

No sort dropdown, no search field, no pagination until the list is long enough to need it. A few dozen bottles still fit one page.

### Product page

Route: `/portfolio/[slug]`. Not required to match a moodboard frame, but the system should allow it.

- Narrow column, max 720px, inside the usual page.
- H1 is the product name. Meta line: producer, then region and country.
- Image, max height 640px, contain, sand well if needed.
- Short description.
- Text link back: “Back to portfolio →”.

No related-products carousel. A later edit can add three more bottles from the same category under an H2.

### Producers

`/producers` is a simple list, not on the homepage. Name in Cormorant, place in muted Inter, separated by 1px rules. Data can stay as the existing producer array. This page is secondary to the portfolio system.

---

## 8. Responsive design

Breakpoints are width thresholds, not device names. Layout changes at 1100px (navigation), 900px (hero side labels), and 800px (split bands). Type and section padding interpolate; they do not jump at every breakpoint.

**Desktop, 1100px and up.** Header is one row. Hero side labels are visible. Category row is one line of equal columns. Featured products are one line. Approach and trade are side by side. Editorial headings are split 5 / 6.

**Tablet, 700px to 1099px.** Header collapses to wordmark plus Menu. Hero height stays in the same clamp; the side label stack hides at 900px. Categories wrap: four on the first line, the rest on the second, same gap, images still square. Products in three columns. Approach and trade stack below 800px, text then image for approach, text over the photograph for trade. Section padding 80px. H1 and H2 use the middle of their clamps.

**Mobile, under 700px.** Gutters 20px. Section padding 56px. H1 44px, H2 36px. Hero `min-height` 560px, type in the upper left, button under the lede. The inverted primary button may go full width if the lede wraps to four lines; otherwise it stays intrinsic width. Categories in two columns, gap 16px, captions still centered and allowed to wrap to two lines. Products in two columns, names wrap, meta stays one line and truncates with an ellipsis only if it overflows. Trade headline and button stack inside the photograph with 48px padding; if the photograph becomes too dark to read at the top, the scrim covers the full frame at 40% charcoal instead of only the left half. Footer stacks. Menu panel as specified in the header. No horizontal scroll, no sticky buy bar, no bottom navigation.

**Images.** Serve widths that match the slot: hero up to 2000px, category tiles around 480px, product bottles around 640px, banners around 1400px. Always set `alt`. Decorative hero side labels are not images. The hero photograph’s alt can be empty because the heading carries the section name; the approach photograph’s alt names the bottle.

**Type in Lithuanian.** Lines run longer than English. Headings wrap within their max width. Do not lock the hero to two lines with a fixed height. Buttons grow with the label; they do not truncate.

---

## 9. Astro implementation notes

Implement the spec in the existing `web` app. Do not add a component library.

### CSS variables

Put the palette, type, and layout tokens on `:root` in `src/styles/global.css`. Replace the current ivory, olive, wine, and line values.

```css
:root {
  --ivory: #f6f1e7;
  --sand: #e6e0d6;
  --olive: #68705c;
  --wine: #8b2e2e;
  --charcoal: #1a1a1a;
  --muted: #6f6a61;
  --line: rgba(26, 26, 26, 0.18);
  --ivory-80: rgba(246, 241, 231, 0.82);
  --line-light: rgba(246, 241, 231, 0.35);

  --serif: 'Cormorant Garamond', 'Palatino Linotype', Palatino, serif;
  --sans: Inter, 'Segoe UI', sans-serif;

  --max: 1320px;
  --gutter: clamp(20px, 4vw, 40px);
  --header: 72px;
  --section: clamp(56px, 8vw, 112px);

  --h1: clamp(2.75rem, 6vw, 4.75rem);
  --h2: clamp(2.25rem, 4vw, 3.5rem);
  --h3: clamp(1.625rem, 2vw, 2rem);
}
```

`theme-color` in `Base.astro` becomes `#F6F1E7`. Global element styles set the ivory background, charcoal colour, and the two families. Component CSS consumes variables only. No hex in a component unless it is a one-off scrim built from the charcoal RGB already in the tokens.

### Components

Split `Home.astro` into presentational components. Pages compose them. Suggested files under `src/components/`:

| Component                | Responsibility                                                                                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Header.astro`           | Wordmark, nav, locale, trade link, menu script                                                                                                                                                                  |
| `Hero.astro`             | Photograph, heading, lede, button, side labels                                                                                                                                                                  |
| `EditorialHeading.astro` | Eyebrow, title, optional copy, optional action                                                                                                                                                                  |
| `CategoryCard.astro`     | One category tile                                                                                                                                                                                               |
| `CategoryRow.astro`      | Maps categories into a row                                                                                                                                                                                      |
| `ProductCard.astro`      | One product tile. Prop `heading` level so the homepage can use h3                                                                                                                                               |
| `ProductRow.astro`       | Featured or catalog grid                                                                                                                                                                                        |
| `ImageBanner.astro`      | Approach split                                                                                                                                                                                                  |
| `TradeCta.astro`         | For-trade photograph band                                                                                                                                                                                       |
| `Footer.astro`           | Wordmark, nav, motto                                                                                                                                                                                            |
| `ContactForm.astro`      | Fields and success state. Progressive enhancement: a real `action` if a form endpoint is added later; until then the script can prevent submit and show the success message only after required fields validate |

`Home.astro` becomes a composition of Hero, the portfolio section, ImageBanner, the featured section, TradeCta. `Base.astro` keeps the document shell, fonts, skip link, and global CSS. Header and Footer move to the layout so catalog, product, contact, and producers pages share them.

```astro
<Base locale={locale}>
  <Header locale={locale} />
  <main id="main">
    <Hero locale={locale} />
    <Portfolio locale={locale} />
    <ImageBanner locale={locale} />
    <Featured locale={locale} />
    <TradeCta locale={locale} />
  </main>
  <Footer locale={locale} />
</Base>
```

Pass `locale` and read strings inside the component from `ui`, or pass already-selected strings as props. Prefer props for presentational components so they do not reach into the dictionary themselves. `EditorialHeading` receives `eyebrow`, `title`, `copy`, `actionHref`, `actionLabel`.

### Data

Extend `src/data/catalog.ts` to the product shape in section 7. Keep images as static imports so Astro can transform them. A product module that imports five images is fine; if the list grows, a folder `src/assets/products/` keyed by slug stays manageable.

```ts
export function getFeatured(): Product[] {
  return products.filter((product) => product.featured).slice(0, 6);
}

export function getByCategory(id: CategoryId): Product[] {
  return products.filter((product) => product.category === id);
}

export function getBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
```

### Routes

| Route                                               | Page                                                                                                                                                                                                                                |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`, `/en`                                          | Homepage composition                                                                                                                                                                                                                |
| `/portfolio`, `/en/portfolio`                       | Catalog, all products                                                                                                                                                                                                               |
| `/portfolio/[category]`, `/en/portfolio/[category]` | Filtered catalog                                                                                                                                                                                                                    |
| `/portfolio/[slug]`                                 | Only if slug routing can be distinguished from category ids. Prefer `/portfolio/product/[slug]` if a dynamic segment would clash with `wine`, `rum`, and the rest. Category ids and product slugs must not share one dynamic route. |
| `/contact`, `/en/contact`                           | Editorial heading plus `ContactForm`                                                                                                                                                                                                |
| `/producers`, `/en/producers`                       | Rule-separated list                                                                                                                                                                                                                 |

Use `getStaticPaths` for category and product pages. Unknown slugs 404.

### Styling practice

- One global stylesheet is enough while the site is this small. Scope component rules with a class prefix (`.hero`, `.category`, `.product`, `.banner`, `.trade`, `.site-footer`, `.form`).
- Buttons: `.btn` and `.btn-secondary`. A modifier `.btn-inverse` for controls on photographs.
- The category row: `display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));` is acceptable, but at desktop sizes set an explicit `repeat(var(--category-count), 1fr)` from a style attribute or a data attribute so five items do not grow into huge tiles with `auto-fit` and a small minimum. Passing the count is more faithful than a wrapping auto-fit on a wide screen.
- Product homepage row: the same explicit column count, capped at 6.
- Catalog grid: `repeat(auto-fill, minmax(200px, 1fr))`.
- Do not add Tailwind, a CSS framework, or a client UI kit.
- The header menu script can stay as a small inline script. No framework island is required for the menu or the form.

### What not to build yet

- Trade authentication behind “Trade login”.
- Prices, stock, carts, filters beyond category, search.
- A producers homepage band.
- Placeholder tiles for tequila and gin.
- The Canela webfont.

When this spec and the moodboard disagree about a hex value, follow this spec. When they disagree about layout, follow the moodboard and the homepage order in section 6.
