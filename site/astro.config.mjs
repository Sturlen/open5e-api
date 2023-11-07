import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/static"
import {readFileSync, readdirSync, writeFileSync} from "fs"

import react from "@astrojs/react";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: vercel({
    webAnalytics: true
  }),
  integrations: [react()]
});