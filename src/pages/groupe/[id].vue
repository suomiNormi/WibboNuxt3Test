<template>
  <div v-if="group" class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1 md:col-start-2">
      <BaseCard>
        <template #title>
          {{ group.name }}
        </template>

        <template #body>
          <div class="info-group__info">
            <div><i class="fas fa-calendar-alt" /> Crée le {{ filters.formatDate(group.created) }}</div>
            <div><i class="fas fa-users" /> {{ memberCount }} membre{{ memberCount > 1 ? 's' : '' }}</div>
          </div>

          <div class="info-group__desc">
            <span>{{ group.desc || 'Aucune description' }}</span>
            <img :src="$nuxt.$config.public.cdnUrl + '/habbo-imaging/badge/' + group.badge + '.gif'" alt="Wibbo groupe image">
          </div>

          <div class="info-group__owner">
            <BaseAvatar :figure="owner.look" headonly />
            <NuxtLink :to="'/profil/' + owner.username">
              {{ owner.username }}
            </NuxtLink>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Group, Owner } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  middleware: ({ params }) => {
    if (!/^\d+$/.test(params.id.toString())) { abortNavigation() }
  }
})

const route = useRoute()

const group = ref<Group>()
const memberCount = ref(0)
const owner = ref<Owner>({ username: '', look: '' })

const data = await useApiFetch<{ group: Group; memberCount: number; owner: Owner }>('/api/v1/group/' + route.params.id)

group.value = data.group
memberCount.value = data.memberCount
owner.value = data.owner

useHead({
  title: group.value.name
})
</script>

<style lang="scss">
.info-group {
    &__info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px 0;
        min-height: 50px;

        padding: 5px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        word-break: break-word;
    }

    &__owner {
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);
    }
}
</style>
