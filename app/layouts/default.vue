<script setup lang="ts">
const route = useRoute()
const isActive = (path: string) => route.path === path

const navItemClass = 'flex flex-col items-center gap-1 p-2 rounded-[12px] text-nav-icon no-underline transition-all duration-300 ease-[ease] [@media(hover:hover)]:hover:text-susi-red-light md:w-full md:mb-4'
const navIconClass = 'w-[22px] h-[22px]'
const navLabelClass = 'text-[10px] uppercase font-semibold'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-susi-bg md:flex-row">
    <main class="flex-1 w-full pb-20 md:pb-0 md:pl-20">
      <slot />
    </main>
    <nav class="fixed bottom-0 left-0 right-0 bg-susi-navy flex justify-around p-2 pb-[env(safe-area-inset-bottom)] border-t border-white/10 z-50 md:top-0 md:right-auto md:bottom-auto md:w-20 md:h-screen md:flex-col md:justify-start md:py-8 md:px-0 md:border-t-0 md:border-r">
      <NuxtLink
        to="/dashboard"
        :class="navItemClass"
        active-class="text-white!"
      >
        <svg
          :class="navIconClass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span
          :class="[navLabelClass, { 'font-bold': isActive('/dashboard') }]"
        >Home</span>
      </NuxtLink>

      <NuxtLink
        to="/schedule"
        :class="navItemClass"
        active-class="text-white!"
      >
        <svg
          :class="navIconClass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span
          :class="[navLabelClass, { 'font-bold': isActive('/schedule') }]"
        >Schedule</span>
      </NuxtLink>

      <NuxtLink
        to="/logbook"
        :class="navItemClass"
        active-class="text-white!"
      >
        <svg
          :class="navIconClass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span
          :class="[navLabelClass, { 'font-bold': isActive('/logbook') }]"
        >Logbook</span>
      </NuxtLink>

      <NuxtLink
        to="/more"
        :class="navItemClass"
        active-class="text-white!"
      >
        <svg
          :class="navIconClass"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
        <span
          :class="[navLabelClass, { 'font-bold': isActive('/more') }]"
        >More</span>
      </NuxtLink>
    </nav>
  </div>
</template>
