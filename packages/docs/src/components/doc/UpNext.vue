<template>
  <div
    id="up-next"
    class="d-flex"
  >
    <router-link
      v-if="prev"
      :to="prev.path"
      class="text-decoration-none text-body-1 d-inline-flex align-center"
    >
      <v-icon
        :icon="arrows.prev"
<<<<<<< Updated upstream
        class="me-1"
=======
        class="mr-1"
>>>>>>> Stashed changes
        color="primary"
      />

      <span
        class="text-primary"
        v-text="prev.meta.nav ?? prev.meta.title"
      />
    </router-link>

    <v-spacer />

    <router-link
      v-if="next"
      :to="next.path"
      class="text-decoration-none text-body-1 d-inline-flex align-center"
    >
      <span
        class="text-primary"
        v-text="next.meta.nav ?? next.meta.title"
      />

      <v-icon
        :icon="arrows.next"
<<<<<<< Updated upstream
        class="ms-1"
=======
        class="ml-1"
>>>>>>> Stashed changes
        color="primary"
      />
    </router-link>
  </div>
</template>

<script setup>
  // Composables
  import { useRoute, useRouter } from 'vue-router'
  import { useRtl } from 'vuetify'
<<<<<<< Updated upstream
  import { useAppStore } from '@/store/app'
=======
>>>>>>> Stashed changes

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

<<<<<<< Updated upstream
  const { pages } = useAppStore()
  const route = useRoute()
  const path = computed(() => route.path.split('/').slice(2, -1))
  const routes = computed(() => useRouter().getRoutes())
  const currentIndex = computed(() => pages.indexOf(path.value.join('/')))
  const prev = computed(() => {
    const prevPath = rpath(pages[currentIndex.value - 1])
=======
  // Data
  import nav from '@/data/nav-alpha.json'

  function getItems (items, array = []) {
    for (const item of items) {
      if (!item.items.length) {
        console.log(item)
        array.push(item.title)

        continue
      }

      // array = [...array, getItems(item.items, array)]
    }

    return array
  }

  const pages = computed(() => getItems(nav))
  const route = useRoute()
  const path = computed(() => route.path.split('/').slice(2, -1))
  const routes = computed(() => useRouter().getRoutes())
  const currentIndex = computed(() => pages.value.indexOf(path.value.join('/')))
  const prev = computed(() => {
    const prevPath = rpath(pages.value[currentIndex.value - 1])
>>>>>>> Stashed changes

    return routes.value.find(r => r.path === prevPath)
  })
  const next = computed(() => {
<<<<<<< Updated upstream
    const nextPath = rpath(pages[currentIndex.value + 1])
=======
    const nextPath = rpath(pages.value[currentIndex.value + 1])
>>>>>>> Stashed changes

    return routes.value.find(r => r.path === nextPath)
  })

  const { isRtl } = useRtl()
  const arrows = computed(() => ({
    next: !isRtl ? 'mdi-chevron-left' : 'mdi-chevron-right',
    prev: !isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left',
  }))
</script>
