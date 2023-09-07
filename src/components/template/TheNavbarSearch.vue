<template>
  <form class="wibbo-nav__form" @submit.prevent="searchPost">
    <BaseInput
      v-model="searchForm.username"
      class="wibbo-nav__input"
      :placeholder="$t('navbar.search')"
      autocomplete="off"
      @click="emit('openSearch')"
      @keypress="isValidSearch"
    />
    <button type="submit" name="submit" aria-label="Search a user" class="wibbo-nav__btn-search">
      <i class="fas fa-search" />
    </button>
    <transition name="fade-in-down">
      <div
        v-if="searchUsers.length || loading"
        :key="'dropName_' + props.dropName"
        class="min-h-full h-28 wibbo-nav__content wibbo-nav__content--absolute"
        :class="props.dropName == 'search' ? 'block' : 'hidden'"
      >
        <ul class="wibbo-nav__ul">
          <BaseSpinner :loading="loading" />
          <transition-group name="list">
            <NuxtLink v-for="data in searchUsers" :key="'user_' + data.username" :to="'/profil/' + data.username" class="relative block">
              <li class="h-5 wibbo-nav__li whitespace-nowrap">
                <BaseAvatar :figure="data.look" size="s" headonly class="inline-block" />{{ data.username }}
              </li>
            </NuxtLink>
          </transition-group>
        </ul>
      </div>
    </transition>
  </form>
</template>

<script lang="ts" setup>
import type { UserSearch } from '~/types'

const emit = defineEmits(['openSearch'])

const props = defineProps({
  dropName: { type: String, required: true }
})

const searchForm = ref({ username: '' })
const searchUsers = ref<UserSearch[]>([])
const searchInternal = ref(0)
const loading = ref(false)

let abortController = new AbortController()

const searchPost = () => {
  if (!searchForm.value.username.length) { return }

  navigateTo('/profil/' + encodeURIComponent(searchForm.value.username))

  searchForm.value.username = ''
}

watch(
  () => searchForm.value.username,
  (value: string) => {
    if (loading.value) {
      abortController.abort()
      abortController = new AbortController()
    }

    if (searchInternal.value) { clearInterval(searchInternal.value) }

    if (!value.length) {
      searchUsers.value = []
      loading.value = false
      return
    }

    loading.value = true

    searchInternal.value = window.setTimeout(async () => {
      try {
        const { users } = await useApiFetch<{ users: UserSearch[] }>('/api/v1/search-user/' + value, { signal: abortController.signal })
        searchUsers.value = users
      } catch (e) {}
      loading.value = false
    }, 1000)
  }
)

const isValidSearch = (evt: KeyboardEvent) => {
  if (/[^a-z\d\-=?!@:.]/i.test(evt.key)) { evt.preventDefault() } else { return true }
}
</script>
