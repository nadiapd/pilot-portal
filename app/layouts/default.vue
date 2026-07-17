<template>
  <div class="app-layout">
    <main class="main-content">
      <slot />
    </main>
    <nav class="nav-container">
      <NuxtLink
        to="/dashboard"
        class="nav-item"
        active-class="nav-item--active"
      >
        <svg
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
        <span>Home</span>
      </NuxtLink>

      <NuxtLink
        to="/schedule"
        class="nav-item"
        active-class="nav-item--active"
      >
        <svg
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
        <span>Schedule</span>
      </NuxtLink>

      <NuxtLink
        to="/logbook"
        class="nav-item"
        active-class="nav-item--active"
      >
        <svg
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
        <span>Logbook</span>
      </NuxtLink>

      <NuxtLink
        to="/more"
        class="nav-item"
        active-class="nav-item--active"
      >
        <svg
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
        <span>More</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F5F6F8;
}

.main-content {
  flex: 1;
  width: 100%;
  padding-bottom: 80px;
}

.nav-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0E2138;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 50;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: 12px;
  color: lighten(#809cd0, 15%);
  text-decoration: none;
  transition: all 0.3s ease;

  svg { width: 22px; height: 22px; }
  span { font-size: 10px; text-transform: uppercase; font-weight: 600; }

  &--active {
    color: #ffffff !important;

    span {
      font-weight: 700;
    }
  }

  @media (hover: hover) {
    &:hover:not(.nav-item--active) {
      color: lighten($susi-red, 25%);
    }
  }
}

@media (min-width: 768px) {
  .app-layout { flex-direction: row; }
  .main-content { padding-bottom: 0; padding-left: 80px; }

  .nav-container {
    top: 0;
    right: auto;
    width: 80px;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem 0;
    border-top: none;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-item {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
