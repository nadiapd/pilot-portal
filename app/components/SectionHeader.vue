<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-3 mb-3 px-1">
    <div class="flex flex-col gap-[0.2rem] min-w-0">
      <h2 class="m-0 text-[0.95rem] font-bold text-susi-navy">
        {{ title }}
      </h2>
      <p
        v-if="subtitle"
        class="m-0 text-xs text-text-secondary"
      >
        {{ subtitle }}
      </p>
    </div>
    <slot name="action" />
  </div>
</template>
