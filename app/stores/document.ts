import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import mockDocuments from '~/data/mock-documents.json'

export const useDocumentStore = defineStore('documents', () => {
  const today = new Date(mockDocuments.today || '2026-05-31')
  const documentsRaw = ref(mockDocuments.documents)
  const thresholds = ref(mockDocuments.thresholds)

  const processedDocuments = computed(() => {
    return documentsRaw.value.map((doc) => {
      const expiry = new Date(doc.expiryDate)
      const diffTime = expiry.getTime() - today.getTime()
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      let status: 'success' | 'warning' | 'danger' = 'success'
      if (daysRemaining <= 0) status = 'danger'
      else if (daysRemaining <= thresholds.value.warningDays) status = 'warning'

      return {
        ...doc,
        daysRemaining,
        badge: daysRemaining <= 0 ? 'Expired' : `${daysRemaining} days`,
        status,
        expiryLabel: new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }).format(expiry)
      }
    })
  })

  return { processedDocuments }
})
