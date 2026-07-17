<script setup lang="ts">
withDefaults(defineProps<{
  code: string
  color: string
  label?: string
  variant?: 'soft' | 'solid' | 'circle'
}>(), {
  label: undefined,
  variant: 'soft'
})
</script>

<template>
  <span
    class="inline-flex items-center max-w-full py-[0.18rem] px-2 rounded-3xl text-[0.6rem] font-bold tracking-[0.02em] whitespace-nowrap overflow-hidden text-ellipsis"
    :class="{
      'text-white': variant === 'solid',
      'justify-center text-white w-8 h-8 p-0 rounded-full text-[0.5rem] shrink-0': variant === 'circle'
    }"
    :style="variant === 'soft'
      ? { color, backgroundColor: `${color}1F` }
      : { backgroundColor: color }"
  >{{ variant === 'circle' ? code : (label || code) }}</span>
</template>
