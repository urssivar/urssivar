<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import * as d3 from 'd3';
import kits from '@/data/dna.json';

const svgRef = ref<SVGSVGElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

const colors = {
  R1b: '#2563eb',  // blue-600
  J1: '#0d9488',   // teal-600
  Q2: '#7c3aed',    // violet-600
} as Record<string, string>;

const chartData = computed(() => {
  const haplogroupCounts = new Map<string, number>();
  const subcladeMap = new Map<string, { count: number; parent: string }>();

  kits.forEach(kit => {
    const hg = kit.haplogroup;
    const sc = kit.subclade || kit.haplogroup;

    haplogroupCounts.set(hg, (haplogroupCounts.get(hg) || 0) + 1);

    if (!subcladeMap.has(sc)) {
      subcladeMap.set(sc, { count: 0, parent: hg });
    }
    subcladeMap.get(sc)!.count++;
  });

  const haplogroups = Array.from(haplogroupCounts.entries())
    .sort((a, b) => a[0].localeCompare(b[0]));

  const subclades = Array.from(subcladeMap.entries())
    .map(([label, data]) => ({ label, ...data }))
    .sort((a, b) => {
      if (a.parent !== b.parent) return a.parent.localeCompare(b.parent);
      return a.label.localeCompare(b.label);
    });

  return {
    haplogroups: haplogroups.map(([hg, count]) => ({ label: hg, count, color: colors[hg] })),
    subclades: subclades.map(sc => ({ label: sc.label, count: sc.count, color: colors[sc.parent] }))
  };
});

onMounted(() => {
  if (!svgRef.value || !containerRef.value) return;

  const container = containerRef.value;
  const width = container.clientWidth || 400;
  const height = Math.max(container.clientHeight || 320, 320);
  const radius = Math.min(width, height) / 2 - 20;

  const svg = d3.select(svgRef.value)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height]);

  // Clear previous content
  svg.selectAll('*').remove();

  // Create main group for the chart
  const g = svg.append('g').attr('class', 'dna-chart-g');

  // Inner ring (subclades)
  const subcladeData = chartData.value.subclades;
  const subcladeTotal = subcladeData.reduce((sum, d) => sum + d.count, 0);

  const innerRadius = radius * 0.55;
  const outerRadius = radius * 1;

  const subcladeArc = d3.arc<any>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const subcladePie = d3.pie<any>()
    .value(d => d.count)
    .sort(null);

  const subcladeArcs = g.append('g')
    .selectAll('g')
    .data(subcladePie(subcladeData))
    .enter()
    .append('g');

  subcladeArcs.append('path')
    .attr('class', 'dna-slice')
    .attr('d', subcladeArc as any)
    .attr('fill', (d: any) => d.data.color)
    .attr('stroke', '#000')
    .attr('stroke-width', 1.5);

  // Subclade labels
  subcladeArcs.append('text')
    .attr('class', 'dna-label')
    .attr('transform', (d: any) => {
      const angle = (d.startAngle + d.endAngle) / 2;
      const x = Math.cos(angle - Math.PI / 2) * ((innerRadius + outerRadius) / 2);
      const y = Math.sin(angle - Math.PI / 2) * ((innerRadius + outerRadius) / 2);
      return `translate(${x},${y})`;
    })
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', '#fff')
    .style('font-family', 'Inter, sans-serif')
    .style('font-size', '12px')
    .style('font-weight', '600')
    .style('pointer-events', 'none')
    .each(function(d: any) {
      const text = d3.select(this);
      text.append('tspan')
        .attr('x', 0)
        .attr('y', 0)
        .text(d.data.label);
      text.append('tspan')
        .attr('x', 0)
        .attr('dy', '1.2em')
        .text(d.data.count);
    });

  // Outer ring (haplogroups)
  const haplogroupData = chartData.value.haplogroups;
  const haplogroupTotal = haplogroupData.reduce((sum, d) => sum + d.count, 0);

  const hapOuterRadius = radius * 0.05;
  const hapInnerRadius = radius * 0.5;

  const hapArc = d3.arc<any>()
    .innerRadius(hapInnerRadius)
    .outerRadius(hapOuterRadius);

  const hapPie = d3.pie<any>()
    .value(d => d.count)
    .sort(null);

  const hapArcs = g.append('g')
    .selectAll('g')
    .data(hapPie(haplogroupData))
    .enter()
    .append('g');

  hapArcs.append('path')
    .attr('class', 'dna-slice')
    .attr('d', hapArc as any)
    .attr('fill', (d: any) => d.data.color)
    .attr('stroke', '#000')
    .attr('stroke-width', 1.5);

  // Haplogroup labels
  hapArcs.append('text')
    .attr('class', 'dna-label')
    .attr('transform', (d: any) => {
      const angle = (d.startAngle + d.endAngle) / 2;
      const x = Math.cos(angle - Math.PI / 2) * ((hapInnerRadius + hapOuterRadius) / 2);
      const y = Math.sin(angle - Math.PI / 2) * ((hapInnerRadius + hapOuterRadius) / 2);
      return `translate(${x},${y})`;
    })
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('fill', '#fff')
    .style('font-family', 'Inter, sans-serif')
    .style('font-size', '12px')
    .style('font-weight', '600')
    .style('pointer-events', 'none')
    .each(function(d: any) {
      const pct = ((d.data.count / haplogroupTotal) * 100).toFixed(1);
      const text = d3.select(this);
      text.append('tspan')
        .attr('x', 0)
        .attr('y', 0)
        .text(d.data.label);
      text.append('tspan')
        .attr('x', 0)
        .attr('dy', '1.2em')
        .text(`${pct}%`);
    });
});
</script>

<template>
  <div ref="containerRef" class="w-full flex justify-center" style="height: 320px">
    <svg ref="svgRef" class="max-w-full"></svg>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  display: flex;
  justify-content: center;
}

svg {
  max-width: 100%;
  height: auto;
  display: block;
}

:deep(.dna-chart-g) {
  /* Main chart group */
}

:deep(.dna-slice) {
  cursor: pointer;
  transition: all 0.25s ease;
  stroke-linejoin: round;
}

:deep(.dna-slice:hover) {
  filter: brightness(1.1);
  stroke-width: 2;
}

:deep(.dna-slice:active) {
  filter: brightness(0.95);
}

:deep(.dna-label) {
  user-select: none;
  pointer-events: none;
  /* Typography is set inline in the component for full control */
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

/* Ensure proper text rendering */
:deep(text) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :deep(.dna-slice) {
    stroke: #1a1a1a;
  }
}
</style>
