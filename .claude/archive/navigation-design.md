# Language Subsection Navigation Design

## Overview
Comprehensive redesign of the navigation system for the language subsections (Grammar, Dictionary, Phrasebook, Texts). The new system brings desktop and mobile experiences closer together while maintaining a clean, reading-focused interface.

## Problem Statement

Previously, the layout had:
- Horizontal subsection nav between global nav and content
- Simple left sidebar with articles for current subsection
- No table of contents sidebar
- No responsive mobile UX

Issues:
- Two separate horizontal navbars felt cluttered
- Subsection switching wasn't quick enough
- Mobile experience undefined
- Space inefficiency with long article lists (15-30 items)

## Design Evolution & Key Decisions

### 1. Sidebar vs Horizontal Nav
**Decision:** Move subsection switcher from horizontal nav to left sidebar
**Rationale:** More integrated navigation, better use of space, cleaner top bar

### 2. Article List Prioritization
**Decision:** With 15-30 articles, put subsections in a dropdown menu (☰) rather than always visible
**Rationale:** Articles are primary content on any given page; subsection switching is secondary. Full vertical space for article list.

### 3. Top Nav Width
**Decision:** Keep global nav at **prose width**, not full-width
**Rationale:** Visual harmony with content area. More editorial/reading-focused than app-like VitePress pattern.

### 4. Top Nav Stickiness
**Decision:** Global nav is **NOT sticky**
**Rationale:** Users scroll down to read, not up to navigate. Search has keyboard shortcut. Language toggle used only at beginning. Non-sticky reduces visual clutter.

### 5. Mobile Navigation
**Decision:** Sticky bar at top with `[☰ Subsection ... ≡]` pattern
**Rationale:** Thumb-friendly, both nav (☰) and ToC (≡) always accessible. Matches sidebar header on desktop.

### 6. Table of Contents Placement
**Decision:**
- Desktop: Right sidebar (always visible)
- Tablet: Drawer triggered by ≡ button
- Mobile: Drawer triggered by ≡ button in sticky bar
**Rationale:** ToC on right sidebar (standard), hidden ≡ button on desktop when ToC is visible to avoid redundancy.

### 7. Menu Dropdown Structure
**Decision:** `☰` opens dropdown with:
- ← Язык (landing link)
- ─────── (divider)
- Грамматика ✓ (current, disabled)
- Словарь
- Разговорник
- Тексты
**Rationale:** Maintains site structure hierarchy; shows current context; all subsections accessible with one click.

## Final Responsive Design Specifications

### Desktop (≥1280px)
```
┌─────────────────────────────────────┐
│ Logo .... Search .... Language      │ (prose-width, NOT sticky)
├─────────────────────────────────────┤
│ [220px]        [centered]    [220px]│
│ Sidebar │    Content    │  ToC      │
│ ┌─────┐ │                │ ┌─────┐ │
│ │☰ GR │ │                │ │ ≡   │ │
│ │─────│ │                │ │ ──  │ │
│ │Art1 │ │                │ │ ──  │ │
│ │Art2 │ │                │ │ ──  │ │
│ │Art3 │ │                │ │     │ │
│ └─────┘ │                │ └─────┘ │
└─────────────────────────────────────┘
```
- Left sidebar: `[☰ ГРАММАТИКА]` header + articles list
- Center: Centered prose content
- Right sidebar: Full ToC (no ≡ button shown)
- ≡ button on sidebar header is **hidden** (ToC is visible)

### Tablet (768-1280px)
```
┌─────────────────────────┐
│ Logo .... Search .... Lang│ (prose-width, NOT sticky)
├─────────────────────────┤
│ [220px]    [wider]      │
│ Sidebar │  Content      │
│ ┌─────┐ │              │
│ │☰ GR≡│ │              │
│ │─────│ │              │
│ │Art1 │ │              │
│ │Art2 │ │              │
│ │Art3 │ │              │
│ └─────┘ │              │
└─────────────────────────┘
```
- Left sidebar: `[☰ ГРАММАТИКА ... ≡]` header + articles list
- ≡ button visible, opens **ToC drawer** (UDrawer, side=left or bottom sheet)
- Content shifted left, wider than center on desktop

### Mobile (<768px)
```
┌──────────────────────┐
│ Logo Search Lang     │ (compressed, NOT sticky)
├──────────────────────┤
│ ☰ Грамматика .... ≡  │ (sticky bar, always visible)
├──────────────────────┤
│                      │
│   Full-width         │
│   Content            │
│                      │
└──────────────────────┘
```
- No sidebars
- **Sticky bar**: `[☰ Грамматика ... ≡]`
- ☰ button: Opens **nav drawer** with:
  - ← Язык
  - Грамматика ✓
  - Словарь
  - Разговорник
  - Тексты
  - (plus articles list from current subsection)
- ≡ button: Opens **ToC drawer**
- Content: Full width, centered

## Left Sidebar Structure (Desktop & Tablet)

### Header (Fixed)
```
┌─────────────────┐
│ ☰ ГРАММАТИКА  ≡ │ (on tablet; ≡ hidden on desktop)
└─────────────────┘
```
- Left ☰: Opens subsection menu dropdown
- Center: Current subsection name (uppercase, bold)
- Right ≡: Opens ToC (tablet/mobile only, hidden on desktop)

### Content (Scrollable)
```
┌─────────────────┐
│ Падежи      ✓   │
│ Частицы         │
│ Связки          │
│ [more articles] │
└─────────────────┘
```
- Articles for current subsection
- Max 220px width
- `max-h-[calc(100vh-120px)]` with `overflow-y-auto` for independent scrolling
- Articles scroll; header stays fixed

### Styling Details
- Header background: slightly darker/lighter than article list
- Current subsection: bold, prominent
- Articles: normal weight, subtle hover effect
- Hover colors: blue-600 (dark: blue-400)
- Use semantic tokens: neutral-600, blue-600, etc.

## Mobile Sticky Bar

### Components
```
┌──────────────────────┐
│ ☰ Грамматика .... ≡  │
└──────────────────────┘
```
- **Left (☰ icon + subsection name):** Clickable, opens nav drawer
- **Right (≡ icon):** Clickable, opens ToC drawer
- **Position:** Sticky at top, below global nav
- **Height:** ~48-56px for touch-friendly targets

### Nav Drawer (UDrawer)
Contents when ☰ is clicked:
```
← Язык
──────────────────
Грамматика   ✓
Словарь
Разговорник
Тексты
──────────────────
[Падежи]     ✓
[Частицы]
[Связки]
[... all articles]
```
- Top: Landing link
- Divider
- Subsections (current one disabled/marked)
- Divider
- Articles from current subsection
- Auto-closes on navigation

### ToC Drawer (UDrawer)
Contents when ≡ is clicked:
- Table of contents from current page
- UDrawer with scrollable content
- Auto-closes on click

## Implementation Notes

### Components Needed
1. **Left Sidebar Component** - Navigation, article list
2. **Mobile Sticky Bar Component** - Responsive header for <1280px
3. **Navigation Drawer** - UDrawer for subsections + articles (mobile)
4. **ToC Drawer** - UDrawer for table of contents (tablet/mobile)
5. **Menu Dropdown** - Subsection switcher (☰)

### Data Structure
```typescript
subsections = [
  { id: 'grammar', title: 'Грамматика' },
  { id: 'dictionary', title: 'Словарь' },
  { id: 'phrasebook', title: 'Разговорник' },
  { id: 'texts', title: 'Тексты' }
];

articles = [
  { title: 'Падежи', path: '#' },
  { title: 'Частицы', path: '#' },
  { title: 'Связки', path: '#' }
  // Will be dynamic per subsection
];
```

### Computed Properties
- `currentSubsection`: Extract from path (e.g., `grammar` from `/language/grammar/cases`)
- `isLanguageSubsection`: Detect if on any language subsection path
- `showLeftSidebar`: Show on ≥768px (desktop/tablet)
- `showStickyBar`: Show on <1280px (tablet/mobile)

### Key CSS Classes
- Left sidebar: `max-h-[calc(100vh-120px)]`, `overflow-y-auto`, `sticky top-[100px]`
- Sticky bar (mobile): `sticky top-[56px]` (below global nav)
- Grid layout (desktop/tablet): `grid-cols-[220px_1fr_220px]` → `grid-cols-[220px_1fr]` → `grid-cols-1`

### Responsive Breakpoints
- **Desktop:** `>= 1280px` - Left sidebar + Right ToC visible, no sticky bar
- **Tablet:** `768px - 1279px` - Left sidebar visible, ToC drawer, sticky bar hidden
- **Mobile:** `< 768px` - No sidebars, sticky bar + drawers

## Future Enhancements

1. **Dynamic Articles List** - Load articles per subsection from config/data
2. **Active Article Highlighting** - Mark current article in sidebar
3. **Breadcrumb Component** - Show full path in content header
4. **Search Integration** - Keyboard shortcut for search modal
5. **Table of Contents Generation** - Auto-generate from page headings
6. **History/Scroll Restoration** - Preserve scroll position on drawer close

## Print Styling

**Complete UI hide on print media:**
```css
@media print {
  /* Hide all navigation UI */
  nav, aside, .sidebar, .toc, footer { display: none !important; }

  /* Optional: minimal breadcrumb for context */
  .page-header-breadcrumb { display: block !important; }

  /* Clean page styling */
  body { margin: 0; padding: 1rem; }
  a { text-decoration: none; }
  * { background: white !important; }
}
```

**Rationale:**
- Articles are self-contained; sidebars/nav not needed on paper
- Users expect textbook-like printouts: content only
- Maximizes readability and paper usage
- Aligns with "minimal UI" philosophy
- Optional breadcrumb (Urssivar / Grammar / Падежи) helps if pages are separated
- Printable aesthetic is core to the design vision

**Result:** Printed pages feel like excerpt from a well-designed reference book, not a website printout.

---

## Design Philosophy

- **Reading-focused:** Minimize navigation clutter, maximize content space
- **Progressive disclosure:** Secondary features (subsection switching) in dropdown, not always visible
- **Mobile-first responsive:** Mobile UX informs desktop design
- **Clean hierarchy:** Global nav (utility) → Subsection nav (context) → Articles (content)
- **Consistent across sizes:** Similar patterns at all breakpoints, adapted to screen constraints
- **Print-first aesthetic:** Digital UI disappears on print; content is the hero

---

P.S. adding this question myself: currently our footer displays license + 3 social media icons. I don't think social media icons are needed on every page. What if we only keep them at the main landing, add the social networks' names, and a headline (e.g. "subscribe to our channels, etc."). And maybe remove github, too.

The second question: what to put into footer then? Remove it altogether by moving license to landing? Keep license on every page? Add "last edited" too for every page? 
