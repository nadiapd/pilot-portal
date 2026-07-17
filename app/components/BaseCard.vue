<script setup lang="ts">
withDefaults(defineProps<{
  padding?: 'sm' | 'md' | 'lg'
  raised?: boolean
  interactive?: boolean
}>(), {
  padding: 'md',
  raised: false,
  interactive: false
})
</script>

<template>
  <div
    class="base-card"
    :class="[`base-card--padding-${padding}`, { 'base-card--raised': raised, 'base-card--interactive': interactive }]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  background-color: $susi-card;
  border: 1px solid $border-light;
  border-radius: $radius-card-lg;
  box-shadow: $shadow-card;

  &--padding-sm { padding: 0.75rem; }
  &--padding-md { padding: 1rem; }
  &--padding-lg { padding: 1.5rem; }

  &--raised {
    box-shadow: $shadow-card-raised;
  }

  &--interactive {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      box-shadow: $shadow-card-raised;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
