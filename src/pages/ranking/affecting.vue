<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Top Respects
        </template>
        <template #body>
          <BasePodium name="Respects" :top-user="respects" score="respect" />

          <table class="w-full text-center table-auto">
            <tbody>
              <tr v-for="(data, index) in respectsLast" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
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
                  {{ filters.formatNumber(data.respect!) }} Respects
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
          Top Connexions
        </template>
        <template #body>
          <BasePodium name="Heures" :top-user="connexions" score="online_time" />

          <table class="w-full text-center table-auto">
            <tbody>
              <tr v-for="(data, index) in connexionsLast" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
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
                  {{ filters.formatNumber(Math.round(data.online_time! / 3600)) }} Heures
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
          Top Premium
        </template>

        <template #body>
          <BasePodium name="Mois" :top-user="moisvip" score="mois_vip" />

          <table class="w-full text-center table-auto">
            <tbody>
              <tr v-for="(data, index) in moisvipLast" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
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
                  {{ data.mois_vip }} Mois
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
  title: 'ranking-influences'
})

const respects = ref<User[]>([])
const connexions = ref<User[]>([])
const moisvip = ref<User[]>([])

try {
  const data = await useApiFetch('/api/v1/classement/influences')

  const connexionData = data.connexions as User[]

  respects.value = data.respects as User[]
  connexions.value = connexionData
  moisvip.value = data.moisvip as User[]
} catch {}

const respectsLast = computed(() => respects.value.slice(3, respects.value.length))
const connexionsLast = computed(() => connexions.value.slice(3, connexions.value.length))
const moisvipLast = computed(() => moisvip.value.slice(3, moisvip.value.length))
</script>
