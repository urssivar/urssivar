## Color System

- `primary: 'blue'` and `neutral: 'gray'` in `app.config.ts`
- Use semantic tokens (`primary-600`, `neutral-900`)
- Fonts auto-loaded from `@theme` variables in `main.css`

### Image Inversions

- **Stamp**: Original white → `invert-[88%]` light / `invert-[12%]` dark
- **Map**: Original dark → `invert-[12%]` light / `invert-[88%]` dark

## VillageMap Component

### Tooltip Integration

**Why manual control needed:**
- Leaflet blocks pointer events on markers
- Solution: Use `@mouseover`/`@mouseout` to control `v-model:open`
- Capture marker containers via `@ready` event, not template refs
- Use `classList.add/remove` for scaling (reactive `:class` breaks tooltip positioning)

### Updating Map Backdrop

1. Export from QGIS: EPSG:4326, bounds 47.2754-48.2753 lng, 41.8747-42.2207 lat
2. Update `imageBounds` constant: `[[minLat, minLng], [maxLat, maxLng]]`
