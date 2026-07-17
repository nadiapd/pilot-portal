<script setup lang="ts">
const props = withDefaults(defineProps<{
  padding?: 'sm' | 'md' | 'lg' | 'none'
  raised?: boolean
  interactive?: boolean
}>(), {
  padding: 'md',
  raised: false,
  interactive: false
})

const paddingClass = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  none: ''
} as const

const paddingClasses = computed(() => paddingClass[props.padding])
</script>

<template>
  <div
    class="bg-white border border-border-light rounded-2xl"
    :class="[
      paddingClasses,
      raised ? 'shadow-card-raised' : 'shadow-card',
      { 'cursor-pointer transition-[transform,box-shadow] duration-200 ease-[ease] hover:shadow-card-raised active:scale-[0.98]': interactive }
    ]"
  >
    <slot />
  </div>
</template>
