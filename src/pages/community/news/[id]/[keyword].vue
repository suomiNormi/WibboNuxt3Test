<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="body" class="col-span-1 lg:col-span-3 lg:order-2">
    <BaseCard>
      <template #body>
        <div class="article-body">
          <div class="article-header" :style="`background-image: url(${body.topstory_image})`">
            <BaseAvatar :figure="body.look" action="wav" class="article-header__avatar" />
            <h1 class="article-header__title">
              {{ body.title }}
            </h1>
            <div class="article-header__about">
              Publié par
              <NuxtLink :to="'/profil/' + body.username" class="article-header__link">
                {{ body.username }}
              </NuxtLink> - le {{ filters.formatDate(body.timestamp) }}
            </div>
          </div>

          <span class="article-body__snippet">{{ body.snippet }}</span>
          <span id="article-content" v-html="body.body" />
          <span class="article-body__author">- {{ body.author }}</span>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
import type { Article } from '~/types'
import * as filters from '~/utils/filters'

const route = useRoute()

definePageMeta({
  middleware: ({ params }) => {
    if (!/^\d+$/.test(params.id.toString())) { abortNavigation() }
  }
})

const body = ref<Article | null>(null)

try {
  const data = await useApiFetch<{ body: Article }>('/api/v1/community/news/' + route.params.id)

  body.value = data.body
} catch {}

useHead({
  title: body.value?.title
})

onMounted(() => {
  const articleContent = document.getElementById('article-content')

  if (!articleContent) { return }

  const links = articleContent.getElementsByTagName('a')

  if (links) {
    for (let i = 0; i < links.length; i++) {
      const link = links[i]

      link.target = '_blank'
    }
  }

  const spans = articleContent.getElementsByTagName('span')

  if (spans) {
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i]

      if (span.style.color === 'rgb(0, 0, 0)') { span.style.color = '#FFF' }
    }
  }
})
</script>

<style lang="scss">
.article-body {
    &__dated {
        color: #959699;
        display: block;
        font-weight: 500;
        font-size: 0.9rem;
    }

    &__snippet {
        color: #c0c0c0;
        padding: 5px 0;
        display: block;
        font-weight: bold;
        font-size: 0.9rem;
    }

    &__author {
        padding: 5px 0;
        font-weight: bold;
        font-size: 0.9rem;
    }
}

.article-header {
    position: relative;
    background-position: center;
    color: #fff;
    border-radius: 5px;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
    background-size: cover;
    padding: 20px;
    padding-left: 82px;
    text-align: center;

    &__link {
        color: #fff;

        &:hover {
            color: rgba(255, 255, 255, 0.75);
        }
    }

    &__avatar {
        position: absolute;
        left: 25px;
        bottom: -10px;
        width: 64px;
        height: 110px;
        z-index: 2;
        filter: drop-shadow(2px 1px 0 #fff) drop-shadow(-2px 1px 0 #fff) drop-shadow(0 -2px 0 #fff);
    }

    &__title {
        font-size: 1.8rem;
        text-transform: uppercase;
    }

    &__about {
        font-size: 1.1rem;
    }
}
</style>
