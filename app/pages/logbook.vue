<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const title = 'Logbook'
const description = 'Flight logbook for Susi Air pilots'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <div class="placeholder-page">
    <div class="placeholder-card">
      <p class="eyebrow">
        Logbook
      </p>
      <h1>Logbook view is coming soon</h1>
      <p>
        The full flight history experience will be added in the next iteration.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.placeholder-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem 6rem;
  background: $susi-bg;
}

.placeholder-card {
  width: min(100%, 32rem);
  background: $white;
  border: 1px solid $border-light;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 35px rgba(14, 33, 56, 0.06);

  h1 {
    margin: 0.25rem 0 0.5rem;
    color: $susi-navy;
  }

  p {
    margin: 0;
    color: $text-secondary;
    line-height: 1.6;
  }
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 700;
  color: $susi-red;
}
</style>
