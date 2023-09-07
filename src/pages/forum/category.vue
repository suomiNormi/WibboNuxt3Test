<template>
  <div>
    <div class="flex justify-between">
      <h4 class="py-2 ml-2">
        {{ nameCategory }}
      </h4>
      <span>
        <BaseButton v-if="isConnected" :to="'/forum/create'" min>Créer un sujet <i class="fas fa-pencil-alt" /></BaseButton>
        <span class="lg:hidden">
          <BaseButton primary min @click="navToggle = !navToggle"><i class="px-2 fa fa-bars" /></BaseButton>
        </span>
      </span>
    </div>

    <div class="flex-col justify-around w-full lg:flex lg:flex-row" :class="{ hidden: !navToggle }">
      <BaseButton v-for="nav in navCategory" :key="nav.id" :to="'/forum/category/' + nav.id" primary>
        {{ nav.name }}
      </BaseButton>
    </div>
    <form class="flex flex-row w-full my-2" @submit.prevent="searchPost">
      <BaseInput v-model="searchForm.search" placeholder="Chercher un sujet..." autocomplete="off" class="mx-2" />
      <BaseButton min primary class="!m-0">
        <i class="px-2 fas fa-search" />
      </BaseButton>
    </form>

    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import type { ICategory } from '~/types'

definePageMeta({
  middleware: ({ params }) => {
    const router = useRouter()

    if (!/^\d+$/.test(params.id.toString())) { router.push({ params: { id: '0' } }) }
  },
  pageTransition: {
    name: 'fade-slow'
  },
  key (route) {
    return route.query.toString() ?? ''
  }
})

const route = useRoute()
const authUser = useAuthUser()

const navToggle = ref(false)
const loading = ref(false)
const searchForm = ref({ search: '' })

const navCategory = ref<ICategory[]>([
  { id: 0, name: 'Tout', denyCreate: true },
  { id: 4, name: 'Discussion' },
  { id: 1, name: 'Tutoriel' },
  { id: 2, name: 'Graphisme' },
  { id: 3, name: 'Aide' },
  { id: 6, name: 'Idée & bug' },
  { id: 7, name: 'Jeux' },
  { id: 8, name: 'Information' }
])

const nameCategory = computed(() => {
  const category = navCategory.value.filter(n => n.id.toString() === route.params.id)[0]

  return category ? category.name : 'Inconnu'
})

useHead({
  title: 'Forum ' + nameCategory.value
})

const searchPost = () => {
  if (loading.value || !searchForm.value.search) { return }

  try {
    loading.value = true

    navigateTo({ query: { search: searchForm.value.search } })

    searchForm.value = { search: '' }
  } catch {}

  loading.value = false
}

const isConnected = computed(() => authUser.value.id !== -1)
</script>
