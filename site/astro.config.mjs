import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/static"
import {readFileSync, readdirSync, writeFileSync} from "fs"

import react from "@astrojs/react";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: vercel({
    analytics: true
  }),
  integrations: [react(), {
    name: "Open5e",
    hooks: {"astro:config:setup": () => {
      const monsters = []
      const data_path= "../data"
      const cache_path = "./public"
      const dirs = readdirSync(data_path)
      dirs.map(dirname => {
        const dir = readdirSync(path.join(data_path, dirname))
        if (!dir.includes("document.json")) {
          return
        }
        
        const document = JSON.parse(readFileSync(path.join(data_path, dirname, "document.json"), {encoding: "utf-8"}))[0]
        const document__license_url = document.license_url || document.url
        const document__slug = document.slug
        const document__title = document.title
        const document__url = document.url
        console.log("document", document__title)

        if (dir.includes("monsters.json")) {
          
          const doc_monsters = JSON.parse(readFileSync(path.join(data_path, dirname, "monsters.json"), {encoding: "utf-8"})).map(mon => ({...mon, document__license_url, document__slug, document__title, document__url}))
          monsters.push(...doc_monsters)
        }
      })

      writeFileSync(path.join(cache_path, "monsters.json"), JSON.stringify(monsters))
    }}
  }]
});