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
    class="relative inline-flex items-center justify-center gap-2 rounded-3xl border-none py-3.5 px-7 font-sans text-sm font-bold cursor-pointer transition-[background-color,opacity] duration-200 ease-[ease] disabled:opacity-60 disabled:cursor-not-allowed active:enabled:scale-[0.98]"
    :class="[
      variant === 'primary'
        ? 'bg-susi-red text-white hover:enabled:bg-susi-red-dark'
        : 'bg-susi-bg text-susi-navy border border-border-light hover:enabled:bg-susi-bg-dark',
      { 'w-full': block }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
