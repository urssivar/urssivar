<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import * as d3 from "d3";
import kits from "@/data/dna.json";

const svgRef = ref<SVGSVGElement | null>(null);

const chartData = computed(() => {
  const haplogroupCounts = new Map<string, number>();
  const subcladeMap = new Map<string, { count: number; parent: string }>();

  kits.forEach((kit) => {
    const hg = kit.haplogroup;
    const sc = kit.subclade || kit.haplogroup;

    haplogroupCounts.set(hg, (haplogroupCounts.get(hg) || 0) + 1);

    if (!subcladeMap.has(sc)) {
      subcladeMap.set(sc, { count: 0, parent: hg });
    }
    subcladeMap.get(sc)!.count++;
  });

  const haplogroups = Array.from(haplogroupCounts.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const subclades = Array.from(subcladeMap.entries())
    .map(([label, data]) => ({ label, ...data }))
    .sort((a, b) => {
      if (a.parent !== b.parent) return a.parent.localeCompare(b.parent);
      return a.label.localeCompare(b.label);
    });

  return {
    haplogroups: haplogroups.map(([hg, count]) => ({
      label: hg,
      count,
    })),
    subclades: subclades.map((sc) => ({
      label: sc.label,
      count: sc.count,
      parent: sc.parent,
    })),
  };
});

const getLabelPosition = (d: any, innerRadius: number, outerRadius: number) => {
  const angle = (d.startAngle + d.endAngle) / 2;
  const x = Math.cos(angle - Math.PI / 2) * ((innerRadius + outerRadius) / 2);
  const y = Math.sin(angle - Math.PI / 2) * ((innerRadius + outerRadius) / 2);
  return `translate(${x},${y})`;
};

onMounted(() => {
  if (!svgRef.value) return;

  const container = svgRef.value;
  const width = container.clientWidth || 400;
  const height = container.clientHeight || width;
  const radius = Math.min(width, height) / 2 - Math.min(width, height) * 0.05;

  const svg = d3
    .select(svgRef.value)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  svg.selectAll("*").remove();

  const g = svg.append("g");

  const subcladeData = chartData.value.subclades;

  const innerRadius = radius * 0.5;
  const outerRadius = radius * 1;

  const subcladeArc = d3
    .arc<any>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const subcladePie = d3
    .pie<any>()
    .value((d) => d.count)
    .sort(null);

  const subcladeArcs = g
    .append("g")
    .selectAll("g")
    .data(subcladePie(subcladeData))
    .enter()
    .append("g");

  subcladeArcs
    .append("path")
    .attr("class", (d: any) => `dna-slice hh-${d.data.parent}`)
    .attr("d", subcladeArc as any);

  // Subclade labels
  subcladeArcs
    .append("text")
    .attr(
      "class",
      (d: any) => `dna-label dna-label-subclade hh-${d.data.parent}`
    )
    .attr("transform", (d: any) =>
      getLabelPosition(d, innerRadius, outerRadius)
    )
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .each(function (d: any) {
      const text = d3.select(this);
      text.append("tspan").attr("x", 0).attr("y", 0).text(d.data.label);
      text.append("tspan").attr("x", 0).attr("dy", "1.2em").text(d.data.count);
    });

  // Outer ring (haplogroups)
  const haplogroupData = chartData.value.haplogroups;
  const haplogroupTotal = haplogroupData.reduce((sum, d) => sum + d.count, 0);

  const hapOuterRadius = radius * 0.05;
  const hapInnerRadius = radius * 0.5;

  const hapArc = d3
    .arc<any>()
    .innerRadius(hapInnerRadius)
    .outerRadius(hapOuterRadius);

  const hapPie = d3
    .pie<any>()
    .value((d) => d.count)
    .sort(null);

  const hapArcs = g
    .append("g")
    .selectAll("g")
    .data(hapPie(haplogroupData))
    .enter()
    .append("g");

  hapArcs
    .append("path")
    .attr("class", (d: any) => `dna-slice hh-${d.data.label}`)
    .attr("d", hapArc as any);

  // Haplogroup labels
  hapArcs
    .append("text")
    .attr(
      "class",
      (d: any) => `dna-label dna-label-haplogroup hh-${d.data.label}`
    )
    .attr("transform", (d: any) =>
      getLabelPosition(d, hapInnerRadius, hapOuterRadius)
    )
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .each(function (d: any) {
      const pct = ((d.data.count / haplogroupTotal) * 100).toFixed(1);
      const text = d3.select(this);
      text.append("tspan").attr("x", 0).attr("y", 0).text(d.data.label);
      text.append("tspan").attr("x", 0).attr("dy", "1.2em").text(`${pct}%`);
    });
});
</script>

<template>
  <svg ref="svgRef" class="mx-auto h-64 sm:h-96 aspect-square"></svg>
</template>

<style>
@reference "../theme/style.css";

.dna-slice {
  @apply stroke-4 stroke-(--ui-bg) fill-(--ui-bg-accented)/75 transition duration-200;

  &.hh-R1b {
    @apply hover:fill-amber-200/75 dark:hover:fill-(--color-amber-800)/75;
  }

  &.hh-J1 {
    @apply hover:fill-sky-200/75 dark:hover:fill-(--color-sky-800)/75;
  }

  &.hh-Q2 {
    @apply hover:fill-emerald-200/75 dark:hover:fill-(--color-emerald-800)/75;
  }
}

.dna-label {
  @apply font-bold pointer-events-none;

  &.hh-R1b {
    @apply fill-(--color-amber-600) dark:fill-(--color-amber-400);
  }

  &.hh-J1 {
    @apply fill-(--color-sky-600) dark:fill-(--color-sky-400);
  }

  &.hh-Q2 {
    @apply fill-(--color-emerald-600) dark:fill-(--color-emerald-400);
  }
}

.dna-label-subclade {
  @apply text-xs;
}

.dna-label-haplogroup {
  @apply text-sm;
}
</style>
