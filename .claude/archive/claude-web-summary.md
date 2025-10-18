I'll search through our project conversations about the Kaitag documentation site.Based on our project conversations, here's a comprehensive summary of the Kaitag documentation site work:

# Kaitag Documentation Site - Project Summary

## Project Overview
- **Purpose**: Documentation website for Kaitag language as part of Urssivar initiative (5-year campaign to document Kaitag language, history, and villages)
- **Tech Stack**: VitePress with custom theme
- **Sites**: 
  - `urssivar.com` - minimalistic landing with village map
  - `codex.urssivar.com` - language documentation (VitePress)

## Core Design Philosophy
**Minimalism & Typography over Chrome**
- Content is the feature
- Good typography & spacing
- Convenient navigation
- SEO and responsive layout
- Fast loads (for Dagestan connectivity)
- No unnecessary UI elements (theme switches, social links, etc.)

## Technical Decisions

### Framework Choice
- **VitePress v1 (stable)** - not v2 alpha
- **Custom theme from scratch** vs extending default
  - Additive work (build only what's needed)
  - ~200 lines total for MVP
  - Avoids fighting default theme complexity

### Content Structure
- **3 text types**: 
  1. Russian/English body text
  2. Kaitag language text
  3. Russian/English glosses/translations

### Typography System
- **Body**: Inter 16px
- **Kaitag** (`lang="xdq"`): EB Garamond 20px medium (for readability)
- **Gloss**: Inter 14px, muted color (0.875em relative sizing)
- **Highlight**: Thick grayish underline
- **Tables**: Smaller text maintaining relative hierarchy (using em units for scalability)

### Custom Markdown Syntax
- `++kaitag++` - wraps in spans with lang="xdq"
- `--gloss--` - wraps in spans with class
- `==highlight==` - adds underline styling
- Custom containers with `:::` syntax (simplified from VitePress default)

### Navigation Structure
- **2 levels needed**:
  1. Site-wide: Home | Language | Genealogy
  2. Section switcher: Grammar | Dictionary | Phrasebook | Texts
- Skip auto-TOC sidebar (prefer single-column book-like layout)
- Manual nav config (scale doesn't warrant auto-generation yet)

### Interactive Features
- **Clickable headers**: Click any header to scroll & update URL hash
- Implementation via `useHeaderClicks()` composable in `.vitepress/composables/`
- Uses `onContentUpdated` hook to run after page changes

### Accessibility Considerations
- Content aimed at ordinary folk
- Clear exception marking (e.g., "Исключение:" for grammatical exceptions)
- Arrow notation `→` for transformations (intuitive but not too techy)
- Proper contrast ratios for muted text

## File Organization
```
.vitepress/
  theme/
    Layout.vue
    style.css
    index.js
  composables/
    useHeaderClicks.ts
  config.js
components/
  VillageMap.vue (reused from landing)
language/
  grammar/
  dictionary/
```

## Deployment
- Single repo for landing + docs
- Vercel deployment
- Build: `vitepress build`
- Output: `.vitepress/dist`

## Key Implementation Notes
- Use CSS variables from Nuxt UI for consistency
- Container markdown-it extension for custom `:::` syntax
- Lambda functions preferred in composables
- Proper semantic HTML with `lang` attributes for Kaitag text
- No browser storage APIs in artifacts (use React state instead)
