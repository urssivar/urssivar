# Urssivar

Bilingual (EN/RU) documentation site for the Kaitag language and culture of Dagestan — grammar, dictionary, genealogy, and village history.

**Live site:** <https://urssivar.com>

---

## Running locally

Node 24 required.

```sh
npm install
npm run dev      # dev server with hot reload
npm run build    # production build + search index
npm run preview  # preview the production build
```

Alternatively, use Docker:

```sh
docker compose up
```

## Project structure

```txt
src/                  # Content (markdown)
├── language/         # Grammar pages, dictionary
├── genealogy/        # Genealogy section
├── notes/            # Articles and cultural notes
└── ru/               # Russian mirror of all the above

.vitepress/
├── config.ts         # Site config (nav, locales, plugins)
├── components/       # Vue components
├── theme/            # Custom theme
└── data/             # dictionary.json, dna.json, villages.json
```

English content lives at the root (`src/`), Russian under `src/ru/`. Anchors use English slugs on both locales for stable cross-language links.

## Tech

[VitePress](https://vitepress.dev) + Vue 3 + [Nuxt UI](https://ui.nuxt.com). [Pagefind](https://pagefind.app) for static full-text search. D3, Leaflet, and Three.js for visualizations.

## Deployment

Automatically deployed to GitHub Pages on every push to `main` via GitHub Actions.

## License

Content: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)  
Code: [MIT](https://opensource.org/licenses/MIT)
