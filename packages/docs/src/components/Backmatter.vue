<template>
  <section
    id="ready-for-more"
    class="mt-12"
  >
    <app-heading
      :content="t('ready')"
      level="2"
    />

    <!-- https://vue-i18n.intlify.dev/guide/advanced/component.html#scope-resolving -->
    <i18n-t
      class="mb-3"
      keypath="ready-text"
      scope="global"
      tag="div"
    >
      <template #team>
        <app-link :href="rpath('/introduction/meet-the-team/')">
          {{ t('team') }}
        </app-link>
      </template>
    </i18n-t>

    <related-pages />

    <app-divider class="mt-7 mb-5" />

    <up-next class="mb-4" />

    <!-- <exit-ad class="mb-8" /> -->

    <!-- <contribute /> -->
  </section>
</template>

<<<<<<< Updated upstream
<script setup>
  // Components
  import RelatedPages from '@/components/doc/RelatedPages.vue'
  import UpNext from '@/components/doc/UpNext.vue'
=======
<script lang="ts">
  // Components
  import UpNext from '@/components/doc/UpNext.vue'

  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { generatedRoutes, rpath } from '@/util/routes'
>>>>>>> Stashed changes

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { rpath } from '@/util/routes'

<<<<<<< Updated upstream
  const { t } = useI18n()
=======
    components: {
      UpNext,
    },

    setup () {
      const route = useRoute()
      const { t, locale } = useI18n()

      const related = computed(() => ((route.meta.related as string[]) || []).flatMap(href => {
        href = href.replace(/\/$/, '')
        const path = `/${locale.value}${href}`
        const route = generatedRoutes.find((route: any) => route.path === path)

        if (!route) return []

        const category = href.split('/')[1]

        return {
          title: (route.meta?.nav ?? route.meta?.title ?? href) as string | undefined,
          subtitle: category,
          ...categoryIcons[category],
          href: path,
        }
      }))

      return {
        related,
        t,
        rpath,
      }
    },
  })
>>>>>>> Stashed changes
</script>
