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

### Map Backdrop Alignment

To update the QGIS map backdrop:

**Export settings:**
- CRS: EPSG:4326 (WGS 84)
- Format: PNG (recommended) with antialiasing enabled
- Bounds: 47.2754° to 48.2753° lng, 41.8747° to 42.2207° lat
- Export at 2-3x resolution for retina displays (e.g., 3000-3500px width)

**Current configuration:**
- File: `/public/map2.png`
- Backdrop params: `x="-100.18" y="-26.04" width="300.3" height="103.9"`

**Formula for calculating backdrop positioning:**

Given:
- Village bounds: `minLng, maxLng, minLat, maxLat` (from villages.json)
- Map export bounds: `mapMinLng, mapMaxLng, mapMinLat, mapMaxLat` (from QGIS)
- Component coordinate system: larger dimension (lng or lat range) = 100 units

Calculate:
```javascript
const villageMinLng = 47.60871727;
const villageMaxLng = 47.94193536;
const villageMinLat = 41.96142179;
const villageMaxLat = 42.13407166;

const lngRange = villageMaxLng - villageMinLng; // 0.333°
const latRange = villageMaxLat - villageMinLat; // 0.173°
const scale = Math.max(lngRange, latRange); // 0.333°

// Map dimensions in SVG units
const width = (mapMaxLng - mapMinLng) / scale * 100;
const height = (mapMaxLat - mapMinLat) / scale * 100;

// Position offsets
const x = -((villageMinLng - mapMinLng) / scale * 100);
const y = -((mapMaxLat - villageMaxLat) / scale * 100);
```

**Why PNG over SVG:**
- No rendering artifacts
- Smaller file size for complex contour maps
- Better browser performance
- Consistent appearance across browsers

### Styling Notes

- Village dots: Link colors (#0066cc light, #7eb3ff dark) with white/dark stroke
- Map backdrop: Inverted for dark mode with `brightness(0.8)` for softer appearance
- Tooltip: Positioned above village on hover
- Auto-hover animation: 1.8s display, 2.5s interval
