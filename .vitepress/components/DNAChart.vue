<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import * as d3 from "d3";
import { useDNAData } from "@/composables/dna";

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
  <div class="my-8">
    <svg
      ref="svgRef"
      class="mx-auto h-60 sm:h-80 aspect-square overflow-visible"
    ></svg>
  </div>
</template>

<style>
@reference "@/theme/styles/index.css";

.dna-slice {
  @apply stroke-4 stroke-(--ui-bg-elevated) transition-colors duration-200;

  &.hh-R1b {
    @apply fill-amber-300/60 dark:fill-amber-800/60;

    &:hover {
      @apply fill-amber-300/90 dark:fill-amber-800/90;
    }
  }

  &.hh-J1 {
    @apply fill-sky-300/60 dark:fill-sky-800/60;

    &:hover {
      @apply fill-sky-300/90 dark:fill-sky-800/90;
    }
  }

  &.hh-Q2 {
    @apply fill-emerald-300/60 dark:fill-emerald-800/60;

    &:hover {
      @apply fill-emerald-300/90 dark:fill-emerald-800/90;
    }
  }
}

.dna-label {
  @apply font-bold pointer-events-none text-shadow-xs;

  &.hh-R1b {
    @apply fill-amber-700 dark:fill-amber-400;
  }

  &.hh-J1 {
    @apply fill-sky-700 dark:fill-sky-400;
  }

  &.hh-Q2 {
    @apply fill-emerald-700 dark:fill-emerald-400;
  }
}

.dna-label-subclade {
  @apply text-xs;
}

.dna-label-haplogroup {
  @apply text-sm;
}
</style>
