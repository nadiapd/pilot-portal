<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

const title = 'More'
const description = 'Additional tools and settings for Susi Air pilots'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center pt-8 px-4 pb-24 bg-susi-bg">
    <div class="w-[min(100%,32rem)] bg-white border border-border-light rounded-2xl p-8 shadow-[0_10px_35px_rgba(14,33,56,0.06)]">
      <p class="m-0 uppercase tracking-[0.12em] text-xs font-bold text-text-secondary leading-[1.6]">
        More
      </p>
      <h1 class="mt-1 mb-2 text-[1.75rem] font-bold text-susi-navy">
        Additional tools will appear here
      </h1>
      <p class="m-0 text-text-secondary leading-[1.6]">
        This section is reserved for settings, support, and profile actions.
      </p>
    </div>
  </div>
</template>
