<script setup lang="ts">
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import kits from '@/data/dna.json';

const colors = <Record<string, string>>{
  R1b: '#2563eb',  // blue-600
  J1: '#0d9488',   // teal-600
  Q: '#7c3aed',    // violet-600
};

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

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
    datasets: [
      {
        label: 'Subclades',
        data: subclades.map(sc => sc.count),
        backgroundColor: subclades.map((sc) =>
          colors[sc.parent]
        ),
        borderColor: '#000',
        weight: 1.5,
      },
      {
        label: 'Haplogroups',
        data: haplogroups.map(([_, count]) => count),
        backgroundColor: haplogroups.map(([hg]) =>
          colors[hg]
        ),
        borderColor: '#000',
      }
    ],
    haplogroups: haplogroups.map(([hg]) => hg),
    subclades: subclades.map(sc => sc.label)
  };
});

const chartOptions: any = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: '5%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    datalabels: {
      color: '#fff',
      font: { family: 'Inter', size: 12, weight: 700 },
      formatter: (value: number, ctx: any) => {
        if (ctx.datasetIndex === 0) {
          const label = chartData.value.subclades[ctx.dataIndex];
          return `${label} · ${value}`;
        } else {
          const label = chartData.value.haplogroups[ctx.dataIndex];
          const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const pct = ((value / total) * 100).toFixed(1);
          return `${label} · ${pct}%`;
        }
      },
    }
  }
};
</script>

<template>
  <Doughnut class="my-16 h-72 sm:h-96 mx-auto" :data="chartData" :options="chartOptions" />
</template>
