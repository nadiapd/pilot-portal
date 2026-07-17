<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit'
  disabled?: boolean
  block?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  block: true
})
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="[`base-button--${variant}`, { 'base-button--block': block }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use "sass:color";
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: $radius-pill;
  padding: 0.875rem 1.75rem;
  font-family: $font-family-base;
  font-size: $fs-body-sm;
  font-weight: $fw-bold;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;

  &--block {
    width: 100%;
  }

  &--primary {
    background-color: $susi-red;
    color: $susi-card;

    &:hover:not(:disabled) {
      background-color: darken($susi-red, 10%);
    }
  }

  &--secondary {
    background-color: $susi-bg;
    color: $susi-navy;
    border: 1px solid $border-light;

    &:hover:not(:disabled) {
      background-color: darken(#F5F6F8, 3%);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
}
</style>
