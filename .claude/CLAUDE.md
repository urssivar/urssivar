## Color System & Theming

The site uses Nuxt UI's semantic color system for consistent theming across light and dark modes.

### Configuration (`app.config.ts`)

**Color palette:**
- `primary: 'blue'` - Brand color for links, buttons, interactive elements
- `neutral: 'gray'` - Text, borders, backgrounds (uses Tailwind gray palette)

**Color mode:**
- `colorMode: { preference: 'system' }` - Automatically detects light/dark mode from OS

**Usage:**
- Use semantic tokens: `primary-600`, `neutral-900`, etc.
- Avoid hard-coded colors like `blue-600` or `gray-900`
- Change brand color in one place: modify `primary` in `app.config.ts`

### Typography & Fonts

**Font loading:**
- Fonts loaded via `@nuxt/fonts` module
- Auto-detects fonts from CSS `@theme` variables (`--font-sans`, `--font-serif`, `--font-mono`)
- IBM Plex Sans (body), IBM Plex Serif (headings), IBM Plex Mono (code)
- Automatically optimizes and loads required weights/styles from Google Fonts

**Text colors:**
- Handled by Nuxt UI's `text-default` on body
- Automatically switches between light/dark: `gray-900` / `gray-100`

### Image Color Handling

**Stamp component (`/app/components/Stamp.vue`):**
- Original SVG: white (`#fff`)
- Light mode: `invert-[88%]` → ~12% brightness (dark gray, matches text)
- Dark mode: `invert-[12%]` → ~88% brightness (light gray, matches text)
- Invert values calibrated to match body text contrast (`gray-900`/`gray-100`)

**Map backdrop (`/app/components/VillageMap.vue`):**
- Original WebP: dark/black topographic map
- Light mode: `invert-[12%]` → ~88% brightness (light gray)
- Dark mode: `invert-[88%]` → ~12% brightness (dark gray)
- Opposite invert percentages from stamp (stamp starts white, map starts black)

### CSS Organization (`app/assets/css/main.css`)

**Base layer contains only:**
- Font families (applied to body, headings)
- Custom spacing (heading/paragraph margins)
- Custom line-heights (`leading-relaxed` on main, `leading-tight` on headings)

**No color declarations:**
- All colors handled by Nuxt UI theme system
- Body background/text via Nuxt UI defaults
- Links styled via `<ULink>` component with custom config in `app.config.ts`

## Village Map Component

The VillageMap component (`/app/components/VillageMap.vue`) displays Kaitag villages as interactive markers over a topographic map backdrop using Leaflet.

### Architecture

**Technology stack:**
- **@vue-leaflet/vue-leaflet**: Vue 3 wrapper for Leaflet maps
- **Leaflet**: Interactive map rendering
- **Template-based LIcon markers**: Primary color dots with hover scaling via Tailwind classes
- **Nuxt UI tooltips**: Consistent tooltips with controlled open state and animations
- **ClientOnly + Transition**: SSR-safe loading with smooth fade-in animation

**Key features:**
- Village data: `/app/data/villages.json` (lat/lng coordinates in EPSG:4326)
- Auto-hover: Random village tooltip opens every 2.5s for 1.8s
- Manual hover: Tooltips show on mouse hover, resets auto-hover timer
- Marker animation: Dots scale to 1.5x on hover with CSS transitions
- Responsive: Map bleeds full-width, auto-fits to village bounds

### Code Structure

The component is organized into clearly-sectioned blocks:

1. **MAP CONFIGURATION**: Core setup and constants:
   - `villageBounds`: Computed min/max lat/lng from village data
   - `imageBounds`: Constant array `[[minLat, minLng], [maxLat, maxLng]]` for QGIS export bounds
   - `mapOptions`: Disables all user interactions (zoom, pan, etc.)

2. **TOOLTIP STATE**: Centralized selection functions:
   - `tooltipOpen`, `selectedVillage`, `markerElement` refs
   - `markerRefs`: Array of marker container elements, populated via LMarker `@ready` event
   - `selectVillage(index)`: Handles selection by village index (refs, scaling, tooltip open)
   - `deselectVillage()`: Closes tooltip and removes scaling

3. **AUTO-HOVER STATE**: Manages automatic tooltip display:
   - `AUTO_HOVER_DURATION` and `AUTO_HOVER_INTERVAL` constants (inline in `scheduleAutoHover`)
   - Single recursive `setTimeout` chain (not interval + timeout)
   - `scheduleAutoHover()`: Selects random village, then schedules deselection and next cycle
   - `pauseAutoHover()`: Clears timer on manual hover
   - Resumes with full interval delay after manual interaction ends
   - Starts automatically when map is ready (via LMap `@ready` event)

### Tooltip Implementation

**Why Nuxt UI tooltips work inside Leaflet:**
- Leaflet blocks pointer events on markers (`disableClickPropagation`)
- Solution: Use Leaflet's `@mouseover`/`@mouseout` events to manually control UTooltip via `v-model:open`
- Position reference: Marker container element stored in `markerRefs` via LMarker `@ready` event
- Portal: Default `body` portal works when reference element is properly set

**Key insights:**
- Manual DOM class manipulation (via `classList.add/remove`) for scaling prevents Vue reactivity from recreating elements and breaking tooltip positioning
- LMarker `@ready` event fires before Vue renders LIcon content, so `marker._icon.firstChild` is null at that point
- Store the container (`marker._icon`) in `@ready`, then navigate to children (`.firstChild.firstChild`) when selecting
- Template refs cause Vue to recreate elements, breaking tooltip positioning - use event-based capture instead

### Updating the Map Backdrop

When exporting a new map from QGIS:

**1. Export from QGIS:**
- CRS: EPSG:4326 (WGS 84)
- Format: PNG with antialiasing enabled
- Bounds: 47.2754° to 48.2753° lng, 41.8747° to 42.2207° lat
- Resolution: 3000-3500px width (DPI setting doesn't matter for web)

**2. Optimize the image:**
- Convert to WebP: `convert map.png -quality 85 -resize 2500x map.webp`
- Target: <500KB for good performance
- Save to `/public/map.webp`

**3. Update the component:**
- Update `imageBounds` constant with exact bounds: `[[minLat, minLng], [maxLat, maxLng]]`
- Update preload link in `app.vue` if filename changed
- Leaflet will handle positioning automatically

**Why WebP:**
- 60-70% smaller than PNG at same quality
- Better compression for photos/gradients
- Wide browser support (fallback not needed in 2024+)

### Styling Configuration

**Markers:**
- Primary color dots (`bg-primary-600`/`dark:bg-primary-400`) with neutral borders (`border-neutral-50`/`dark:border-neutral-900`)
- 12px size (w-3 h-3), centered in parent via flexbox
- Scale to 1.5x on hover with `transition-all ease-out` (200ms)
- Scaling applied via `classList.add('scale-150')` for both manual and auto-hover

**Tooltips:**
- Custom styling for map-specific use: `font-bold text-sm px-3 py-1.5` (inline classes)
- Not using global tooltip config - this is intentionally larger/more prominent for map
- Arrow enabled
- Positioned above marker (`side: 'top'`)
- Animation: Scale-in/scale-out for both instant-open and delayed-open states (configured in `app.config.ts`)

**Map backdrop:**
- `invert-[12%] dark:invert-[88%]` for consistent grayscale appearance across light/dark modes
- Transparent background on Leaflet container (via `@apply` in `:deep()`)
- Preloaded via `app.vue` for instant display
- Fades in with 500ms transition on mount

**SSR & Loading:**
- `<ClientOnly>` wraps Leaflet components (SSR-incompatible)
- `<Transition name="fade">` provides smooth appearance
- Auto-hover starts when LMap fires `@ready` event

### Selection Logic

The component uses centralized functions to manage village selection:

```ts
selectVillage(index: number)
```
- Gets marker container from `markerRefs[index]`
- Calls `deselectVillage()` first to remove previous selection
- Sets `selectedVillage`, `markerElement`, `tooltipOpen`
- Adds scale class to village dot via `.firstChild.firstChild.classList.add('scale-150')`
- Returns boolean (false if marker not found)

```ts
deselectVillage()
```
- Sets `tooltipOpen = false`
- Removes scale from current village via `.firstChild.firstChild.classList.remove('scale-150')`

**Manual hover flow:**
1. `@mouseover` → `pauseAutoHover()` → `selectVillage(i)`
2. `@mouseout` → `deselectVillage()` → `scheduleAutoHover()`

**Auto-hover flow:**
1. Timer selects random index → `selectVillage(i)`
2. Nested timer after duration → `deselectVillage()` → `scheduleAutoHover()`

### Troubleshooting

**Map not displaying:**
- Verify `imageBounds` constant matches QGIS export bounds exactly: `[[minLat, minLng], [maxLat, maxLng]]`
- Check `/public/map.webp` exists and is optimized (<500KB)
- Ensure Leaflet CSS is imported
- Verify preload link in `app.vue` points to correct image path

**Villages not appearing:**
- Verify villages.json is valid JSON with `name`, `lat`, `lng` fields
- Check coordinates are within `imageBounds`
- Inspect browser console for Leaflet errors

**Tooltips not positioning correctly:**
- Ensure `markerRefs` is populated via LMarker `@ready` event storing `marker._icon`
- Check that element reference isn't being invalidated by Vue reactivity
- Verify Nuxt UI's floating-ui can access the reference element
- Never use template `:ref` on elements inside v-for - causes Vue to recreate DOM

**Scaling animation broken:**
- Must use manual `classList.add/remove` instead of reactive `:class` binding
- Reactive bindings cause Vue to recreate DOM elements, breaking `markerElement` reference
- Access dot element via `.firstChild.firstChild` from container element
- Ensure container reference is stable (stored once in `@ready`, not recreated)

### Refactoring Guidelines

When modifying the component:

1. **Keep sections clearly separated** - Use comment dividers for organization
2. **Use constants for simple data** - `imageBounds` is a direct array constant, `AUTO_HOVER_*` inline in `scheduleAutoHover`
3. **Use manual DOM manipulation for class changes** - Prevents Vue reactivity from breaking element references
4. **Centralize selection logic** - Use `selectVillage(index)` and `deselectVillage()` for consistency
5. **Capture elements via events, not template refs** - LMarker `@ready` for stable references, never `:ref` in v-for
6. **Single timer pattern** - Use recursive `setTimeout`, not `setInterval` + `setTimeout` combination
7. **Start auto-hover on map ready** - Use LMap `@ready` event, not `onMounted` (SSR compatibility)
8. **Test auto-hover edge cases** - Hovering during auto-hover, rapid hovers, page navigation
