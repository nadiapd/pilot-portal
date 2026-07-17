<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions, ScriptableLineSegmentContext } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const props = defineProps<{
  labels: string[]
  values: number[]
  limit: number
  max: number
  todayIndex: number
}>()

const susiNavy = '#0E2138'
const susiRed = '#E63757'
const chartAccent = '#22C5E8'

const isOverLimit = (context: ScriptableLineSegmentContext) => {
  const p0 = props.values[context.p0DataIndex] ?? 0
  const p1 = props.values[context.p1DataIndex] ?? 0
  return (p0 >= props.limit || p1 >= props.limit) ? susiRed : undefined
}

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Limit',
      data: props.labels.map(() => props.limit),
      borderColor: susiRed,
      borderDash: [5, 5],
      borderWidth: 1.5,
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: false,
      tension: 0
    },
    {
      label: 'Rolling hours',
      data: props.values,
      borderColor: chartAccent,
      backgroundColor: `${chartAccent}14`,
      borderWidth: 2.5,
      fill: 'origin',
      tension: 0.35,
      pointBackgroundColor: props.values.map((_, index) => (index === props.todayIndex ? susiRed : susiNavy)),
      pointBorderColor: '#FFFFFF',
      pointBorderWidth: 1.5,
      pointRadius: props.values.map((_, index) => (index === props.todayIndex ? 5 : 2.5)),
      pointHoverRadius: props.values.map((_, index) => (index === props.todayIndex ? 6 : 4)),
      segment: {
        borderColor: isOverLimit
      }
    }
  ]
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: susiNavy,
      padding: 10,
      cornerRadius: 8,
      titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
      bodyFont: { family: 'Plus Jakarta Sans' },
      filter: item => item.datasetIndex === 1,
      callbacks: {
        label: item => `${(item.raw as number).toFixed(1)} hrs`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 5,
        font: { family: 'Plus Jakarta Sans', size: 10 },
        color: '#6B7280'
      }
    },
    y: {
      min: 0,
      max: props.max,
      grid: { color: 'rgba(14, 33, 56, 0.06)' },
      border: { display: false },
      ticks: {
        maxTicksLimit: 4,
        font: { family: 'Plus Jakarta Sans', size: 10 },
        color: '#6B7280'
      }
    }
  }
}))
</script>

<template>
  <div class="relative h-55 w-full">
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
