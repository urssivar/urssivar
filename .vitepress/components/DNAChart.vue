<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import kits from '@/data/dna.json';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

const colorFamilies = {
  R1b: {
    base: 'rgb(59 130 246)',
    shades: ['rgb(96 165 250)', 'rgb(147 197 253)', 'rgb(191 219 254)']
  },
  J1: {
    base: 'rgb(71 85 105)',
    shades: ['rgb(100 116 139)', 'rgb(148 163 184)', 'rgb(203 213 225)']
  },
  Q: {
    base: 'rgb(139 92 246)',
    shades: ['rgb(167 139 250)', 'rgb(196 181 253)', 'rgb(221 214 254)']
  }
};

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

  const haplogroupColors = haplogroups.map(([hg]) =>
    colorFamilies[hg as keyof typeof colorFamilies]?.base || colorFamilies.R1b.base
  );

  const subcladeColors = subclades.map((sc, i) => {
    const family = colorFamilies[sc.parent as keyof typeof colorFamilies] || colorFamilies.R1b;
    const siblingIndex = subclades.filter(s => s.parent === sc.parent).indexOf(sc);
    return family.shades[siblingIndex % family.shades.length];
  });

  return {
    datasets: [
      {
        label: 'Subclades',
        data: subclades.map(sc => sc.count),
        backgroundColor: subcladeColors,
        weight: 1.5
      },
      {
        label: 'Haplogroups',
        data: haplogroups.map(([_, count]) => count),
        backgroundColor: haplogroupColors,
      }
    ],
    haplogroups: haplogroups.map(([hg]) => hg),
    subclades: subclades.map(sc => sc.label)
  };
});

const chartOptions: any = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '10%',
  plugins: {
    legend: { display: false },
    datalabels: {
      color: 'white',
      font: { family: 'Inter', size: 12, weight: 500 },
      formatter: (value: number, ctx: any) => {
        if (ctx.datasetIndex === 0) {
          return chartData.value.subclades[ctx.dataIndex];
        } else {
          return chartData.value.haplogroups[ctx.dataIndex];
        }
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const pct = ((ctx.parsed / total) * 100).toFixed(1);
          const label = ctx.datasetIndex === 0
            ? chartData.value.subclades[ctx.dataIndex]
            : chartData.value.haplogroups[ctx.dataIndex];
          return `${label}: ${ctx.parsed} (${pct}%)`;
        }
      }
    }
  }
};
</script>

<template>
  <Doughnut class="h-72 mx-auto" :data="chartData" :options="chartOptions" />
</template>
