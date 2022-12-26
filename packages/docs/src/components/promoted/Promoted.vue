<template>
  <a
    v-if="promotion"
    class="d-flex mb-4"
    style="max-width: 640px;"
    v-bind="attrs"
    @click="onClick"
  >
    <promoted-base
      v-bind="$attrs"
      class="v-vuetify--promoted"
      density="compact"
      max-width="640"
      outlined
    >
      <v-img
        :src="background"
        class="flex-1-1-auto rounded"
        max-height="56"
        cover
      >
        <div class="d-flex align-center fill-height">
          <v-img
            v-if="mdAndUp"
            :alt="`Link to ${promotion.title}`"
            :src="logo"
            class="mx-2"
            contain
            height="56"
            max-width="56"
            theme="light"
          />

          <app-markdown
            :class="[
              smAndDown && 'ms-6',
              isDark ? 'text-grey-darken-4' : 'text-white'
            ]"
            :content="description"
            class="text-subtitle-1 text-sm-h6 font-weight-light"
          />
        </div>
      </v-img>
    </promoted-base>
  </a>
</template>

<script setup>
  // Components
  import PromotedBase from './Base.vue'

  // Composables
  import { createPromotionProps, usePromotion } from '@/composables/promotion'
  import { useDisplay } from 'vuetify'
  import { useGtag } from 'vue-gtag-next'

  const props = defineProps({
    ...createPromotionProps(),

    medium: {
      type: String,
      default: 'promoted',
    },
  })

  const { background, logo, promotion, description, attrs, isDark } = usePromotion(props)
  const { event } = useGtag()
  const { smAndDown, mdAndUp } = useDisplay()

  function onClick () {
    const slug = promotion.value?.slug

    if (!slug) return

    event('click', {
      event_category: 'vuetifys',
      event_label: slug,
      value: 'promoted',
    })
  }
</script>

<script>
  export default {
    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .v-vuetify--promoted
    p
      line-height: 1.1

    .v-markdown p strong
      font-weight: 700
</style>
