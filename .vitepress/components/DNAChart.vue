<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import * as d3 from "d3";
import { useDNAData } from "@/composables/useDNAData";

const { haplogroupMap } = useDNAData();
const svgRef = ref<SVGSVGElement>();

const chartData = computed(() => {
  return {
    name: "root",
    children: Array.from(
      haplogroupMap.value.entries(),
      ([label, subclades]) => ({
        name: label,
        children: Array.from(subclades.entries(), ([name, value]) => ({
          name,
          value,
        })).sort((a, b) => a.name.localeCompare(b.name)),
      })
    ).sort((a, b) => a.name.localeCompare(b.name)),
  };
});

function getHaplogroup(d: any): string {
  return d.depth === 1 ? d.data.name : d.parent?.data.name || "";
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

  // Create hierarchy and partition layout
  const root = d3
    .hierarchy(chartData.value)
    .sum((d: any) => d.value || 0)
    .sort((a, b) => (b.value || 0) - (a.value || 0));

  const partition = d3.partition<any>().size([2 * Math.PI, R]);
  partition(root);

  const arc = d3
    .arc<any>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .innerRadius((d) => (d.depth === 1 ? 0.05 : 0.5) * R)
    .outerRadius((d) => (d.depth === 1 ? 0.5 : 1) * R);

  const g = svg.append("g");

  // Draw all arcs first
  g.selectAll("path")
    .data(root.descendants().filter((d) => d.depth > 0))
    .enter()
    .append("path")
    .attr("class", (d: any) => `dna-slice hh-${getHaplogroup(d)}`)
    .attr("d", arc);

  // Draw all labels after
  const total = root.value || 1;
  g.selectAll("text")
    .data(root.descendants().filter((d) => d.depth > 0))
    .enter()
    .append("text")
    .attr(
      "class",
      (d: any) =>
        `dna-label ${
          d.depth === 1 ? "dna-label-haplogroup" : "dna-label-subclade"
        } hh-${getHaplogroup(d)}`
    )
    .attr("transform", (d: any) => {
      const a = (d.x0 + d.x1) / 2;
      const r = ((d.depth === 1 ? 0.05 + 0.5 : 0.5 + 1) * R) / 2;
      const x = Math.cos(a - Math.PI / 2) * r;
      const y = Math.sin(a - Math.PI / 2) * r;
      return `translate(${x},${y})`;
    })
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .each(function (d: any) {
      const title = d3.select(this);
      title.append("tspan").attr("x", 0).attr("y", 0).text(d.data.name);

      let subtitle = "";
      if (d.depth === 1) {
        const pct = ((d.value / total) * 100).toFixed(1);
        subtitle = `${pct}%`;
      } else {
        subtitle = d.value;
      }
      title.append("tspan").attr("x", 0).attr("dy", "1.2em").text(subtitle);
    });
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
