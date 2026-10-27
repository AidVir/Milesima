import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/ui';
import wineGlass from '../assets/scenes/wine-color2.jpg';
import sparklingGlass from '../assets/scenes/cat-sparkling.jpg';
import whiskyGlass from '../assets/scenes/cat-whisky.jpg';
import cognacGlass from '../assets/scenes/cat-cognac.jpg';
import rumGlass from '../assets/scenes/cat-rum.jpg';
import raw from './drinks.json';
import { categoryLabels, tagLabels } from './labels';
import {
  validateData,
  type CategoryId,
  type Drink,
  type DrinkData,
  type DrinkFormat,
  type Localized,
  type Producer,
  type TagId,
} from './schema';

export type { CategoryId, Drink, DrinkFormat, Localized, Producer, TagId };
export { tagLabels };

const data = raw as unknown as DrinkData;
const problems = validateData(data);
if (problems.length) {
  throw new Error(`src/data/drinks.json is invalid:\n${problems.join('\n')}`);
}

const imageFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/drinks/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
  },
);

export function drinkImage(file: string): ImageMetadata | undefined {
  return file ? imageFiles[`../assets/drinks/${file}`]?.default : undefined;
}

export type Category = {
  id: CategoryId;
  label: Localized;
  image: ImageMetadata;
  alt: Localized;
};

// One still life per category: a single glass on a near-black ground in warm light.
const categoryImages: Partial<
  Record<CategoryId, Omit<Category, 'id' | 'label'>>
> = {
  wine: {
    image: wineGlass,
    alt: { lt: 'Taurė raudonojo vyno', en: 'A glass of red wine' },
  },
  sparkling: {
    image: sparklingGlass,
    alt: {
      lt: 'Graviruota šampano taurė prie žvakės',
      en: 'An etched champagne coupe by candlelight',
    },
  },
  whisky: {
    image: whiskyGlass,
    alt: { lt: 'Viskio stiklinė su ledu', en: 'A whisky tumbler with ice' },
  },
  cognac: {
    image: cognacGlass,
    alt: {
      lt: 'Krištolinė konjako taurė',
      en: 'A crystal cognac snifter',
    },
  },
  rum: {
    image: rumGlass,
    alt: { lt: 'Krištolinė romo stiklinė', en: 'A crystal tumbler of rum' },
  },
};

export const categories: Category[] = categoryLabels.flatMap(
  ({ id, label }) => {
    const visual = categoryImages[id];
    return visual ? [{ id, label, ...visual }] : [];
  },
);

export const producers: Producer[] = data.producers;

// Hidden drinks stay in the data file for the admin, but never reach the public site.
export const drinks: Drink[] = data.drinks.filter(
  (drink) => drink.status === 'active',
);

export function getFeatured(): Drink[] {
  return drinks.filter((drink) => drink.featured).slice(0, 6);
}

export function getByCategory(id: CategoryId): Drink[] {
  return drinks.filter((drink) => drink.category === id);
}

export function getBySlug(slug: string): Drink | undefined {
  return drinks.find((drink) => drink.slug === slug);
}

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getProducer(id: string): Producer | undefined {
  return producers.find((producer) => producer.id === id);
}

export function getByProducer(id: string): Drink[] {
  return drinks.filter((drink) => drink.producer === id);
}

export function producerName(drink: Drink): string {
  return getProducer(drink.producer)?.name ?? '';
}

export function placeLine(drink: Drink, locale: Locale): string {
  const region = drink.region[locale];
  const country = drink.country[locale];
  return region ? `${region} · ${country}` : country;
}

export function showProducer(drink: Drink): boolean {
  const name = producerName(drink);
  return Boolean(name) && !drink.name.startsWith(name);
}

export function drinkAlt(drink: Drink, locale: Locale): string {
  return locale === 'lt' ? `${drink.name} butelis` : `Bottle of ${drink.name}`;
}

function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'lt' ? 'lt-LT' : 'en-GB', {
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatLine(format: DrinkFormat, locale: Locale): string {
  const abv =
    locale === 'lt'
      ? `${formatNumber(format.abv, locale)} %`
      : `${formatNumber(format.abv, locale)}%`;
  return `${formatNumber(format.volume, locale)} l · ${abv}`;
}
