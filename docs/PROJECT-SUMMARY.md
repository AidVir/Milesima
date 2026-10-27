# MILESIMA site — project summary

A local bilingual vitrine for MILESIMA UAB. The site presents the existing wine and spirits portfolio to trade partners. It does not sell online, take payment, or pretend to send enquiries.

This repository is the site. `docs/` holds this summary, `DESIGN.md` and the moodboard. The source decks and the brief stay outside the repository, in the parent project folder.

## Stack

- Astro static site, custom CSS, no component library.
- Lithuanian is the default at `/`. English is at `/en`.
- Fonts are Cormorant Garamond and Inter. Canela is not licensed, so it is not used.
- Run it from the repository root with `npm run dev`. The dev server used in this project is `http://127.0.0.1:4321/`.

## Pages

| Route                            | What it is                          |
| -------------------------------- | ----------------------------------- |
| `/` and `/en`                    | Homepage                            |
| `/portfolio` and `/en/portfolio` | Selection, with category filters    |
| `/portfolio/[category]`          | One category                        |
| `/portfolio/product/[slug]`      | One product                         |
| `/producers` and `/en/producers` | Houses already in the decks         |
| `/contact` and `/en/contact`     | Enquiry form                        |
| `/admin`                         | Local drinks admin, dev server only |

The same routes exist under `/en`. Category tiles go to those catalog routes. They do not jump to a product on the homepage.

## Homepage

1. Header with the wordmark, navigation, LT/EN, and Trade login. Trade login scrolls to the partnership band. It is not a portal.
2. Hero on a vineyard photograph: “Rare origins. Lasting partnerships.” and “Explore our selection”.
3. Portfolio categories: wine, champagne & sparkling, whisky, cognac, rum & other spirits. Counts are not shown. Tequila and gin are not shown, because the decks do not use them as categories.
4. “More than distribution.” on a wide vineyard photograph, with “Our approach” linking to the producers page.
5. Featured products, one real bottle from each category that exists in the decks.
6. “Let’s build something meaningful together.” on a wide olive-grove photograph, with “Become a partner” linking to contact.
7. Footer with the wordmark, the circular seal, and the motto. No social links, because no real URLs were provided.

Photo buttons are transparent, with an ivory outline. The approach band is a charcoal text half beside a photograph, so no type sits on that image. The hero and trade bands keep type on the photograph behind a charcoal scrim strong enough for the bright daylight images.

## Catalog

All 42 drinks from the three decks are listed (48 slides; gift-box, tube, glasses and 4.5 l variants are formats of one drink). They live in `src/data/drinks.json`: wine 16, champagne and sparkling 9, whisky 9, cognac 3, rum and other spirits 5 (including the two Yakusun spirit drinks). Each product page shows style, grapes or ingredients, origin, colour, aroma, palate, notes, formats with volume and ABV, awards, and the producer's story. The portfolio page groups drinks by category.

The homepage features Vivanco Reserva, Soligo Prosecco DOC Treviso Brut, Kinahan’s Cask Project LL, Naud VS and Naud Ron Panama 15 YO. Nothing is invented to fill the catalog. The producers page lists the 15 houses named in the decks, with their stories and drinks.

Lithuanian text follows the decks, with obvious typos fixed. English text is a translation and needs review. See `README.md` for the data model and the local admin at `/admin`.

## What was deliberately left out

- Prices (the decks have none), guarantees, testimonials, certifications, and a privacy policy.
- A hosted admin or login. `/admin` runs only under `npm run dev` and edits the local data file.
- A contact email or `mailto` link. The form validates in the browser and says the enquiry was not sent, because no address is published.
- Competitor brands in photography.
- A custom domain. The preview is published to GitHub Pages by `.github/workflows/deploy.yml`, and `robots.txt` keeps it out of search engines.

## Brand

The wordmark lockup replaces the typed “MILESIMA” in the header and footer. The circular mark is the favicon and a small seal above the footer motto. Original logo files at the project root were not moved. The site uses cropped copies with the white canvas removed.
