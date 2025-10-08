## Village Map Component

The VillageMap component (`/app/components/VillageMap.vue`) displays Kaitag villages as interactive markers over a topographic map backdrop using Leaflet.

### Architecture

**Technology stack:**
- **@vue-leaflet/vue-leaflet**: Vue 3 wrapper for Leaflet maps
- **Leaflet**: Interactive map rendering
- **Template-based LIcon markers**: Red dots with hover scaling via Tailwind classes
- **Nuxt UI tooltips**: Consistent tooltips with IBM Plex Mono font (via `lang="xdq"`)

**Key features:**
- Village data: `/app/data/villages.json` (lat/lng coordinates in EPSG:4326)
- Auto-hover: Random village tooltip opens every 2.5s for 1.8s
- Manual hover: Tooltips show on mouse hover, resets auto-hover timer
- Marker animation: Dots scale to 1.5x on hover with CSS transitions
- Responsive: Map bleeds full-width, auto-fits to village bounds

### Code Structure

The component is organized into clearly-sectioned blocks:

1. **MAP CONFIGURATION**: Core setup and computed properties:
   - `villageBounds`: Min/max lat/lng from village data
   - `MAP_EXPORT_BOUNDS`: QGIS export bounds (inline in `imageBounds`)
   - `imageBounds`: Map image bounds computed from export bounds
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

**1. Export settings:**
- CRS: EPSG:4326 (WGS 84)
- Format: PNG (recommended) with antialiasing enabled
- Bounds: 47.2754° to 48.2753° lng, 41.8747° to 42.2207° lat
- Export at 2-3x resolution for retina displays (e.g., 3000-3500px width)

**2. Update the component:**
- Save new map image to `/public/map.png`
- Update `MAP_EXPORT_BOUNDS` inline object in `imageBounds` computed with exact bounds from QGIS export
- Leaflet will handle positioning automatically

**Why PNG over SVG:**
- No rendering artifacts
- Smaller file size for complex contour maps
- Better browser performance
- Consistent appearance across browsers

### Styling Configuration

**Markers:**
- Red dots (`bg-rose-600`) with white/dark borders (Tailwind classes)
- 12px size (w-3 h-3), centered in parent via flexbox
- Scale to 1.5x on hover with `transition-all ease-out` (200ms)
- Scaling applied via `classList.add('scale-150')` for both manual and auto-hover

**Tooltips:**
- Font: IBM Plex Mono bold (via `lang="xdq"` attribute on content)
- Styling: Native Nuxt UI theme (gray-50/gray-900 backgrounds)
- Arrow enabled
- Positioned above marker (`side: 'top'`)

**Map backdrop:**
- `brightness-[0.8]` for dimming in light mode
- `dark:invert` for color inversion in dark mode (also inherits brightness)
- Transparent background on Leaflet container (via `@apply` in `:deep()`)

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
- Verify `MAP_EXPORT_BOUNDS` in `imageBounds` computed matches QGIS export bounds exactly
- Check `/public/map.png` exists
- Ensure Leaflet CSS is imported

**Villages not appearing:**
- Verify villages.json is valid JSON with `name`, `lat`, `lng` fields
- Check coordinates are within `MAP_EXPORT_BOUNDS`
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
2. **Inline constants where used once** - `MAP_EXPORT_BOUNDS` in `imageBounds`, `AUTO_HOVER_*` in `scheduleAutoHover`
3. **Use manual DOM manipulation for class changes** - Prevents Vue reactivity from breaking element references
4. **Centralize selection logic** - Use `selectVillage(index)` and `deselectVillage()` for consistency
5. **Capture elements via events, not template refs** - LMarker `@ready` for stable references, never `:ref` in v-for
6. **Single timer pattern** - Use recursive `setTimeout`, not `setInterval` + `setTimeout` combination
7. **Test auto-hover edge cases** - Hovering during auto-hover, rapid hovers, page navigation
