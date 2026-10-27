import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import { adminApi } from './api';

// Adds /admin and its API to `astro dev` only. `astro build` never sees either, so the
// published static site has no admin page, no write endpoint and nothing to authenticate.
export function milesimaAdmin(): AstroIntegration {
  return {
    name: 'milesima-admin',
    hooks: {
      'astro:config:setup': ({
        command,
        config,
        injectRoute,
        updateConfig,
      }) => {
        if (command !== 'dev') return;
        injectRoute({
          pattern: '/admin',
          entrypoint: new URL('./src/admin/AdminPage.astro', config.root),
        });
        updateConfig({
          vite: { plugins: [adminApi(fileURLToPath(config.root))] },
        });
      },
    },
  };
}
