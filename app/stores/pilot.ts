import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import mockFlightHours from '~/data/mock-flight-hours.json'

interface FlightHoursMockData {
  pilot: {
    name: string
    rank?: string
    avatar?: string
    totalFlightHours: number
  }
  upcomingFlight?: {
    date: string
    monthYear: string
    time: string
    origin: string
    originCity: string
    destination: string
    destinationCity: string
  }
  news?: Array<{ title: string, summary: string, tag: string }>
  notifications?: number
  limits: {
    daily: number
    weekly: number
    monthly: number
    annual: number
  }
  chartBounds: Record<string, { limit: number, max: number, windowDays: number, displayRangeDays: number }>
  flightHours: Array<{ date: string, hours: number }>
}

const mockFlightHoursData = mockFlightHours as FlightHoursMockData

const parseDate = (value: string) => new Date(`${value}T12:00:00`)

const toDateKey = (value: Date) => {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getHoursMap = (entries: Array<{ date: string, hours: number }>) => {
  return entries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.date] = Number(entry.hours) || 0
    return acc
  }, {})
}

const getRollingSum = (hoursMap: Record<string, number>, targetDate: Date, windowDays: number) => {
  const dateCursor = new Date(targetDate)
  let total = 0

  for (let index = 0; index < windowDays; index += 1) {
    const key = toDateKey(dateCursor)
    total += hoursMap[key] || 0
    dateCursor.setDate(dateCursor.getDate() - 1)
  }

  return Number(total.toFixed(2))
}

export const usePilotStore = defineStore('pilot', () => {
  const pilot = ref(mockFlightHoursData.pilot)
  const limits = ref(mockFlightHoursData.limits)
  const chartBounds = ref(mockFlightHoursData.chartBounds)
  const flightHours = ref(mockFlightHoursData.flightHours)
  const upcomingFlight = ref(mockFlightHoursData.upcomingFlight)
  const newsItems = ref(mockFlightHoursData.news || [])
  const notifications = ref(mockFlightHoursData.notifications || 0)

  const formattedTotalHours = computed(() => {
    const total = pilot.value.totalFlightHours
    const hours = Math.floor(total)
    const minutes = Math.round((total - hours) * 60)

    return {
      hours: hours.toLocaleString('en-US'),
      minutes: minutes.toString().padStart(2, '0')
    }
  })

  const hoursToLimit = computed(() => {
    const today = parseDate('2026-05-31')
    const hoursMap = getHoursMap(flightHours.value)
    const summaries = [
      { label: 'Daily', limitValue: limits.value.daily, windowDays: 1 },
      { label: 'Weekly', limitValue: limits.value.weekly, windowDays: 7 },
      { label: 'Monthly', limitValue: limits.value.monthly, windowDays: 30 },
      { label: 'Annual', limitValue: limits.value.annual, windowDays: 365 }
    ]

    return summaries.map((item) => {
      const flownValue = getRollingSum(hoursMap, today, item.windowDays)
      const remainingValue = Math.max(item.limitValue - flownValue, 0)
      const rawPercentage = (flownValue / item.limitValue) * 100
      const percentage = Math.min(Math.round(rawPercentage), 100)

      const tone = rawPercentage >= 90 ? 'danger' : rawPercentage >= 75 ? 'warning' : 'success'

      return {
        label: item.label,
        limit: `${item.limitValue}:00`,
        flown: `${flownValue.toFixed(1)} hrs`,
        remaining: `${remainingValue.toFixed(1)} hrs remaining`,
        remainingPercent: `${percentage}%`,
        progressWidth: percentage,
        tone
      }
    })
  })

  // Y(D) = sum of flight hours from (D - windowDays + 1) up to and including D.
  // Displayed range is always fixed at 7 days before/after "today", regardless of window size.
  const getChartData = (toggle: string) => {
    const today = parseDate('2026-05-31')
    const chartConfig = chartBounds.value[toggle] || chartBounds.value['1w']
    if (!chartConfig) {
      return {
        labels: [],
        isoDates: [],
        values: [],
        limit: 0,
        max: 0,
        windowDays: 7,
        todayIndex: 0
      }
    }

    const hoursMap = getHoursMap(flightHours.value)
    const windowDays = chartConfig.windowDays
    const displayRange = 7
    const labels: string[] = []
    const isoDates: string[] = []
    const values: number[] = []

    for (let offset = -displayRange; offset <= displayRange; offset += 1) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + offset)
      labels.push(currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }))
      isoDates.push(toDateKey(currentDate))
      values.push(getRollingSum(hoursMap, currentDate, windowDays))
    }

    return {
      labels,
      isoDates,
      values,
      limit: chartConfig.limit,
      max: chartConfig.max,
      windowDays,
      todayIndex: displayRange
    }
  }

  return {
    pilot,
    limits,
    chartBounds,
    flightHours,
    upcomingFlight,
    newsItems,
    notifications,
    formattedTotalHours,
    hoursToLimit,
    getChartData
  }
})
