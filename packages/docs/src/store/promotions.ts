// Composables
import { useCosmic } from '@/composables/cosmic'

// Utilities
import { defineStore } from 'pinia'
import { onBeforeMount, ref } from 'vue'

// Types
interface Promotion {
  slug: string
  title: string
  metadata: {
    url: string
    description: string
    description_short: string
    discoverable: boolean
    sponsored: boolean
    images: {
      on_dark: {
        background: { url: string }
        logo: { url: string }
      }
      on_light: {
        background: { url: string }
        logo: { url: string }
      }
    }
  }
}

export const usePromotionsStore = defineStore('promotions', () => {
  const promotions = ref<Promotion[]>([])

  onBeforeMount(async () => {
    if (promotions.value.length) return

    const { bucket } = useCosmic<Promotion>()

    const { objects = [] } = (
      await bucket?.objects
        .find({ type: 'promotions' })
        .props('slug,title,metadata')
        .status('published')
    ) || {}

    promotions.value = objects
  })

  return { promotions }
})
