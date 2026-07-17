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
    class="duty-pill"
    :class="`duty-pill--${variant}`"
    :style="variant === 'soft'
      ? { color, backgroundColor: `${color}1F` }
      : { backgroundColor: color }"
  >{{ variant === 'circle' ? code : (label || code) }}</span>
</template>

<style lang="scss" scoped>
.duty-pill {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 0.18rem 0.5rem;
  border-radius: $radius-pill;
  font-size: 0.6rem;
  font-weight: $fw-bold;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &--solid {
    color: $susi-card;
  }

  &--circle {
    justify-content: center;
    color: $susi-card;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border-radius: 50%;
    font-size: 0.5rem;
    flex-shrink: 0;
  }
}
</style>
