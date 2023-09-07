<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <div class="col-span-3">
      <NuxtLink v-if="authUser.mail == ''" to="/settings/email">
        <BaseAlert is-error>
          {{ $t('home.warning-email') }}
        </BaseAlert>
      </NuxtLink>
    </div>
    <div class="col-span-1 lg:col-span-2">
      <BaseCard class="mb-4">
        <template #body>
          <div class="flex p-1">
            <div class="relative w-24 h-auto mr-8">
              <BaseAvatar
                :figure="authUser.look"
                size="l"
                gesture="nrm"
                :head-irection="3"
                class="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[220px]"
                alt="Wibbo avatar"
              />
            </div>

            <div class="flex items-center w-full px-4 py-2 break-words bg-black border border-black rounded border-opacity-20 bg-opacity-20">
              <div>
                <div class="text-2xl font-bold">
                  {{ authUser.username }}
                </div>
                <i>{{ authUser.motto || 'Aucune mission' }}</i>
              </div>
            </div>
          </div>
        </template>
      </BaseCard>

      <BaseCarousel :articles="articles" />
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          {{ $t('home.forum-last-sujet') }}
        </template>

        <template #body>
          <div v-for="post in forum" :key="post.id" class="flex items-center p-1 even:bg-black even:bg-opacity-10">
            <BaseAvatar :figure="post.look" square />

            <div class="flex flex-col items-center justify-center w-full">
              <NuxtLink class="font-bold" :to="'/forum/sujet/' + post.id">
                {{ post.title }}
              </NuxtLink>
              <div class="text-sm">
                {{ $t('home.forum-last-message-1') }}
                <NuxtLink :to="'/profil/' + post.lastpost_author">
                  {{ post.lastpost_author }}
                </NuxtLink>
                {{ $t('home.forum-last-message-2') }} {{ filters.timeAgo(post.lastpost_date) }}
              </div>
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Forum, Article } from '~/types'
import * as filters from '~/utils/filters'

const authUser = useAuthUser()

definePageMeta({
  middleware: ['authenticated'],
  title: 'home'
})

const forum = ref<Forum[]>([])
const premiumDay = ref(0)
const articles = ref<Article[]>([])

const data = await useApiFetch<{ vip_time: number; news: Article[]; forum: Forum[] }>('/api/v1/me')

if (data) {
  premiumDay.value = data.vip_time
  articles.value = data.news
  forum.value = data.forum
}
</script>
