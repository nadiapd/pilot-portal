<script setup lang="ts">
withDefaults(defineProps<{
  status: 'success' | 'warning' | 'danger'
  label: string
}>(), {})
</script>

<template>
  <span
    class="inline-flex items-center py-1 px-2.5 rounded-xl text-xs font-bold tracking-[0.03em] whitespace-nowrap"
    :class="{
      'text-susi-success bg-susi-success/12': status === 'success',
      'text-susi-warning-dark bg-susi-warning/14': status === 'warning',
      'text-susi-red bg-susi-red/10': status === 'danger'
    }"
  >{{ label }}</span>
</template>
