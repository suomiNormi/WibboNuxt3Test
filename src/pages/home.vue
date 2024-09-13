<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <div class="col-span-1 lg:col-span-3">
      <NuxtLink v-if="authUser.mail == ''" to="/settings/email">
        <BaseAlert is-error>
          {{ $t('home.warning-email') }}
        </BaseAlert>
      </NuxtLink>
    </div>
    <div class="col-span-1 lg:col-span-2">
      <BaseCard class="mb-4">
        <template #body>
          <div class="flex flex-row justify-between gap-2">
            <div class="relative w-48 h-auto flex-0">
              <BaseAvatar
                :figure="authUser.look"
                size="l"
                :head-irection="3"
                class="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[128px] h-[220px]"
                alt="Wibbo avatar"
              />
            </div>

            <div class="flex items-center w-full px-4 py-2 break-words">
              <div>
                <h1 class="text-3xl font-bold">
                  {{ authUser.username }}
                </h1>
                <i>{{ authUser.motto || 'Aucune mission' }}</i>
              </div>
            </div>

            <div class="flex items-center self-end w-full px-4 py-2 break-words">
                <BaseButton :to="'/hotel'">{{ $t('header.link-hotel') }} <i class="fas fa-sign-in-alt" /></BaseButton>
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
          <NuxtLink v-for="post in forum" :key="post.id" class="flex items-center py-2 even:bg-black even:bg-opacity-10 hover:bg-gray-800" :to="'/forum/sujet/' + post.id">
            <BaseAvatar :figure="post.look" square />

            <div class="flex flex-col justify-center w-full ml-4">
              <h1 class="text-base font-bold">
                {{ post.title }}
              </h1>
              <div class="text-sm">
                {{ $t('home.forum-last-message-1') }}
                <b>{{ post.lastpost_author }}</b>
                {{ $t('home.forum-last-message-2') }} {{ filters.timeAgo(post.lastpost_date) }}
              </div>
            </div>
          </NuxtLink>
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

const data = await useApiFetch<{ vip_time: number; news: Article[]; forum: Forum[] }>('me')

if (data) {
  premiumDay.value = data.vip_time
  articles.value = data.news
  forum.value = data.forum
}
</script>
