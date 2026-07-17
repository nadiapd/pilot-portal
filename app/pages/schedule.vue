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
  <div class="schedule-page">
    <header class="schedule-header">
      <NuxtLink
        to="/dashboard"
        class="back-btn"
        aria-label="Back"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </NuxtLink>
      <h1>Schedule</h1>
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

    <main class="schedule-content">
      <div class="month-nav">
        <button
          type="button"
          class="nav-btn"
          aria-label="Previous month"
          @click="navigateMonth(-1)"
        >
          ‹
        </button>
        <span class="month-label">
          {{ monthLabel }}
        </span>
        <button
          type="button"
          class="nav-btn"
          aria-label="Next month"
          @click="navigateMonth(1)"
        >
          ›
        </button>
      </div>

      <section class="calendar-card">
        <div class="weekday-row">
          <div
            v-for="label in weekdayLabels"
            :key="label"
            class="weekday"
          >
            {{ label }}
          </div>
        </div>

        <div class="calendar-grid">
          <button
            v-for="day in calendarDays"
            :key="day.dateKey"
            type="button"
            class="calendar-day"
            :class="{
              'calendar-day--muted': !day.isCurrentMonth,
              'calendar-day--today': day.dateKey === scheduleStore.today && selectedDate !== day.dateKey,
              'calendar-day--selected': selectedDate === day.dateKey
            }"
            @click="openDayDetail(day.dateKey)"
          >
            <span class="calendar-day__number-wrap">
              <span class="calendar-day__number">{{ day.date.getDate() }}</span>
            </span>
            <span
              v-if="getScheduleForDay(day.dateKey)"
              class="calendar-day__dot"
              :style="{ backgroundColor: selectedDate === day.dateKey ? undefined : getDutyMeta(getScheduleForDay(day.dateKey)?.duty_type || '').color }"
            />
          </button>
        </div>
      </section>

      <BaseCard
        padding="md"
        class="legend-card"
      >
        <div class="legend-list">
          <div
            v-for="item in scheduleStore.legend"
            :key="item.code"
            class="legend-item"
          >
            <DutyPill
              variant="circle"
              :code="item.code"
              :color="item.color"
            />
            <span class="legend-label">{{ item.label }}</span>
          </div>
        </div>
      </BaseCard>
    </main>

    <div
      v-if="showDetailModal"
      class="modal-backdrop"
      @click="closeDetailModal"
    >
      <div
        class="modal-card"
        @click.stop
      >
        <div class="modal-card__header">
          <h3>{{ selectedDateLabel }}</h3>
          <button
            type="button"
            class="modal-close"
            @click="closeDetailModal"
          >
            ×
          </button>
        </div>
        <div class="modal-card__placeholder">
          <svg
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
          <p>Detail page coming soon</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule-page {
  min-height: 100vh;
  background-color: $susi-bg;
  padding-bottom: 6.5rem;
  overflow-x: hidden;
}

.schedule-header {
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

  h1 {
    margin: 0;
    font-size: $fs-headline-sm;
    font-weight: $fw-bold;
    color: $susi-navy;
  }
}

.back-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  color: $susi-navy;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $susi-bg;
  }

  svg {
    width: 1.35rem;
    height: 1.35rem;
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

.schedule-content {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: $bp-lg) {
    max-width: 900px;
    padding: 2rem 3rem;
  }
}

.month-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.month-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: $fs-headline-sm;
  font-weight: $fw-bold;
  color: $susi-navy;

  .month-caret {
    width: 1rem;
    height: 1rem;
    color: $text-secondary;
  }
}

.nav-btn {
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: none;
  color: $susi-navy;
  font-size: 1.25rem;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $susi-bg;
  }
}

.calendar-card {
  background: $susi-card;
  border: 1px solid $border-light;
  border-radius: $radius-card-lg;
  box-shadow: $shadow-card;
  padding: 1rem 0.5rem;
  overflow: hidden;
}

.weekday-row,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.weekday {
  text-align: center;
  font-size: $fs-label-sm;
  font-weight: 600;
  color: $text-secondary;
  padding-bottom: 0.75rem;
}

.calendar-day {
  border: none;
  background: none;
  padding: 0.25rem 0 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &--muted {
    .calendar-day__number {
      color: #C7CDD6;
    }
  }

  &--today {
    .calendar-day__number-wrap {
      background-color: #FCEFC7;
    }
  }

  &--selected {
    .calendar-day__number-wrap {
      background-color: $susi-navy;
    }

    .calendar-day__number {
      color: $susi-card;
    }

    .calendar-day__dot {
      background-color: rgba($susi-card, 0.6);
    }
  }
}

.calendar-day__number-wrap {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.calendar-day__number {
  font-size: $fs-body-sm;
  font-weight: 600;
  color: $susi-navy;
}

.calendar-day__dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
}

.legend-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem 1rem;

  @media (min-width: $bp-lg) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: $fs-body-sm;
  font-weight: 500;
  color: $susi-navy;
  min-width: 0;
}

.legend-label {
  overflow-wrap: anywhere;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(14, 33, 56, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 60;
}

.modal-card {
  background: $susi-card;
  width: min(100%, 24rem);
  max-width: calc(100vw - 2rem);
  border-radius: $radius-card-lg;
  padding: 1.25rem;
  box-shadow: 0 16px 40px rgba(14, 33, 56, 0.18);
}

.modal-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h3 {
    margin: 0;
    font-size: $fs-headline-sm;
    color: $susi-navy;
  }
}

.modal-card__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  color: $text-secondary;
  text-align: center;

  svg {
    width: 1.75rem;
    height: 1.75rem;
    color: #CBD5E1;
  }

  p {
    margin: 0;
    font-size: $fs-body-sm;
  }
}

.modal-close {
  border: none;
  background: none;
  font-size: 1.25rem;
  line-height: 1;
  color: $text-secondary;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $susi-bg;
  }
}
</style>
