// Category and tag names. Kept apart from catalog.ts so the admin can use them without
// bundling drinks.json, and without reloading itself every time it saves that file.
import type { CategoryId, Localized, TagId } from './schema';

// Display order follows the moodboard. Tequila and gin are not in the decks, so they have no entry.
export const categoryLabels: { id: CategoryId; label: Localized }[] = [
  { id: 'wine', label: { lt: 'Vynas', en: 'Wine' } },
  {
    id: 'sparkling',
    label: { lt: 'Šampanas ir putojantis', en: 'Champagne & sparkling' },
  },
  { id: 'whisky', label: { lt: 'Viskis', en: 'Whisky' } },
  { id: 'cognac', label: { lt: 'Konjakas', en: 'Cognac' } },
  {
    id: 'rum',
    label: { lt: 'Romas ir kiti stiprieji', en: 'Rum & other spirits' },
  },
];

export const tagLabels: Record<TagId, Localized> = {
  limited: { lt: 'Riboto leidimo', en: 'Limited edition' },
  vintage: { lt: 'Derliaus metų', en: 'Vintage' },
  'cask-strength': { lt: 'Statinės stiprumo', en: 'Cask strength' },
};
