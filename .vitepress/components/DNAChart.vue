<script setup lang="ts">
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js';
import kits from '@/data/dna.json';

ChartJS.register(ArcElement, Tooltip, Legend);

const haplogroupCounts = computed(() => {
  const counts = new Map<string, number>();

  kits.forEach(kit => {
    const hg = kit.haplogroup;
    counts.set(hg, (counts.get(hg) || 0) + 1);
  });

  return counts;
});

// Prepare chart data
const chartData = computed(() => {
  const labels = Array.from(haplogroupCounts.value.keys());
  const data = Array.from(haplogroupCounts.value.values());

  // Monochrome color palette with subtle variations
  const colors = [
    'rgb(59, 130, 246)',   // blue-500 (primary)
    'rgb(100, 116, 139)',  // gray-500
    'rgb(148, 163, 184)',  // gray-400
    'rgb(203, 213, 225)',  // gray-300
    'rgb(226, 232, 240)',  // gray-200
  ];

  return {
    labels,
    datasets: [{
      data,
      backgroundColor: colors.slice(0, labels.length),
      borderColor: 'rgb(255, 255, 255)',
      borderWidth: 2,
    }]
  };
});

// Chart options
const chartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 16,
        font: {
          family: 'Inter, sans-serif',
          size: 14,
        },
        color: 'rgb(100, 116, 139)', // text-muted equivalent
        usePointStyle: true,
        pointStyle: 'circle',
      }
    },
    tooltip: {
      backgroundColor: 'rgb(255, 255, 255)',
      titleColor: 'rgb(15, 23, 42)', // text-highlighted
      bodyColor: 'rgb(100, 116, 139)', // text-muted
      borderColor: 'rgb(226, 232, 240)',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        label: function (context) {
          const label = context.label || '';
          const value = context.parsed;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        }
      }
    }
  }
};
</script>

<template>
  <Pie class="h-64 mx-auto" :data="chartData" :options="chartOptions" />
</template>
