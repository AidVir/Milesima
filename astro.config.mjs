import { defineConfig } from 'astro/config';
import { milesimaAdmin } from './src/admin/integration.ts';

// The GitHub Pages workflow sets these. Locally the site runs at the domain root.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  integrations: [milesimaAdmin()],
  compressHTML: true,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'lt',
    locales: ['lt', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
