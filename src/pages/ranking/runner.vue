<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Top {{ topUser.length }} Runner du mois
        </template>

        <template #body>
          <span v-if="topUser.length > 0">
            <BasePodium name="fois" :top-user="topUser" score="run_points_month" />

            <table class="w-full text-center table-auto">
              <tbody>
                <tr v-for="(data, index) in topLast" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
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
                    <NuxtLink :to="'/profil/' + data.username" class="top__link">{{ data.username }}</NuxtLink>
                  </td>
                  <td class="align-middle">{{ data.run_points_month }} fois</td>
                </tr>
              </tbody>
            </table>
          </span>

          <BaseAlert v-else is-error>
            Aucun joueur pour l'instant
          </BaseAlert>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="mb-4">
        <template #title>
          Info
        </template>

        <template #body>
          <img src="~/assets/imgs/podium/wibbo_top_or.png" class="float-right">
          Vous pourrez rejoindre ce TOP en terminant le Movie Run.<br>
          Vous devrez parcourir les 32 salles d'un niveau débutant à un niveau expert...<br>
          <br>
          Les trois premiers remporteront des récompenses. <i>(le classement se remettra à zero à chaque début de mois)</i><br><br>
          <b>1</b> - 20 LTC, 5000 Win-win et un trophée Or<br><br>
          <b>2</b> - 10 LTC, 2500 Win-win et un trophée Argent<br><br>
          <b>3</b> - 50 WibboPoints, 1000 Win-win et un trophée Bronze<br>

          <div v-if="isConnected">
            <br>
            Ton score du mois: {{ authUser.run_points_month }} fois<br>
            Ton record: {{ authUser.run_points }} fois
          </div>
        </template>
      </BaseCard>

      <BaseCard>
        <template #title>
          TOP {{ best.length }} Record Runner
        </template>
        <template #body>
          <table class="w-full text-center table-auto">
            <tbody>
              <tr v-for="(data, index) in best" :key="data.id" class="odd:bg-black odd:bg-opacity-10">
                <th class="align-middle">
                  {{ index + 1 }}
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
                  {{ filters.formatNumber(data.run_points!) }} fois
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
  title: 'ranking-runner'
})

const authUser = useAuthUser()

const topUser = ref<User[]>([])
const best = ref<User[]>([])

try {
  const data = await useApiFetch<{ top: User[]; best: User[] }>('classement/run')

  topUser.value = data.top as User[]
  best.value = data.best as User[]
} catch {}

const topLast = computed(() => topUser.value.slice(3, topUser.value.length))
const isConnected = computed(() => authUser.value.id !== -1)
</script>
