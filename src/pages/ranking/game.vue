<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Top {{ topUser.length }} Joueurs du mois
        </template>

        <template #body>
          <span v-if="topUser.length > 0">
            <BasePodium name="Points" :top-user="topUser" score="game_points_month" />

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
                  <td class="align-middle">{{ data.game_points_month }} Points</td>
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
          À chaque fois que tu gagneras un jeu animé par un staff, tu remporteras 1 point. À la fin de chaque mois, les trois premiers remporteront des récompenses.
          <i>(le classement se remettra à zero à chaque début de mois)</i><br><br>
          <b>1</b> - 20 LTC, 5000 Win-win et un trophée Top Or<br><br>
          <b>2</b> - 10 LTC, 2500 Win-win et un trophée Top Argent<br><br>
          <b>3</b> - 50 WibboPoints, 1000 Win-win et un trophée Top Bronze
          <div v-if="isConnected">
            <br>
            Ton nombre de jeux gagné(s) ce mois-ci: {{ authUser.game_points_month }} Jeux<br>
            Ton nombre de jeux gagné(s) total: {{ authUser.game_points }} Jeux<br>
          </div>
        </template>
      </BaseCard>

      <BaseCard>
        <template #title>
          TOP {{ best.length }} joueurs de tous les temps
        </template>

        <template #body>
          <table v-if="best.length > 3" class="w-full text-center table-auto">
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
                  {{ filters.formatNumber(data.game_points!) }} Points
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
  title: 'ranking-gamer'
})

const authUser = useAuthUser()

const topUser = ref<User[]>([])
const best = ref<User[]>([])

try {
  const data = await useApiFetch<{ top: User[]; best: User[] }>('classement/gamer')

  topUser.value = data.top
  best.value = data.best
} catch {}

const topLast = computed(() => topUser.value.slice(3, 10))
const isConnected = computed(() => authUser.value.id !== -1)
</script>
