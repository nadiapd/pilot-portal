<script setup lang="ts">
withDefaults(defineProps<{
  status: 'success' | 'warning' | 'danger'
  label: string
}>(), {})
</script>

<template>
  <span
    class="status-badge"
    :class="`status-badge--${status}`"
  >{{ label }}</span>
</template>

<style lang="scss" scoped>
@use "sass:color";
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: $radius-card-sm;
  font-size: $fs-label-sm;
  font-weight: $fw-bold;
  letter-spacing: 0.03em;
  white-space: nowrap;

  &--success {
    color: $susi-success;
    background-color: rgba($susi-success, 0.12);
  }

  &--warning {
    color: darken($susi-warning, 15%);
    background-color: rgba($susi-warning, 0.14);
  }

  &--danger {
    color: $susi-red;
    background-color: rgba($susi-red, 0.1);
  }
}
</style>
