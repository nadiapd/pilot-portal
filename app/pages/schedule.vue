<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePilotStore } from '~/stores/pilot'
import { useScheduleStore } from '~/stores/schedule'

const title = 'Schedule'
const description = 'Flight schedule for Susi Air pilots'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const scheduleStore = useScheduleStore()
const pilotStore = usePilotStore()

const currentMonth = ref(new Date('2026-05-01'))
const selectedDate = ref<string | null>(null)
const showDetailModal = ref(false)
const notificationCount = computed(() => pilotStore.notifications || 3)

const monthLabel = computed(() => currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))

const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getCalendarDays = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)

  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: Array<{ dateKey: string, isCurrentMonth: boolean, date: Date }> = []

  for (let index = 0; index < startOffset; index += 1) {
    const previousDate = new Date(year, month, index - startOffset + 1)
    days.push({
      dateKey: toDateKey(previousDate),
      isCurrentMonth: false,
      date: previousDate
    })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const currentDate = new Date(year, month, day)
    days.push({
      dateKey: toDateKey(currentDate),
      isCurrentMonth: true,
      date: currentDate
    })
  }

  while (days.length % 7 !== 0) {
    const lastDay = days[days.length - 1]?.date ?? new Date(year, month, daysInMonth)
    const nextDate = new Date(lastDay)
    nextDate.setDate(lastDay.getDate() + 1)
    days.push({
      dateKey: toDateKey(nextDate),
      isCurrentMonth: false,
      date: nextDate
    })
  }

  return days
}

const calendarDays = computed(() => getCalendarDays(currentMonth.value))

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const navigateMonth = (direction: number) => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + direction, 1)
}

const getDutyMeta = (code: string) => {
  const normalizedCode = code === 'TRD' || code === 'TRV' ? 'TRV' : code
  const legendEntry = scheduleStore.legend.find(item => item.code === normalizedCode || item.code === code)

  if (legendEntry) {
    return {
      label: legendEntry.label,
      color: legendEntry.color,
      code: normalizedCode
    }
  }

  return {
    label: code,
    color: '#64748b',
    code: normalizedCode
  }
}

const getScheduleForDay = (dateKey: string) => {
  return scheduleStore.schedulesByDate[dateKey] || null
}

const openDayDetail = (dateKey: string) => {
  selectedDate.value = dateKey
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedDate.value = null
}

const selectedDateLabel = computed(() => {
  if (!selectedDate.value) {
    return ''
  }

  const date = new Date(`${selectedDate.value}T00:00:00`)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})
</script>

<template>
  <div class="min-h-screen bg-susi-bg pb-26 overflow-x-hidden">
    <header class="sticky top-0 z-30 flex items-center justify-between py-4 px-5 bg-white border-b border-border-light lg:py-5 lg:px-12">
      <NuxtLink
        to="/dashboard"
        class="w-9 h-9 rounded-full text-susi-navy flex items-center justify-center no-underline transition-colors duration-200 ease-[ease] hover:bg-susi-bg"
        aria-label="Back"
      >
        <svg
          class="w-[1.35rem] h-[1.35rem]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </NuxtLink>
      <h1 class="m-0 text-lg font-bold text-susi-navy">
        Schedule
      </h1>
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

    <main class="max-w-160 mx-auto p-5 flex flex-col gap-5 lg:max-w-225 lg:py-8 lg:px-12">
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="border-none w-8 h-8 rounded-full bg-transparent text-susi-navy text-xl cursor-pointer shrink-0 flex items-center justify-center transition-colors duration-200 ease-[ease] hover:bg-susi-bg"
          aria-label="Previous month"
          @click="navigateMonth(-1)"
        >
          ‹
        </button>
        <span class="flex items-center gap-[0.35rem] text-lg font-bold text-susi-navy">
          {{ monthLabel }}
        </span>
        <button
          type="button"
          class="border-none w-8 h-8 rounded-full bg-transparent text-susi-navy text-xl cursor-pointer shrink-0 flex items-center justify-center transition-colors duration-200 ease-[ease] hover:bg-susi-bg"
          aria-label="Next month"
          @click="navigateMonth(1)"
        >
          ›
        </button>
      </div>

      <section class="bg-white border border-border-light rounded-2xl shadow-card py-4 px-2 overflow-hidden">
        <div class="grid grid-cols-7">
          <div
            v-for="label in weekdayLabels"
            :key="label"
            class="text-center text-xs font-semibold text-text-secondary pb-3"
          >
            {{ label }}
          </div>
        </div>

        <div class="grid grid-cols-7">
          <button
            v-for="day in calendarDays"
            :key="day.dateKey"
            type="button"
            class="border-none bg-transparent pt-1 pb-[0.6rem] flex flex-col items-center gap-[0.3rem] cursor-pointer active:scale-95"
            @click="openDayDetail(day.dateKey)"
          >
            <span
              class="w-[2.1rem] h-[2.1rem] rounded-full flex items-center justify-center transition-colors duration-200 ease-[ease]"
              :class="{
                'bg-[#FCEFC7]': day.dateKey === scheduleStore.today && selectedDate !== day.dateKey,
                'bg-susi-navy': selectedDate === day.dateKey
              }"
            >
              <span
                class="text-sm font-semibold text-susi-navy"
                :class="{
                  'text-[#C7CDD6]': !day.isCurrentMonth && selectedDate !== day.dateKey,
                  'text-white': selectedDate === day.dateKey
                }"
              >{{ day.date.getDate() }}</span>
            </span>
            <span
              v-if="getScheduleForDay(day.dateKey)"
              class="w-1.5 h-1.5 rounded-full"
              :class="{ 'bg-white/60': selectedDate === day.dateKey }"
              :style="{ backgroundColor: selectedDate === day.dateKey ? undefined : getDutyMeta(getScheduleForDay(day.dateKey)?.duty_type || '').color }"
            />
          </button>
        </div>
      </section>

      <BaseCard padding="md">
        <div class="grid grid-cols-2 gap-x-4 gap-y-[0.85rem] lg:grid-cols-4">
          <div
            v-for="item in scheduleStore.legend"
            :key="item.code"
            class="flex items-center gap-[0.6rem] text-sm font-medium text-susi-navy min-w-0"
          >
            <DutyPill
              variant="circle"
              :code="item.code"
              :color="item.color"
            />
            <span class="wrap:anywhere">{{ item.label }}</span>
          </div>
        </div>
      </BaseCard>
    </main>

    <div
      v-if="showDetailModal"
      class="fixed inset-0 bg-susi-navy/45 flex items-center justify-center p-4 z-60"
      @click="closeDetailModal"
    >
      <div
        class="bg-white w-[min(100%,24rem)] max-w-[calc(100vw-2rem)] rounded-2xl p-5 shadow-[0_16px_40px_rgba(14,33,56,0.18)]"
        @click.stop
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="m-0 text-lg font-bold text-susi-navy">
            {{ selectedDateLabel }}
          </h3>
          <button
            type="button"
            class="border-none bg-transparent text-xl leading-none text-text-secondary cursor-pointer p-1 rounded-full transition-colors duration-200 ease-[ease] hover:bg-susi-bg"
            @click="closeDetailModal"
          >
            ×
          </button>
        </div>
        <div class="flex flex-col items-center justify-center gap-2 py-8 px-4 text-text-secondary text-center">
          <svg
            class="w-7 h-7 text-[#CBD5E1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p class="m-0 text-sm">
            Detail page coming soon
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
