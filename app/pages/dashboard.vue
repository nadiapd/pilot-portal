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

const toneTextClass: Record<string, string> = {
  success: 'text-susi-success',
  warning: 'text-susi-warning-dark',
  danger: 'text-susi-red'
}
const toneBarBgClass: Record<string, string> = {
  success: 'bg-susi-success',
  warning: 'bg-susi-warning',
  danger: 'bg-susi-red'
}
const toneIconBgClass: Record<string, string> = {
  success: 'bg-susi-success/12',
  warning: 'bg-susi-warning/14',
  danger: 'bg-susi-red/10'
}
</script>

<template>
  <div class="min-h-screen bg-susi-bg">
    <header class="sticky top-0 z-30 flex items-center justify-between py-4 px-5 bg-white border-b border-border-light lg:py-5 lg:px-12">
      <img
        src="https://susiair.com/images/susiair-logo.png"
        alt="Susi Air"
        class="h-6 w-auto lg:h-7"
      >
      <button
        type="button"
        class="relative bg-susi-bg border border-border-light p-[0.6rem] rounded-full cursor-pointer transition-colors duration-200 ease-[ease] flex items-center justify-center hover:bg-border-light"
        aria-label="Notifications"
      >
        <svg
          class="w-[1.35rem] h-[1.35rem] text-susi-navy"
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
          class="absolute -top-[0.2rem] -right-[0.2rem] min-w-[1.1rem] h-[1.1rem] px-1 bg-susi-red text-white border-2 border-white rounded-full text-[0.6rem] font-bold leading-none flex items-center justify-center"
        >{{ notificationCount }}</span>
      </button>
    </header>

    <main class="p-5 lg:pt-8 lg:px-12 lg:pb-12">
      <section class="max-w-300 mx-auto mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:mb-8">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full border-2 border-border-light bg-[#D1D5DB] overflow-hidden shrink-0 lg:w-16 lg:h-16">
            <img
              :src="pilotProfile.avatar"
              :alt="`${pilotProfile.name} avatar`"
              class="w-full h-full object-cover"
            >
          </div>
          <div>
            <p class="text-label-lg text-text-secondary m-0">
              Welcome back,
            </p>
            <h1 class="text-xl font-bold text-susi-navy mt-[0.2rem] flex items-center flex-wrap gap-2">
              {{ pilotProfile.name }}
              <span class="text-[0.5625rem] uppercase font-bold bg-susi-red text-white py-0.5 px-2 rounded-sm tracking-wider">{{ pilotProfile.rank }}</span>
            </h1>
          </div>
        </div>

        <base-card
          padding="md"
          class="flex items-center justify-between gap-4 lg:min-w-80"
        >
          <div>
            <p class="text-xs font-semibold text-text-secondary mb-[0.2rem]">
              Total Flight Hours
            </p>
            <p class="text-2xl font-bold text-susi-navy m-0 leading-none">
              {{ pilotStore.formattedTotalHours.hours }}<span class="text-base font-normal text-text-secondary">.{{ pilotStore.formattedTotalHours.minutes }}</span>
              <span class="text-xs font-medium text-text-secondary ml-1">hrs</span>
            </p>
          </div>
          <NuxtLink
            to="/logbook"
            class="shrink-0 w-11 h-11 rounded-full bg-susi-navy text-white flex items-center justify-center transition-colors duration-200 ease-[ease] hover:bg-susi-navy-light"
            aria-label="View logbook"
          >
            <svg
              class="w-5 h-5"
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

      <div class="max-w-300 mx-auto flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="flex flex-col gap-6 lg:col-span-8 lg:gap-8">
          <section class="flex flex-col">
            <section-header title="Upcoming Flight">
              <template #action>
                <a
                  href="#"
                  class="text-xs font-semibold text-susi-red no-underline hover:underline lg:text-sm"
                >View all</a>
              </template>
            </section-header>

            <base-card
              padding="none"
              class="p-4 flex flex-col gap-4 sm:flex-row sm:items-center lg:p-6 lg:gap-8"
            >
              <div class="bg-susi-bg border border-border-light rounded-xl p-3 text-center min-w-16 lg:min-w-20 lg:p-4">
                <span class="block text-2xl font-bold leading-none lg:text-[2rem]">{{ upcomingFlight.date }}</span>
                <span class="block text-[0.625rem] font-bold text-text-secondary mt-1 tracking-widest">{{ upcomingFlight.monthYear }}</span>
              </div>

              <div class="flex-1 flex flex-col justify-center">
                <p class="text-[0.625rem] font-bold text-text-secondary text-center mb-2">
                  {{ upcomingFlight.time }}
                </p>
                <div class="flex items-center justify-between w-full">
                  <div class="flex flex-col text-left">
                    <span class="text-2xl font-bold lg:text-4xl">{{ upcomingFlight.origin }}</span>
                    <!-- <span class="city-name">{{ upcomingFlight.originCity }}</span> -->
                  </div>

                  <div class="flex-1 relative flex justify-center px-4">
                    <div class="w-full border-t-2 border-dashed border-border-light" />
                    <icons-plane class="absolute -top-[0.63rem] w-6 h-6 text-susi-red bg-white px-1 rotate-90" />
                  </div>

                  <div class="flex flex-col text-right">
                    <span class="text-2xl font-bold lg:text-4xl">{{ upcomingFlight.destination }}</span>
                    <!-- <span class="city-name">{{ upcomingFlight.destinationCity }}</span> -->
                  </div>
                </div>
                <div class="flex items-center justify-between w-full">
                  <span>{{ upcomingFlight.originCity }}</span>
                  <span>{{ upcomingFlight.destinationCity }}</span>
                </div>
              </div>
            </base-card>
          </section>

          <section class="flex flex-col">
            <section-header title="Latest News">
              <template #action>
                <a
                  href="#"
                  class="text-xs font-semibold text-susi-red no-underline hover:underline lg:text-sm"
                >See all</a>
              </template>
            </section-header>

            <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
              <base-card
                v-for="item in newsItems"
                :key="item.title"
                padding="none"
                class="min-w-50 max-w-50 shrink-0 overflow-hidden"
              >
                <div class="relative">
                  <img
                    :src="item.image || defaultNewsImage"
                    :alt="item.title"
                    class="block w-full h-26 object-cover"
                  >
                  <span
                    v-if="item.isNew"
                    class="absolute top-2 left-2 bg-susi-red text-white text-[0.6rem] font-bold uppercase tracking-[0.04em] py-[0.15rem] px-2 rounded-xl"
                  >New</span>
                </div>
                <div class="p-3">
                  <h3 class="text-label-lg font-bold text-susi-navy m-0 leading-[1.3]">
                    {{ item.title }}
                  </h3>
                  <p class="text-xs text-text-secondary mt-1 mb-0">
                    {{ item.timeAgo }}
                  </p>
                </div>
              </base-card>
            </div>
          </section>

          <section class="flex flex-col">
            <section-header
              title="Flight Hours Trend"
              subtitle="Rolling sums for the selected window"
            >
              <template #action>
                <span class="text-xs text-text-secondary font-bold uppercase tracking-[0.08em]">Unit: Hours</span>
              </template>
            </section-header>

            <base-card padding="lg">
              <div class="bg-susi-bg rounded-xl border border-border-light p-3">
                <hours-trend-chart
                  :labels="chartData.labels"
                  :values="chartData.values"
                  :limit="chartData.limit"
                  :max="chartData.max"
                  :today-index="chartData.todayIndex"
                />
                <div class="flex justify-between items-center mt-2 text-[0.625rem] text-text-secondary">
                  <span class="text-susi-red font-bold">Limit {{ chartData.limit.toFixed(0) }} hrs</span>
                  <span>{{ chartData.labels[0] }} – {{ chartData.labels[chartData.labels.length - 1] }}</span>
                </div>
              </div>

              <div class="flex bg-susi-bg p-1 rounded-3xl mt-4 border border-border-light">
                <button
                  v-for="toggle in chartToggles"
                  :key="toggle"
                  class="flex-1 border-none py-1.5 rounded-3xl text-xs font-bold cursor-pointer transition-all duration-200 ease-[ease]"
                  :class="selectedChartToggle === toggle
                    ? 'bg-susi-navy text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-susi-navy'
                    : 'bg-transparent text-text-secondary hover:bg-border-light'"
                  @click="selectedChartToggle = toggle"
                >
                  {{ toggle }}
                </button>
              </div>

              <div class="flex items-start gap-2 bg-susi-chart-accent/8 p-3 rounded-xl border border-susi-chart-accent/25 mt-4">
                <svg
                  class="w-5 h-5 text-susi-chart-accent-dark shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg>
                <p class="text-[0.625rem] text-susi-chart-accent-darker leading-[1.4] m-0 lg:text-xs">
                  Each point shows the <strong>rolling sum</strong> of flight hours based on the selected time window.
                </p>
              </div>
            </base-card>
          </section>
        </div>

        <div class="flex flex-col gap-6 lg:col-span-4 lg:gap-8">
          <section class="flex flex-col">
            <section-header
              title="Hours to Limit"
              subtitle="Current usage against the regulatory cap"
            >
              <template #action>
                <a
                  href="#"
                  class="text-xs font-semibold text-susi-red no-underline hover:underline lg:text-sm"
                >View details</a>
              </template>
            </section-header>

            <div class="grid grid-cols-2 gap-3 lg:grid-cols-1 xl:grid-cols-2">
              <base-card
                v-for="limit in hoursToLimit"
                :key="limit.label"
                padding="md"
                class="flex flex-col justify-between"
              >
                <div class="flex justify-between items-start mb-3">
                  <div class="flex flex-col">
                    <span class="text-[0.625rem] font-bold text-text-secondary uppercase tracking-wider">{{ limit.label }}</span>
                    <span class="text-xs text-text-secondary mt-0.5">{{ limit.limit }} limit</span>
                  </div>
                  <div
                    class="w-6 h-6 rounded-md flex items-center justify-center"
                    :class="toneIconBgClass[limit.tone]"
                  >
                    <svg
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      :class="toneTextClass[limit.tone]"
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

                <div>
                  <p class="text-xl font-bold m-0 lg:text-2xl">
                    {{ limit.flown }} <span class="text-[0.625rem] font-normal text-text-secondary">flown</span>
                  </p>
                  <div class="w-full h-1.5 bg-[#F3F4F6] rounded-full mt-3 overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :class="toneBarBgClass[limit.tone]"
                      :style="{ width: `${limit.progressWidth}%` }"
                    />
                  </div>
                  <p
                    class="text-[0.5625rem] font-bold mt-1.5 mb-0 lg:text-[0.625rem]"
                    :class="toneTextClass[limit.tone]"
                  >
                    {{ limit.remaining }} · {{ limit.remainingPercent }}
                  </p>
                </div>
              </base-card>
            </div>
          </section>

          <section class="flex flex-col">
            <section-header
              title="My Documents"
              subtitle="Expiry status for operational paperwork"
            >
              <template #action>
                <a
                  href="#"
                  class="text-xs font-semibold text-susi-red no-underline hover:underline lg:text-sm"
                >View all</a>
              </template>
            </section-header>

            <base-card
              padding="none"
              class="flex flex-col"
            >
              <div
                v-for="doc in documents"
                :key="doc.id"
                class="flex items-center justify-between p-4 border-b border-border-light last:border-b-0"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-susi-bg border border-border-light flex items-center justify-center">
                    <svg
                      class="w-4 h-4 text-text-secondary"
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
                  <div>
                    <p class="text-sm font-bold m-0">
                      {{ doc.label }}
                    </p>
                    <p class="text-[0.625rem] text-text-secondary mt-0.5 mb-0">
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
