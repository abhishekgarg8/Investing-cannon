import { defineConfig } from 'astro/config';

// Static build. Vercel auto-deploys on push to the branch.
// All content is read from the repo's markdown at build time (see src/lib/content.ts).
export default defineConfig({
  site: 'https://investing-canon.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
});
