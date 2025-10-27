<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import * as d3 from "d3";
import kits from "@/data/dna.json";

const svgRef = ref<SVGSVGElement>();

const data = computed(() => {
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

function drawRingPaths(
  g: any,
  data: any[],
  innerRadius: number,
  outerRadius: number
) {
  const arc = d3.arc<any>().innerRadius(innerRadius).outerRadius(outerRadius);

  const pie = d3
    .pie<any>()
    .value((d) => d.count)
    .sort(null);

  g.append("g")
    .selectAll("g")
    .data(pie(data))
    .enter()
    .append("g")
    .append("path")
    .attr("class", (d: any) => `dna-slice hh-${d.data.parent || d.data.label}`)
    .attr("d", arc as any);
}

function drawRingLabels(
  g: any,
  data: any[],
  innerRadius: number,
  outerRadius: number,
  labelClass: string,
  getLabelText: (d: any) => [string, string]
) {
  const pie = d3
    .pie<any>()
    .value((d) => d.count)
    .sort(null);

  g.selectAll(`text.${labelClass}`)
    .data(pie(data))
    .enter()
    .append("text")
    .attr(
      "class",
      (d: any) => `dna-label ${labelClass} hh-${d.data.parent || d.data.label}`
    )
    .attr("transform", (d: any) => {
      const a = (d.startAngle + d.endAngle) / 2;
      const x = Math.cos(a - Math.PI / 2) * ((innerRadius + outerRadius) / 2);
      const y = Math.sin(a - Math.PI / 2) * ((innerRadius + outerRadius) / 2);
      return `translate(${x},${y})`;
    })
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .each(function (d: any) {
      const [line1, line2] = getLabelText(d);
      const text = d3.select(this);
      text.append("tspan").attr("x", 0).attr("y", 0).text(line1);
      text.append("tspan").attr("x", 0).attr("dy", "1.2em").text(line2);
    });
}

onMounted(() => {
  const container = svgRef.value;
  if (!container) return;

  const A = Math.min(container.clientHeight, container.clientWidth);

  const svg = d3
    .select(container)
    .attr("width", A)
    .attr("height", A)
    .attr("viewBox", [-A / 2, -A / 2, A, A]);

  svg.selectAll("*").remove();

  const R = A / 2;
  const hgInnerR = R * 0.05;
  const hgOuterR = R * 0.5;
  const scInnerR = R * 0.5;
  const scOuterR = R * 1;

  const g = svg.append("g");
  drawRingPaths(g, data.value.subclades, scInnerR, scOuterR);
  drawRingPaths(g, data.value.haplogroups, hgInnerR, hgOuterR);

  drawRingLabels(
    g,
    data.value.subclades,
    scInnerR,
    scOuterR,
    "dna-label-subclade",
    (d: any) => [d.data.label, String(d.data.count)]
  );

  const hgTotal = data.value.haplogroups.reduce((sum, d) => sum + d.count, 0);
  drawRingLabels(
    g,
    data.value.haplogroups,
    hgInnerR,
    hgOuterR,
    "dna-label-haplogroup",
    (d: any) => {
      const pct = ((d.data.count / hgTotal) * 100).toFixed(1);
      return [d.data.label, `${pct}%`];
    }
  );
});
</script>

<template>
  <svg
    ref="svgRef"
    class="mx-auto h-64 sm:h-96 aspect-square overflow-visible"
  ></svg>
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
