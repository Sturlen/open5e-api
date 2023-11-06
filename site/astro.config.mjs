import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/static";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: vercel({
    analytics: true
  }),
  integrations: [react(), {
    name: "Open5e",
    hooks: {"astro:config:setup": () => console.log("poggers1")}
  }]
});