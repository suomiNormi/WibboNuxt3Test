<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Top Win-wins
        </template>

        <template #body>
          <BasePodium name="Win-wins" :top-user="winwin" score="achievement_score" />

          <table class="w-full text-center table-auto">
            <tbody>
              <tr v-for="(data, index) in winwinLast" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
                <th class="align-middle">
                  {{ index + 4 }}
                </th>
                <td>
                  <BaseAvatar
                    class="mx-auto"
                    :figure="data.look"
                    :direction="2"
                    :head_direction="3"
                    gesture="sml"
                    square
                  />
                </td>
                <td class="align-middle">
                  <NuxtLink :to="'/profil/' + data.username" class="top__link">
                    {{ data.username }}
                  </NuxtLink>
                </td>
                <td class="align-middle">
                  {{ filters.formatNumber(data.achievement_score!) }} Win-wins
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Top LimitCoins
        </template>

        <template #body>
          <BasePodium name="LTC" :top-user="ltc" score="limit_coins" />

          <table class="w-full text-center table-auto">
            <tbody>
              <tr v-for="(data, index) in ltcLast" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
                <th class="align-middle">
                  {{ index + 4 }}
                </th>
                <td>
                  <BaseAvatar
                    class="mx-auto"
                    :figure="data.look"
                    :direction="2"
                    :head_direction="3"
                    gesture="sml"
                    square
                  />
                </td>
                <td class="align-middle">
                  <NuxtLink :to="'/profil/' + data.username" class="top__link">
                    {{ data.username }}
                  </NuxtLink>
                </td>
                <td class="align-middle">
                  {{ filters.formatNumber(data.limit_coins) }} LimitCoins
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Top WibboPoints
        </template>

        <template #body>
          <BasePodium name="WibboPoints" :top-user="wibbopoint" score="vip_points" />

          <table class="w-full text-center table-auto">
            <tbody>
              <tr v-for="(data, index) in wibbopointLast" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
                <th class="align-middle">
                  {{ index + 4 }}
                </th>
                <td>
                  <BaseAvatar
                    class="mx-auto"
                    :figure="data.look"
                    :direction="2"
                    :head_direction="3"
                    gesture="sml"
                    square
                  />
                </td>
                <td class="align-middle">
                  <NuxtLink :to="'/profil/' + data.username" class="top__link">
                    {{ data.username }}
                  </NuxtLink>
                </td>
                <td class="align-middle">
                  {{ filters.formatNumber(data.vip_points) }} WibboPoints
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  title: 'ranking-wealth'
})

const winwin = ref<User[]>([])
const wibbopoint = ref<User[]>([])
const ltc = ref<User[]>([])

try {
  const data = await useApiFetch<{ winwin: User[]; wibbopoint: User[]; ltc: User[] }>('/api/v1/classement/joueur')

  winwin.value = data.winwin
  wibbopoint.value = data.wibbopoint
  ltc.value = data.ltc
} catch {}

const winwinLast = computed(() => winwin.value.slice(3, winwin.value.length))
const wibbopointLast = computed(() => wibbopoint.value.slice(3, wibbopoint.value.length))
const ltcLast = computed(() => ltc.value.slice(3, ltc.value.length))
</script>
