export const locales = ['lt', 'en'] as const;
export type Locale = (typeof locales)[number];

export type NavKey =
  'portfolio' | 'producers' | 'trade' | 'approach' | 'contact';

// '' locally; '/repo-name' when the site is served from a GitHub Pages project path.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function stripBase(pathname: string): string {
  if (!base || !pathname.startsWith(base)) return pathname;
  return pathname.slice(base.length) || '/';
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'lt') return withBase(normalized);
  if (normalized === '/') return withBase('/en');
  return withBase(`/en${normalized}`);
}

type Copy = {
  metaTitle: string;
  metaDescription: string;
  skip: string;
  menu: string;
  close: string;
  language: string;
  nav: { key: NavKey; label: string }[];
  tradeLogin: string;
  heroTitle: string;
  heroLede: string;
  heroCta: string;
  heroSide: string[];
  portfolioEyebrow: string;
  portfolioTitle: string;
  portfolioText: string;
  browsePortfolio: string;
  approachEyebrow: string;
  approachTitle: string;
  approachText: string;
  approachCta: string;
  approachAlt: string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredCopy: string;
  viewPortfolio: string;
  tradeEyebrow: string;
  tradeTitle: string;
  tradeText: string;
  tradeCta: string;
  footerTagline: string;
  footerTomorrow: string;
  rights: string;
  selectionTitle: string;
  selectionIntro: string;
  all: string;
  emptyCategory: string;
  backToPortfolio: string;
  filters: string;
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  producersTitle: string;
  producersIntro: string;
  producerDrinks: string;
  detail: {
    style: string;
    grapes: string;
    composition: string;
    origin: string;
    colour: string;
    aroma: string;
    palate: string;
    notesWine: string;
    notesSpirit: string;
    formats: string;
    awards: string;
    producer: string;
    allProducers: string;
  };
  form: {
    name: string;
    company: string;
    email: string;
    enquiry: string;
    message: string;
    select: string;
    options: { value: string; label: string }[];
    submit: string;
    required: string;
    emailInvalid: string;
    successTitle: string;
    successText: string;
  };
};

export const ui: Record<Locale, Copy> = {
  lt: {
    metaTitle: 'MILESIMA — Retos kilmės. Ilgalaikės partnerystės.',
    metaDescription:
      'Kuruojamas išskirtinių vynų ir stipriųjų gėrimų portfelis profesionalams Lietuvoje. MILESIMA — daugiau nei distribucija.',
    skip: 'Pereiti prie turinio',
    menu: 'Meniu',
    close: 'Uždaryti',
    language: 'Kalba',
    nav: [
      { key: 'portfolio', label: 'Portfelis' },
      { key: 'producers', label: 'Gamintojai' },
      { key: 'trade', label: 'Verslui' },
      { key: 'approach', label: 'Požiūris' },
      { key: 'contact', label: 'Kontaktai' },
    ],
    tradeLogin: 'Verslo prisijungimas',
    heroTitle: 'Retos kilmės.\nIlgalaikės partnerystės.',
    heroLede:
      'Kuruojamas išskirtinių vynų ir stipriųjų gėrimų portfelis išrankiems profesionalams.',
    heroCta: 'Peržiūrėti atranką',
    heroSide: ['Žmonės', 'Vietos', 'Charakteris', 'Kiekviename butelyje'],
    portfolioEyebrow: 'Mūsų portfelis',
    portfolioTitle: 'Išskirtiniai dėl atrankos.',
    portfolioText:
      'Kruopščiai atrinkti vynai ir stiprieji gėrimai iš nepriklausomų gamintojų. Tikros išraiškos, sukurtos žmonių, kuriems rūpi.',
    browsePortfolio: 'Peržiūrėti portfelį',
    approachEyebrow: 'Požiūris',
    approachTitle: 'Daugiau nei distribucija.',
    approachText:
      'Ieškome gamintojų, kurie turi istoriją, vietą ir tikrą charakterį. Šiuos išskirtinius vynus ir stipriuosius gėrimus pristatome tinkamiems partneriams Lietuvoje.',
    approachCta: 'Susipažinkite su gamintojais',
    approachAlt: 'Vyno statinės prieblandoje apšviestame rūsyje',
    featuredEyebrow: 'Atrinkta',
    featuredTitle: 'Iš arčiau',
    featuredCopy: 'Keletas portfelio akcentų.',
    viewPortfolio: 'Visas portfelis',
    tradeEyebrow: 'Verslui',
    tradeTitle: 'Kurkime prasmingus dalykus kartu.',
    tradeText:
      'Dirbame su restoranais, viešbučiais, mažmenininkais ir privačiais klientais, kuriems svarbi kokybė, kilmė ir ilgalaikiai santykiai.',
    tradeCta: 'Tapkite partneriu',
    footerTagline: 'Žmonės. Vietos. Išskirtiniai gėrimai.',
    footerTomorrow: 'Geri žmonės. Puikūs gėrimai. Šviesesnis rytojus.',
    rights: '© 2026 MILESIMA. Visos teisės saugomos.',
    selectionTitle: 'Atranka.',
    selectionIntro:
      'Vynai ir stiprieji gėrimai, šiuo metu įtraukti į portfelį.',
    all: 'Visi',
    emptyCategory: 'Šioje kategorijoje dar nieko nėra.',
    backToPortfolio: 'Atgal į portfelį',
    filters: 'Kategorijos',
    contactEyebrow: 'Kontaktai',
    contactTitle: 'Užklausos.',
    contactText:
      'Dirbame su restoranais, viešbučiais, mažmenininkais ir privačiais klientais, kuriems svarbi kokybė, kilmė ir ilgalaikiai santykiai.',
    producersTitle: 'Gamintojai',
    producersIntro: 'Namai ir vietos, iš kurių sudėtas portfelis.',
    producerDrinks: 'Portfelyje',
    detail: {
      style: 'Tipas',
      grapes: 'Vynuogių veislės',
      composition: 'Sudėtis',
      origin: 'Kilmė',
      colour: 'Spalva',
      aroma: 'Aromatas',
      palate: 'Skonis',
      notesWine: 'Papildoma informacija',
      notesSpirit: 'Gamybos ypatumai',
      formats: 'Talpa ir pakuotė',
      awards: 'Apdovanojimai ir įvertinimai',
      producer: 'Apie gamintoją',
      allProducers: 'Visi gamintojai',
    },
    form: {
      name: 'Vardas',
      company: 'Įmonė',
      email: 'El. paštas',
      enquiry: 'Užklausa',
      message: 'Žinutė',
      select: 'Pasirinkite',
      options: [
        { value: 'portfolio', label: 'Portfelis' },
        { value: 'price', label: 'Kainoraštis' },
        { value: 'tasting', label: 'Degustacija' },
        { value: 'partnership', label: 'Partnerystė' },
      ],
      submit: 'Siųsti užklausą',
      required: 'Šis laukas privalomas.',
      emailInvalid: 'Įveskite tinkamą el. pašto adresą.',
      successTitle: 'Ačiū.',
      successText:
        'Kontaktų adresas dar nepaskelbtas, todėl užklausa neišsiųsta.',
    },
  },
  en: {
    metaTitle: 'MILESIMA — Rare origins. Lasting partnerships.',
    metaDescription:
      'A curated portfolio of exceptional wines and spirits for discerning professionals in Lithuania. MILESIMA is more than distribution.',
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    nav: [
      { key: 'portfolio', label: 'Portfolio' },
      { key: 'producers', label: 'Producers' },
      { key: 'trade', label: 'For trade' },
      { key: 'approach', label: 'Our approach' },
      { key: 'contact', label: 'Contact' },
    ],
    tradeLogin: 'Trade login',
    heroTitle: 'Rare origins.\nLasting partnerships.',
    heroLede:
      'A curated portfolio of exceptional wines and spirits for discerning professionals.',
    heroCta: 'Explore our selection',
    heroSide: ['People', 'Places', 'Character', 'In every bottle'],
    portfolioEyebrow: 'Our portfolio',
    portfolioTitle: 'Distinctive by choice.',
    portfolioText:
      'Thoughtfully selected wines and spirits from independent producers around the world. Authentic expressions, made by people who care.',
    browsePortfolio: 'Browse portfolio',
    approachEyebrow: 'Our approach',
    approachTitle: 'More than distribution.',
    approachText:
      'We seek out producers with a story, a place and a true sense of character. We bring these exceptional wines and spirits to the right partners in Lithuania.',
    approachCta: 'Meet the producers',
    approachAlt: 'Wine barrels in a dimly lit cellar',
    featuredEyebrow: 'Featured',
    featuredTitle: 'A closer look',
    featuredCopy: 'A few highlights from our portfolio.',
    viewPortfolio: 'View full portfolio',
    tradeEyebrow: 'For trade',
    tradeTitle: "Let's build something meaningful together.",
    tradeText:
      'We work with restaurants, hotels, retailers and private clients who value quality, provenance and long-term relationships.',
    tradeCta: 'Become a partner',
    footerTagline: 'People. Places. Exceptional spirits.',
    footerTomorrow: 'Good people. Great drinks. A brighter tomorrow.',
    rights: '© 2026 MILESIMA. All rights reserved.',
    selectionTitle: 'The selection.',
    selectionIntro: 'The wines and spirits currently in the portfolio.',
    all: 'All',
    emptyCategory: 'Nothing in this category yet.',
    backToPortfolio: 'Back to portfolio',
    filters: 'Categories',
    contactEyebrow: 'Contact',
    contactTitle: 'Enquiries.',
    contactText:
      'We work with restaurants, hotels, retailers and private clients who value quality, provenance and long-term relationships.',
    producersTitle: 'Producers',
    producersIntro: 'The houses and places behind the portfolio.',
    producerDrinks: 'In the portfolio',
    detail: {
      style: 'Style',
      grapes: 'Grapes',
      composition: 'Composition',
      origin: 'Origin',
      colour: 'Colour',
      aroma: 'Nose',
      palate: 'Palate',
      notesWine: 'Notes',
      notesSpirit: 'Production',
      formats: 'Formats',
      awards: 'Awards and ratings',
      producer: 'About the producer',
      allProducers: 'All producers',
    },
    form: {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      enquiry: 'Enquiry',
      message: 'Message',
      select: 'Select',
      options: [
        { value: 'portfolio', label: 'Portfolio' },
        { value: 'price', label: 'Price list' },
        { value: 'tasting', label: 'Tasting' },
        { value: 'partnership', label: 'Partnership' },
      ],
      submit: 'Send enquiry',
      required: 'This field is required.',
      emailInvalid: 'Enter a valid email address.',
      successTitle: 'Thank you.',
      successText:
        'A contact address is not published yet, so this enquiry was not sent.',
    },
  },
};

export function navHref(locale: Locale, key: NavKey): string {
  const home = localePath(locale, '/');
  if (key === 'portfolio') return `${home}#portfolio`;
  if (key === 'trade') return `${home}#trade`;
  if (key === 'approach') return `${home}#approach`;
  if (key === 'producers') return localePath(locale, '/producers');
  return localePath(locale, '/contact');
}
