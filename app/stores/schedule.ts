import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import mockSchedules from '~/data/mock-schedules.json'

interface ScheduleItem {
  duty_date: string
  status: number
  base_name: string
  base_color: string
  duty_type: string
  count_schedules: number
  count_logbooks: number
  [key: string]: unknown
}

export const useScheduleStore = defineStore('schedules', () => {
  const today = ref('2026-05-31')
  const legend = ref(mockSchedules.legend)
  const schedulesRaw = ref<ScheduleItem[]>(mockSchedules.schedules)

  const schedulesByDate = computed<Record<string, ScheduleItem>>(() => {
    return schedulesRaw.value.reduce<Record<string, ScheduleItem>>((acc, curr) => {
      acc[curr.duty_date] = curr
      return acc
    }, {})
  })

  const upcomingSchedule = computed<ScheduleItem | null>(() => {
    return [...schedulesRaw.value]
      .filter(item => item.status === 1)
      .sort((a, b) => new Date(a.duty_date).getTime() - new Date(b.duty_date).getTime())[0] || null
  })

  return { today, legend, schedulesByDate, upcomingSchedule }
})
