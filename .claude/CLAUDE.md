## Village Map Component

The VillageMap component (`/app/components/VillageMap.vue`) displays Kaitag villages as interactive markers over a topographic map backdrop using Leaflet.

### Architecture

**Technology stack:**
- **@vue-leaflet/vue-leaflet**: Vue 3 wrapper for Leaflet maps
- **Leaflet**: Interactive map rendering
- **Custom divIcon markers**: Red dots with hover scaling
- **Custom tooltips**: IBM Plex Mono styled tooltips with village names

**Key features:**
- Village data: `/app/data/villages.json` (lat/lng coordinates in EPSG:4326)
- Auto-hover: Random village tooltip opens every 2.5s for 1.8s
- Manual hover: Tooltips show on mouse hover, resets auto-hover timer
- Marker animation: Dots scale to 1.5x on hover with 200ms transition
- Responsive: Map bleeds full-width, auto-fits to village bounds

### Code Structure

The component is organized into clearly-sectioned blocks:

1. **CONSTANTS**: Configuration values that may need adjustment:
   - `MAP_EXPORT_BOUNDS`: QGIS export bounds (update when changing map)
   - `AUTO_HOVER`: Animation timing (DURATION: 1800ms, INTERVAL: 2500ms)

2. **MAP CONFIGURATION**: Computed properties for Leaflet setup:
   - `villageBounds`: Min/max lat/lng from village data
   - `imageBounds`: Map image bounds from `MAP_EXPORT_BOUNDS`
   - `mapCenter`: Center point for initial map view
   - `mapOptions`: Disables all user interactions (zoom, pan, etc.)

3. **CUSTOM MARKER ICON**: Leaflet `divIcon` with Tailwind-styled red dot HTML

4. **AUTO-HOVER STATE**: Manages automatic tooltip display:
   - Direct Leaflet API access via `mapRef.value.leafletObject._layers`
   - Tracks currently open tooltip to close it when resetting
   - Resets timer on manual hover interaction

### Updating the Map Backdrop

When exporting a new map from QGIS:

**1. Export settings:**
- CRS: EPSG:4326 (WGS 84)
- Format: PNG (recommended) with antialiasing enabled
- Bounds: 47.2754° to 48.2753° lng, 41.8747° to 42.2207° lat
- Export at 2-3x resolution for retina displays (e.g., 3000-3500px width)

**2. Update the component:**
- Save new map image to `/public/map.png`
- Update `MAP_EXPORT_BOUNDS` constant with exact bounds from QGIS export
- Leaflet will handle positioning automatically

**Why PNG over SVG:**
- No rendering artifacts
- Smaller file size for complex contour maps
- Better browser performance
- Consistent appearance across browsers

### Styling Configuration

**Markers:**
- Red dots (`bg-red-600`) with white/dark borders
- 12px icon size, centered anchor point
- Scale to 1.5x on hover with 200ms ease-out transition

**Tooltips:**
- Font: IBM Plex Mono bold (via `lang="xdq"` attribute)
- Colors: Gray-50/gray-900 backgrounds, gray-200/gray-800 borders
- No rounded corners (`border-radius: 0`)
- Positioned above marker with 8px offset
- Opacity transition (150ms) on show/hide

**Map backdrop:**
- Inverted for dark mode with `brightness(0.8)` for softer appearance
- Transparent background on Leaflet container

### Auto-Hover Implementation

The auto-hover system works by:

1. Accessing Leaflet's internal layer registry via `mapRef.value.leafletObject._layers`
2. Iterating through layers to find markers (check for `layer.getTooltip`)
3. Calling `layer.openTooltip()` and `layer.closeTooltip()` directly
4. Tracking the current auto-hovered layer to force close on reset
5. Resetting the entire cycle when user manually hovers a marker

This approach bypasses Vue reactivity for tooltip state, using Leaflet's native API instead.

### Troubleshooting

**Map not displaying:**
- Verify `MAP_EXPORT_BOUNDS` matches QGIS export bounds exactly
- Check `/public/map.png` exists
- Ensure Leaflet CSS is imported

**Villages not appearing:**
- Verify villages.json is valid JSON with `name`, `lat`, `lng` fields
- Check coordinates are within `MAP_EXPORT_BOUNDS`
- Inspect browser console for Leaflet errors

**Auto-hover not working:**
- Check `mapRef` is properly bound to `LMap` component
- Verify `mapRef.value?.leafletObject` is available after mount
- Ensure markers have tooltips attached

**Tooltips frozen/not closing:**
- Auto-hover tracks `currentAutoHoverLayer` - verify it's being reset
- Manual hover should call `resetAutoHover()` to clear timers
- Check `closeCurrentAutoHoverTooltip()` is called on cleanup

### Refactoring Guidelines

When modifying the component:

1. **Keep sections clearly separated** - Use the comment dividers for organization
2. **Extract magic numbers** - Add new configuration to CONSTANTS section
3. **Don't rely on Vue reactivity for tooltips** - Use Leaflet API directly (`openTooltip`/`closeTooltip`)
4. **Clean up timers** - Always clear intervals/timeouts in `onBeforeUnmount`
5. **Test auto-hover edge cases** - Hovering during auto-hover, rapid hovers, page navigation
