<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="section-header">
    <div class="section-header__copy">
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <slot name="action" />
  </div>
</template>

<style lang="scss" scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0 0.25rem;
}

.section-header__copy {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;

  h2 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: $susi-navy;
  }

  p {
    margin: 0;
    font-size: 0.75rem;
    color: $text-secondary;
  }
}
</style>
