// Composables
import { usePromotionsStore } from '@/store/promotions'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

// Utilities
import { computed } from 'vue'

export const createPromotionProps = () => ({
  medium: {
    type: String,
    default: 'docs',
  },
  slug: String,
})

export const usePromotion = (props: { medium: string, slug?: string }) => {
  const { locale } = useI18n()
  const store = usePromotionsStore()
  const theme = useTheme()

  const promotions = computed(() => {
    return store.promotions.filter(promotion => promotion.metadata?.discoverable)
  })

  const promotion = computed(() => {
    if (props.slug) return store.promotions?.find(promotion => promotion.slug === props.slug)

    return promotions.value[Math.floor(Math.random() * promotions.value.length)]
  })

  const href = computed(() => {
    if (!promotion.value) return undefined

    const [url, query] = promotion.value.metadata!.url.split('?')

    if (!url.startsWith('http')) {
      return `/${locale.value}${url}/`
    }

    if (query && query.indexOf('utm_source') !== -1) {
      return `${url}?${query}`
    }

    return `${url}?utm_source=vuetifypromotions&utm_medium=${props.medium}` + (query ? `&${query}` : '')
  })

  const isSponsored = computed(() => {
    return promotion.value?.metadata?.sponsored
  })

  const attrs = computed(() => {
    if (!promotion.value) return undefined

    return {
      class: 'text-decoration-none',
      href: href.value,
      rel: `noopener${isSponsored.value ? ' sponsored' : ''}`,
      target: '_blank',
    }
  })

  const description = computed(() => {
    return props.medium === 'promoted' ? promotion.value?.metadata!.description_short : promotion.value?.metadata!.description
  })

  const isDark = computed(() => {
    return theme.current.value.dark
  })

  const background = computed(() => {
    return promotion.value?.metadata.images[`on_${isDark.value ? 'dark' : 'light'}`].background.url
  })

  const logo = computed(() => {
    return promotion.value?.metadata.images[`on_${isDark.value ? 'dark' : 'light'}`].logo.url
  })

  return { promotion, attrs, description, background, logo, isDark }
}
