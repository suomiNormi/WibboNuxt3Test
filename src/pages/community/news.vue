<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
    <NuxtPage />

    <div class="col-span-1 lg:order-1">
      <BaseCard>
        <template #title>
          Les derniers articles
        </template>

        <template #body>
          <ul class="mx-auto article-nav">
            <li v-for="data in lastNews" :key="data.id" class="article-nav__item">
              <NuxtLink :to="'/community/news/' + data.id + '/' + data.link_keyword" class="article-nav__link">
                <div class="rounded shadow-inner article-nav__framed">
                  <img :src="data.topstory_image" :alt="data.snippet" class="article-nav__img">
                </div>
                <h5 class="article-nav__title">
                  {{ data.title }}
                </h5>

                <div class="article-nav__time">
                  Publié il y a {{ filters.timeAgo(data.timestamp) }}
                </div>
              </NuxtLink>
            </li>
          </ul>

          <NuxtLink :to="'/community/news-list'">
            Plus d'infos »
          </NuxtLink>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Article } from '~/types'
import * as filters from '~/utils/filters'

const route = useRoute()

const lastNews = ref<Article[]>([])

try {
  const data = await useApiFetch<{ lastNews: Article[] }>('/api/v1/community/news-last')

  lastNews.value = data.lastNews
} catch {}

onMounted(() => {
  if (!route.params.id || !/^\d+$/.test(route.params.id.toString()) || !route.params.keyword) {
    const lastNew = lastNews.value[0]

    navigateTo(`/community/news/${lastNew.id}/${lastNew.link_keyword}`)
  }
})
</script>

<style lang="scss">
.article-nav {
    max-width: 350px;
    // margin: 5px;
    padding: 0;
    font-weight: 500;

    &__link {
        color: #fff;
        &:hover {
            color: #fff;
        }
    }

    &__title {
        position: absolute;
        top: 0;
        left: 0;

        padding: 5px;

        &:hover {
            color: rgba(255, 255, 255, 0.75);
        }
    }

    &__time {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        text-align: right;
        font-size: 0.9rem;

        padding: 2px 5px;

        background-color: rgba(0, 0, 0, 0.4);
    }

    &__item {
        margin: 0;
        list-style: none;

        position: relative;
        width: 100%;
        height: 98px;
        margin-bottom: 5px;
    }

    &__framed {
        position: relative;

        height: 98px;
        overflow: hidden;
    }

    &__img {
        max-width: 100%;
        height: auto;
    }
}
</style>
