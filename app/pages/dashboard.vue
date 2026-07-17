<script setup lang="ts">
const title = 'Dashboard'
const description = 'Pilot\'s personal dashboard for managing flights and documents'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const pilotStore = usePilotStore()
const documentStore = useDocumentStore()

const selectedChartToggle = ref('1w')
const chartToggles = ['1w', '1m', '3m', '6m', '1y']

const fallbackFlight = {
  date: '31',
  monthYear: 'MAY 2026',
  time: '14:00 LT',
  origin: 'WIHH',
  originCity: 'Jakarta',
  destination: 'WICN',
  destinationCity: 'Pangandaran'
}

const defaultNewsImage = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=480&q=60&auto=format&fit=crop'

const fallbackNews = [
  {
    title: 'Fleet Update',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=480&q=60&auto=format&fit=crop',
    isNew: true,
    timeAgo: '5 days ago'
  },
  {
    title: 'Weather Advisory Update',
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=480&q=60&auto=format&fit=crop',
    isNew: false,
    timeAgo: '1 week ago'
  },
  {
    title: 'Company Update',
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=480&q=60&auto=format&fit=crop',
    isNew: false,
    timeAgo: '2 weeks ago'
  }
]

const pilotProfile = computed(() => ({
  ...pilotStore.pilot,
  rank: pilotStore.pilot.rank || 'Captain',
  avatar: pilotStore.pilot.avatar || 'https://api.dicebear.com/8.x/avataaars/svg?seed=Doe'
}))
const upcomingFlight = computed(() => pilotStore.upcomingFlight || fallbackFlight)
const newsItems = fallbackNews
const hoursToLimit = computed(() => pilotStore.hoursToLimit)
const documents = computed(() => documentStore.processedDocuments.slice(0, 4))
const notificationCount = computed(() => pilotStore.notifications || 3)
const chartData = computed(() => pilotStore.getChartData(selectedChartToggle.value))
</script>

<template>
  <div class="dashboard-page">
    <header class="topbar">
      <img
        src="https://susiair.com/images/susiair-logo.png"
        alt="Susi Air"
        class="topbar-logo"
      >
      <button
        type="button"
        class="btn-notification"
        aria-label="Notifications"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span
          v-if="notificationCount > 0"
          class="notification-badge"
        >{{ notificationCount }}</span>
      </button>
    </header>

    <main class="dashboard-content">
      <section class="welcome-section">
        <div class="pilot-info">
          <div class="pilot-avatar">
            <img
              :src="pilotProfile.avatar"
              :alt="`${pilotProfile.name} avatar`"
            >
          </div>
          <div class="pilot-details">
            <p class="pilot-greeting">
              Welcome back,
            </p>
            <h1 class="pilot-name">
              {{ pilotProfile.name }}
              <span class="pilot-rank">{{ pilotProfile.rank }}</span>
            </h1>
          </div>
        </div>

        <base-card
          padding="md"
          class="hours-card"
        >
          <div class="hours-card__text">
            <p class="stats-label">
              Total Flight Hours
            </p>
            <p class="stats-value">
              {{ pilotStore.formattedTotalHours.hours }}<span class="stats-decimals">.{{ pilotStore.formattedTotalHours.minutes }}</span>
              <span class="stats-unit">hrs</span>
            </p>
          </div>
          <NuxtLink
            to="/logbook"
            class="hours-card__action"
            aria-label="View logbook"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </NuxtLink>
        </base-card>
      </section>

      <div class="dashboard-grid">
        <div class="grid-col-main">
          <section class="content-section">
            <section-header title="Upcoming Flight">
              <template #action>
                <a
                  href="#"
                  class="view-all"
                >View all</a>
              </template>
            </section-header>

            <base-card
              padding="lg"
              class="flight-card"
            >
              <div class="flight-date-box">
                <span class="date-number">{{ upcomingFlight.date }}</span>
                <span class="date-month">{{ upcomingFlight.monthYear }}</span>
              </div>

              <div class="flight-route">
                <p class="flight-time">
                  {{ upcomingFlight.time }}
                </p>
                <div class="route-details">
                  <div class="route-point text-left">
                    <span class="airport-code">{{ upcomingFlight.origin }}</span>
                    <!-- <span class="city-name">{{ upcomingFlight.originCity }}</span> -->
                  </div>

                  <div class="route-divider">
                    <div class="dashed-line" />
                    <icons-plane class="plane-icon" />
                  </div>

                  <div class="route-point text-right">
                    <span class="airport-code">{{ upcomingFlight.destination }}</span>
                    <!-- <span class="city-name">{{ upcomingFlight.destinationCity }}</span> -->
                  </div>
                </div>
                <div class="route-details">
                  <span class="city-name">{{ upcomingFlight.originCity }}</span>
                  <span class="city-name">{{ upcomingFlight.destinationCity }}</span>
                </div>
              </div>
            </base-card>
          </section>

          <section class="content-section">
            <section-header title="Latest News">
              <template #action>
                <a
                  href="#"
                  class="view-all"
                >See all</a>
              </template>
            </section-header>

            <div class="news-list">
              <base-card
                v-for="item in newsItems"
                :key="item.title"
                padding="sm"
                class="news-card"
              >
                <div class="news-card__image-wrap">
                  <img
                    :src="item.image || defaultNewsImage"
                    :alt="item.title"
                    class="news-card__image"
                  >
                  <span
                    v-if="item.isNew"
                    class="news-card__new-badge"
                  >New</span>
                </div>
                <div class="news-card__body">
                  <h3>{{ item.title }}</h3>
                  <p class="news-card__time">
                    {{ item.timeAgo }}
                  </p>
                </div>
              </base-card>
            </div>
          </section>

          <section class="content-section">
            <section-header
              title="Flight Hours Trend"
              subtitle="Rolling sums for the selected window"
            >
              <template #action>
                <span class="unit-label">Unit: Hours</span>
              </template>
            </section-header>

            <base-card
              padding="lg"
              class="chart-card"
            >
              <div class="chart-canvas">
                <hours-trend-chart
                  :labels="chartData.labels"
                  :values="chartData.values"
                  :limit="chartData.limit"
                  :max="chartData.max"
                  :today-index="chartData.todayIndex"
                />
                <div class="chart-meta">
                  <span class="chart-limit-label">Limit {{ chartData.limit.toFixed(0) }} hrs</span>
                  <span class="chart-range-label">{{ chartData.labels[0] }} – {{ chartData.labels[chartData.labels.length - 1] }}</span>
                </div>
              </div>

              <div class="chart-toggles">
                <button
                  v-for="toggle in chartToggles"
                  :key="toggle"
                  class="toggle-btn"
                  :class="{ 'toggle-btn--active': selectedChartToggle === toggle }"
                  @click="selectedChartToggle = toggle"
                >
                  {{ toggle }}
                </button>
              </div>

              <div class="chart-note">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg>
                <p>Each point shows the <strong>rolling sum</strong> of flight hours based on the selected time window.</p>
              </div>
            </base-card>
          </section>
        </div>

        <div class="grid-col-sidebar">
          <section class="content-section">
            <section-header
              title="Hours to Limit"
              subtitle="Current usage against the regulatory cap"
            >
              <template #action>
                <a
                  href="#"
                  class="view-all"
                >View details</a>
              </template>
            </section-header>

            <div class="limits-grid">
              <base-card
                v-for="limit in hoursToLimit"
                :key="limit.label"
                padding="md"
                class="limit-card"
              >
                <div class="limit-card__header">
                  <div class="limit-info">
                    <span class="limit-label">{{ limit.label }}</span>
                    <span class="limit-max">{{ limit.limit }} limit</span>
                  </div>
                  <div
                    class="limit-icon"
                    :class="`tone-${limit.tone}-bg`"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      :class="`tone-${limit.tone}`"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div class="limit-card__body">
                  <p class="flown-hours">
                    {{ limit.flown }} <span class="flown-label">flown</span>
                  </p>
                  <div class="progress-track">
                    <div
                      class="progress-bar"
                      :class="`tone-${limit.tone}-bg`"
                      :style="{ width: `${limit.progressWidth}%` }"
                    />
                  </div>
                  <p
                    class="remaining-text"
                    :class="`tone-${limit.tone}`"
                  >
                    {{ limit.remaining }} · {{ limit.remainingPercent }}
                  </p>
                </div>
              </base-card>
            </div>
          </section>

          <section class="content-section">
            <section-header
              title="My Documents"
              subtitle="Expiry status for operational paperwork"
            >
              <template #action>
                <a
                  href="#"
                  class="view-all"
                >View all</a>
              </template>
            </section-header>

            <base-card
              padding="sm"
              class="documents-card"
            >
              <div
                v-for="doc in documents"
                :key="doc.id"
                class="document-item"
              >
                <div class="document-info">
                  <div class="document-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div class="document-text">
                    <p class="document-title">
                      {{ doc.label }}
                    </p>
                    <p class="document-expiry">
                      Expires {{ doc.expiryLabel }}
                    </p>
                  </div>
                </div>
                <status-badge
                  :status="doc.status"
                  :label="doc.badge"
                />
              </div>
            </base-card>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
.dashboard-page {
  min-height: 100vh;
  background-color: $susi-bg;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background-color: $susi-card;
  border-bottom: 1px solid $border-light;

  @media (min-width: $bp-lg) {
    padding: 1.25rem 3rem;
  }
}

.topbar-logo {
  height: 1.5rem;
  width: auto;

  @media (min-width: $bp-lg) {
    height: 1.75rem;
  }
}

.btn-notification {
  position: relative;
  background: $susi-bg;
  border: 1px solid $border-light;
  padding: 0.6rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: $border-light;
  }

  svg {
    width: 1.35rem;
    height: 1.35rem;
    color: $susi-navy;
  }

  .notification-badge {
    position: absolute;
    top: -0.2rem;
    right: -0.2rem;
    min-width: 1.1rem;
    height: 1.1rem;
    padding: 0 0.25rem;
    background-color: $susi-red;
    color: $white;
    border: 2px solid $susi-card;
    border-radius: 999px;
    font-size: 0.6rem;
    font-weight: 700;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.dashboard-content {
  padding: 1.25rem;

  @media (min-width: $bp-lg) {
    padding: 2rem 3rem 3rem;
  }
}

.welcome-section {
  max-width: 1200px;
  margin: 0 auto 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: $bp-lg) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2rem;
  }
}

.pilot-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pilot-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: 2px solid $border-light;
  background-color: #D1D5DB;
  overflow: hidden;
  flex-shrink: 0;

  @media (min-width: $bp-lg) {
    width: 4rem;
    height: 4rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.pilot-details {
  .pilot-greeting {
    font-size: $fs-label-lg;
    color: $text-secondary;
    margin: 0;
  }

  .pilot-name {
    font-size: $fs-headline-md;
    font-weight: $fw-bold;
    color: $susi-navy;
    margin: 0.2rem 0 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pilot-rank {
    font-size: 0.5625rem;
    text-transform: uppercase;
    font-weight: 700;
    background-color: $susi-red;
    color: $white;
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
}

.hours-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (min-width: $bp-lg) {
    min-width: 20rem;
  }

  &__text {
    .stats-label {
      font-size: $fs-label-sm;
      font-weight: 600;
      color: $text-secondary;
      margin: 0 0 0.2rem;
    }

    .stats-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: $susi-navy;
      margin: 0;
      line-height: 1;
    }

    .stats-decimals {
      font-size: 1rem;
      font-weight: 400;
      color: $text-secondary;
    }

    .stats-unit {
      font-size: 0.75rem;
      font-weight: 500;
      color: $text-secondary;
      margin-left: 0.25rem;
    }
  }

  &__action {
    flex-shrink: 0;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background-color: $susi-navy;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: lighten(#0E2138, 8%);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}

.dashboard-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: $bp-lg) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2rem;
  }
}

.grid-col-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: $bp-lg) {
    grid-column: span 8;
    gap: 2rem;
  }
}

.grid-col-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: $bp-lg) {
    grid-column: span 4;
    gap: 2rem;
  }
}

.content-section {
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0 0.25rem;

  h2 {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0;

    @media (min-width: $bp-lg) {
      font-size: 1rem;
    }
  }

  .view-all {
    font-size: 0.75rem;
    font-weight: 600;
    color: $susi-red;
    text-decoration: none;

    @media (min-width: $bp-lg) {
      font-size: 0.875rem;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  .unit-label {
    font-size: 0.75rem;
    color: $text-secondary;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
}

.flight-card {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }

  @media (min-width: $bp-lg) {
    padding: 1.5rem;
    gap: 2rem;
  }
}

.flight-date-box {
  background-color: $susi-bg;
  border: 1px solid $border-light;
  border-radius: 0.75rem;
  padding: 0.75rem;
  text-align: center;
  min-width: 4rem;

  @media (min-width: $bp-lg) {
    min-width: 5rem;
    padding: 1rem;
  }

  .date-number {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;

    @media (min-width: $bp-lg) {
      font-size: 2rem;
    }
  }

  .date-month {
    display: block;
    font-size: 0.625rem;
    font-weight: 700;
    color: $text-secondary;
    margin-top: 0.25rem;
    letter-spacing: 0.1em;
  }
}

.flight-route {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .flight-time {
    font-size: 0.625rem;
    font-weight: 700;
    color: $text-secondary;
    text-align: center;
    margin: 0 0 0.5rem 0;
  }
}

.route-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .route-point {
    display: flex;
    flex-direction: column;

    &.text-left { text-align: left; }
    &.text-right { text-align: right; }

    .airport-code {
      font-size: 1.5rem;
      font-weight: 700;

      @media (min-width: $bp-lg) {
        font-size: 2.25rem;
      }
    }

    .city-name {
      font-size: 0.625rem;
      color: $text-secondary;

      @media (min-width: $bp-lg) {
        font-size: 0.75rem;
      }
    }
  }

  .route-divider {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 1rem;

    .dashed-line {
      width: 100%;
      border-top: 2px dashed #E5E7EB;
    }

    .plane-icon {
      position: absolute;
      top: -0.630rem;
      width: 1.5rem;
      height: 1.5rem;
      color: $susi-red;
      background-color: $white;
      padding: 0 0.25rem;
      rotate: 90deg;
    }
  }
}

.chart-canvas {
  background-color: $susi-bg;
  border-radius: $radius-card-sm;
  border: 1px solid $border-light;
  padding: 0.75rem;
}

.chart-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.625rem;
  color: $text-secondary;
}

.chart-limit-label {
  color: $susi-red;
  font-weight: 700;
}

.chart-toggles {
  display: flex;
  background-color: $susi-bg;
  padding: 0.25rem;
  border-radius: $radius-pill;
  margin-top: 1rem;
  border: 1px solid $border-light;

  .toggle-btn {
    flex: 1;
    background: none;
    border: none;
    padding: 0.375rem 0;
    border-radius: $radius-pill;
    font-size: $fs-label-sm;
    font-weight: $fw-bold;
    color: $text-secondary;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #E5E7EB;
    }

    &--active {
      background-color: $susi-navy;
      color: $white;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);

      &:hover {
        background-color: $susi-navy;
      }
    }
  }
}

.chart-note {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background-color: rgba($susi-chart-accent, 0.08);
  padding: 0.75rem;
  border-radius: $radius-card-sm;
  border: 1px solid rgba($susi-chart-accent, 0.25);
  margin-top: 1rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: darken($susi-chart-accent, 20%);
    flex-shrink: 0;
  }

  p {
    font-size: 0.625rem;
    color: darken($susi-chart-accent, 35%);
    line-height: 1.4;
    margin: 0;

    @media (min-width: $bp-lg) {
      font-size: 0.75rem;
    }
  }
}

.limits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: $bp-lg) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.limit-card {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  .limit-info {
    display: flex;
    flex-direction: column;
  }

  .limit-label {
    font-size: 0.625rem;
    font-weight: 700;
    color: $text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .limit-max {
    font-size: 0.75rem;
    color: $text-secondary;
    margin-top: 0.125rem;
  }

  .limit-icon {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  .flown-hours {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;

    @media (min-width: $bp-lg) {
      font-size: 1.5rem;
    }
  }

  .flown-label {
    font-size: 0.625rem;
    font-weight: 400;
    color: $text-secondary;
  }

  .progress-track {
    width: 100%;
    height: 0.375rem;
    background-color: #F3F4F6;
    border-radius: 999px;
    margin-top: 0.75rem;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    border-radius: 999px;
  }

  .remaining-text {
    font-size: 0.5625rem;
    font-weight: 700;
    margin: 0.375rem 0 0 0;

    @media (min-width: $bp-lg) {
      font-size: 0.625rem;
    }
  }
}

.tone-success { color: $susi-success; }
.tone-warning { color: darken($susi-warning, 15%); }
.tone-danger { color: $susi-red; }

.progress-bar.tone-success-bg { background-color: $susi-success; }
.progress-bar.tone-warning-bg { background-color: $susi-warning; }
.progress-bar.tone-danger-bg { background-color: $susi-red; }

.limit-icon.tone-success-bg { background-color: rgba($susi-success, 0.12); }
.limit-icon.tone-warning-bg { background-color: rgba($susi-warning, 0.14); }
.limit-icon.tone-danger-bg { background-color: rgba($susi-red, 0.1); }

.news-list {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: thin;
}

.news-card {
  min-width: 12.5rem;
  max-width: 12.5rem;
  flex-shrink: 0;
  padding: 0;
  overflow: hidden;

  &__image-wrap {
    position: relative;
  }

  &__image {
    display: block;
    width: 100%;
    height: 6.5rem;
    object-fit: cover;
  }

  &__new-badge {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background-color: $susi-red;
    color: $white;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.15rem 0.5rem;
    border-radius: $radius-card-sm;
  }

  &__body {
    padding: 0.75rem;
  }

  &__time {
    font-size: $fs-label-sm;
    color: $text-secondary;
    margin: 0.25rem 0 0;
  }

  h3 {
    font-size: 0.8125rem;
    font-weight: $fw-bold;
    color: $susi-navy;
    margin: 0;
    line-height: 1.3;
  }
}

.documents-card {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.document-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid $border-light;

  &:last-child {
    border-bottom: none;
  }
}

.document-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.document-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: $susi-bg;
  border: 1px solid $border-light;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1rem;
    height: 1rem;
    color: $text-secondary;
  }
}

.document-text {
  .document-title {
    font-size: 0.875rem;
    font-weight: 700;
    margin: 0;
  }

  .document-expiry {
    font-size: 0.625rem;
    color: $text-secondary;
    margin: 0.125rem 0 0 0;
  }
}
</style>
