## Village Map Component

The VillageMap component (`/app/components/VillageMap.vue`) displays Kaitag villages as interactive dots over a topographic map backdrop.

### Architecture

**Two-layer design:**
1. **Backdrop layer**: Full-width QGIS topographic map (bleeds edge-to-edge)
2. **Markers layer**: Village dots constrained to 65ch reading column

**Key features:**
- Village data: `/app/data/villages.json` (lat/lng coordinates)
- Coordinate system: Converts lat/lng to SVG coordinate space (larger dimension = 100 units)
- Auto-hover: Random village highlights every 2.5s
- Manual hover: Mouse interaction with tooltips
- Responsive: Map bleeds full-width, villages stay centered

### Code Structure

The component is organized into clearly-sectioned blocks:

1. **TYPES**: TypeScript interfaces (`Village`, `VillageMarker`, `MapDimensions`)
2. **CONSTANTS**: Configuration values that may need adjustment:
   - `MAP_EXPORT_BOUNDS`: QGIS export bounds (update when changing map)
   - `AUTO_HOVER`: Animation timing (DURATION, INTERVAL)
   - `VIEWBOX_PADDING`: SVG coordinate space padding
3. **COORDINATE SYSTEM**: Computed properties for coordinate transformations:
   - `mapDimensions`: Village bounds and scale calculation
   - `backdropPosition`: Calculates map image positioning (replaces hardcoded values)
   - `villageMarkers`: Converts lat/lng to SVG coordinates
4. **HOVER & TOOLTIP STATE**: Reactive state and positioning logic
5. **AUTO-HOVER ANIMATION**: Interval-based random village highlighting
6. **INTERACTION HANDLERS**: Mouse event handlers

### Updating the Map Backdrop

When exporting a new map from QGIS:

**1. Export settings:**
- CRS: EPSG:4326 (WGS 84)
- Format: PNG (recommended) with antialiasing enabled
- Bounds: 47.2754° to 48.2753° lng, 41.8747° to 42.2207° lat
- Export at 2-3x resolution for retina displays (e.g., 3000-3500px width)

**2. Update the component:**
- Save new map image to `/public/map.png` (or change href in template)
- Update `MAP_EXPORT_BOUNDS` constant with the exact bounds used in QGIS export
- The backdrop will automatically position itself via `backdropPosition` computed property

**3. How backdrop positioning works:**

The component automatically calculates backdrop position using this formula:
```javascript
// From MAP_EXPORT_BOUNDS constant
const { minLng: mapMinLng, maxLng: mapMaxLng,
        minLat: mapMinLat, maxLat: mapMaxLat } = MAP_EXPORT_BOUNDS;

// From village data (calculated dynamically)
const { minLng, maxLat, scale } = mapDimensions.value;

// SVG dimensions and position
const width = ((mapMaxLng - mapMinLng) / scale) * 100;
const height = ((mapMaxLat - mapMinLat) / scale) * 100;
const x = -((minLng - mapMinLng) / scale) * 100;
const y = -((mapMaxLat - maxLat) / scale) * 100;
```

**Why PNG over SVG:**
- No rendering artifacts
- Smaller file size for complex contour maps
- Better browser performance
- Consistent appearance across browsers

### Styling Configuration

- Village dots: Link colors (#0066cc light, #7eb3ff dark) with white/dark stroke
- Map backdrop: Inverted for dark mode with `brightness(0.8)` for softer appearance
- Tooltip: Positioned above village on hover
- Auto-hover animation: 1.8s display, 2.5s interval (configurable via `AUTO_HOVER` constant)

### Troubleshooting

**Map alignment issues:**
- Verify `MAP_EXPORT_BOUNDS` exactly matches QGIS export bounds
- Check that villages.json coordinates are within map bounds
- Inspect `backdropPosition` computed value in Vue DevTools

**Villages not appearing:**
- Verify villages.json is valid JSON with `name`, `lat`, `lng` fields
- Check browser console for errors
- Ensure coordinate ranges aren't zero (handled by fallback in `mapDimensions`)

**Tooltip positioning issues:**
- Ensure template refs (`markersContainer`, `markersSvg`) are properly bound
- Check that SVG has valid CTM (coordinate transformation matrix)
- Verify container has non-zero dimensions

### Refactoring Guidelines

When modifying the component:

1. **Keep sections clearly separated** - Use the comment dividers for organization
2. **Extract magic numbers** - Add new configuration to CONSTANTS section
3. **Maintain coordinate calculation clarity** - Keep formulas in COORDINATE SYSTEM section with JSDoc
4. **Preserve two-layer architecture** - Backdrop and markers must remain separate for responsive design
5. **Test with edge cases** - Empty villages.json, single village, extreme coordinate ranges
