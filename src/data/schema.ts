// Drink data model shared by the public site, the admin UI and the admin API.
// The data itself lives in drinks.json; images live in src/assets/drinks/.

export const categoryIds = [
  'wine',
  'sparkling',
  'whisky',
  'cognac',
  'tequila',
  'gin',
  'rum',
] as const;
export type CategoryId = (typeof categoryIds)[number];

export const tagIds = ['limited', 'vintage', 'cask-strength'] as const;
export type TagId = (typeof tagIds)[number];

export const statuses = ['active', 'hidden'] as const;
export type Status = (typeof statuses)[number];

export type Localized = { lt: string; en: string };

export type DrinkFormat = {
  label: Localized;
  volume: number; // litres
  abv: number; // percent
  image: string; // file in src/assets/drinks, '' uses the drink image
};

export type Drink = {
  slug: string;
  name: string;
  category: CategoryId;
  producer: string; // producer id, '' when the decks do not name one
  status: Status;
  featured: boolean;
  country: Localized;
  region: Localized;
  origin: Localized; // finer origin than region, e.g. cognac crus
  style: Localized;
  composition: Localized; // grapes or raw materials
  colour: Localized;
  aroma: Localized;
  palate: Localized;
  notes: Localized;
  story: Localized; // overrides the producer story when set
  awards: Localized[];
  tags: TagId[];
  formats: DrinkFormat[];
  image: string;
  price: number | null; // internal only, never rendered on the public site
};

export type Producer = {
  id: string;
  name: string;
  place: Localized;
  story: Localized;
};

export type DrinkData = {
  producers: Producer[];
  drinks: Drink[];
};

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const imagePattern = /^[a-z0-9][a-z0-9._-]*\.(?:jpe?g|png|webp)$/;

export const localizedFields = [
  'country',
  'region',
  'origin',
  'style',
  'composition',
  'colour',
  'aroma',
  'palate',
  'notes',
  'story',
] as const;

export type DrinkErrors = Partial<Record<string, string>>;

const isText = (value: unknown): value is string => typeof value === 'string';
const isLocalized = (value: unknown): value is Localized =>
  typeof value === 'object' &&
  value !== null &&
  isText((value as Localized).lt) &&
  isText((value as Localized).en);

export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Field-level checks. Keys are field names (or `formats.0.volume`) so the admin form can place messages.
export function validateDrink(
  drink: Drink,
  data: DrinkData,
  originalSlug?: string,
): DrinkErrors {
  const errors: DrinkErrors = {};
  if (!isText(drink.name) || !drink.name.trim())
    errors.name = 'Name is required.';
  if (!isText(drink.slug) || !slugPattern.test(drink.slug)) {
    errors.slug = 'Use lowercase letters, numbers and single hyphens.';
  } else if (
    data.drinks.some(
      (other) => other.slug === drink.slug && other.slug !== originalSlug,
    )
  ) {
    errors.slug = 'Another drink already uses this slug.';
  }
  if (!categoryIds.includes(drink.category))
    errors.category = 'Choose a category.';
  if (
    drink.producer &&
    !data.producers.some((producer) => producer.id === drink.producer)
  ) {
    errors.producer = 'Unknown producer.';
  }
  if (!statuses.includes(drink.status)) errors.status = 'Choose a status.';
  if (typeof drink.featured !== 'boolean')
    errors.featured = 'Featured must be yes or no.';
  for (const field of localizedFields) {
    if (!isLocalized(drink[field]))
      errors[field] = 'Both languages must be text.';
  }
  if (!drink.country?.lt?.trim() || !drink.country?.en?.trim())
    errors.country = 'Country is required in both languages.';
  if (!isText(drink.image) || !imagePattern.test(drink.image))
    errors.image = 'Choose an image.';
  if (
    !Array.isArray(drink.tags) ||
    drink.tags.some((tag) => !tagIds.includes(tag))
  )
    errors.tags = 'Unknown tag.';
  if (
    !Array.isArray(drink.awards) ||
    drink.awards.some(
      (award) => !isLocalized(award) || !award.lt.trim() || !award.en.trim(),
    )
  ) {
    errors.awards = 'Each award needs Lithuanian and English text.';
  }
  if (
    drink.price !== null &&
    (typeof drink.price !== 'number' ||
      !Number.isFinite(drink.price) ||
      drink.price < 0)
  ) {
    errors.price = 'Price must be empty or a positive number.';
  }
  if (!Array.isArray(drink.formats) || drink.formats.length === 0) {
    errors.formats = 'Add at least one format.';
  } else {
    drink.formats.forEach((format, index) => {
      if (
        !isLocalized(format.label) ||
        !format.label.lt.trim() ||
        !format.label.en.trim()
      ) {
        errors[`formats.${index}.label`] =
          'Label is required in both languages.';
      }
      if (
        typeof format.volume !== 'number' ||
        !(format.volume > 0 && format.volume <= 30)
      ) {
        errors[`formats.${index}.volume`] =
          'Volume must be between 0 and 30 litres.';
      }
      if (
        typeof format.abv !== 'number' ||
        !(format.abv >= 0 && format.abv <= 100)
      ) {
        errors[`formats.${index}.abv`] = 'ABV must be between 0 and 100.';
      }
      if (
        !isText(format.image) ||
        (format.image && !imagePattern.test(format.image))
      ) {
        errors[`formats.${index}.image`] = 'Unknown image.';
      }
    });
  }
  return errors;
}

// Whole-file check used before anything is written to disk and when the site builds.
export function validateData(data: unknown): string[] {
  if (typeof data !== 'object' || data === null)
    return ['Data must be an object.'];
  const { producers, drinks } = data as DrinkData;
  if (!Array.isArray(producers) || !Array.isArray(drinks))
    return ['Data needs producers and drinks arrays.'];
  const problems: string[] = [];
  producers.forEach((producer, index) => {
    if (!isText(producer.id) || !slugPattern.test(producer.id))
      problems.push(`Producer ${index}: invalid id.`);
    if (!isText(producer.name) || !producer.name.trim())
      problems.push(`Producer ${index}: name is required.`);
    if (!isLocalized(producer.place) || !isLocalized(producer.story))
      problems.push(`Producer ${index}: place and story need both languages.`);
  });
  drinks.forEach((drink, index) => {
    const others = {
      producers,
      drinks: drinks.filter((_, other) => other !== index),
    };
    for (const [field, message] of Object.entries(
      validateDrink(drink, others),
    )) {
      problems.push(
        `${drink?.slug || `Drink ${index}`} · ${field}: ${message}`,
      );
    }
  });
  return problems;
}
