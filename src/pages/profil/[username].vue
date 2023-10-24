<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div class="col-span-1">
      <BaseCard class="mb-4">
        <template #title>
          Profile de {{ user.username }}
        </template>
        <template #body>
          <div class="profil">
            <div class="rounded profil__avatar-frame">
              <BaseAvatar :figure="user.look" gesture="sml" :direction="2" :head_direction="3" size="l" />
              <div class="profil__statut" :class="{ 'profil__statut--online': user.online === 1 }" />
            </div>

            <div class="flex flex-col">
              <div class="profil__about">
                {{ user.motto || 'Bienvenue sur Wibbo!' }}
              </div>

              <div class="flex flex-wrap justify-between">
                <div class="profil__about">
                  <i class="fas fa-coins" /> <u>{{ user.limit_coins }}</u> LimitCoins
                </div>
                <div class="profil__about">
                  <i class="fas fa-won-sign" /> <u>{{ user.vip_points }}</u> WibboPoints
                </div>
                <div class="profil__about">
                  <i class="fas fa-star" /> <u>{{ stats.achievement_score }}</u> Win-wins
                </div>
                <div class="profil__about">
                  <i class="fas fa-thumbs-up" /> <u>{{ stats.respect }}</u> Respects
                </div>
              </div>

              <div class="profil__about">
                <u>Dernière connexion :</u> Il y a {{ filters.timeAgo(user.last_offline!) }}
              </div>
              <div class="profil__about">
                <u>Créé le :</u> {{ filters.formatDate(user.account_created!) }}
              </div>
              <div class="profil__about">
                <u>Temps de connexion :</u> {{ filters.formatToHour(stats.online_time) }} heures
              </div>
            </div>
          </div>
        </template>
      </BaseCard>

      <BaseCard v-if="badgescode.length > 0">
        <template #title>
          Badges ({{ badgecount }})
        </template>

        <template #body>
          <div class="relative mb-2 badge-container">
            <BaseSpinner :loading="loading" />
            <div v-for="(badge, index) in badgescode" :key="'badge' + index" class="badge-socle">
              <BaseBadgeImg :badge-id="badge.badge_id" class="badge-img" :alt="'Badge ' + badge.badge_id" />
            </div>
          </div>

          <BasePagination :number-of-pages="totalPage" class="float-right" />
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="mb-4">
        <template #title>
          Relations
        </template>

        <template #body>
          <div class="relation">
            <div class="relation__block">
              <span v-if="randomcoeur">
                <div class="relation__list">
                  <div class="relation__icon"><i class="fas fa-heart" style="color: rgb(255, 0, 0)" /></div>
                  <div class="relation__name">
                    <NuxtLink :to="'/profil/' + randomcoeur.username" class="relation__link">{{ randomcoeur.username }}</NuxtLink>
                  </div>
                </div>

                <span v-if="countcoeur > 1" class="relation__text">Et {{ countcoeur - 1 }} autres</span>
              </span>
              <span v-else>
                <div class="relation__list">
                  <div class="relation__icon"><i class="fas fa-heart" style="color: rgb(255, 0, 0)" /></div>
                  <div class="relation__name"><u>Personne</u></div>
                </div>

                <span class="relation__text">Pas d'amis dans cette catégorie</span>
              </span>
            </div>

            <div class="relation__block">
              <span v-if="randomami">
                <div class="relation__list">
                  <div class="relation__icon"><i class="fas fa-smile-wink" style="color: rgb(255, 204, 0)" /></div>
                  <div class="relation__name">
                    <NuxtLink :to="'/profil/' + randomami.username" class="relation__link">{{ randomami.username }}</NuxtLink>
                  </div>
                </div>

                <span v-if="countami > 1" class="relation__text">Et {{ countami - 1 }} autres</span>
              </span>
              <span v-else>
                <div class="relation__list">
                  <div class="relation__icon"><i class="fas fa-smile-wink" style="color: rgb(255, 204, 0)" /></div>
                  <div class="relation__name"><u>Personne</u></div>
                </div>
                <span class="relation__text">Pas d'amis dans cette catégorie</span>
              </span>
            </div>

            <div class="relation__block">
              <span v-if="randomdead">
                <div class="relation__list">
                  <div class="relation__icon"><i class="fas fa-skull-crossbones" style="color: rgb(216, 216, 216)" /></div>
                  <div class="relation__name">
                    <NuxtLink :to="'/profil/' + randomdead.username" class="relation__link">{{ randomdead.username }}</NuxtLink>
                  </div>
                </div>
                <span v-if="countdead > 1" class="relation__text">Et {{ countdead - 1 }} autres</span>
              </span>
              <span v-else>
                <div class="relation__list">
                  <div class="relation__icon"><i class="fas fa-skull-crossbones" style="color: rgb(216, 216, 216)" /></div>
                  <div class="relation__name"><u>Personne</u></div>
                </div>
                <span class="relation__text">Pas d'amis dans cette catégorie</span>
              </span>
            </div>
          </div>
        </template>
      </BaseCard>

      <BaseCard v-if="groupe.length">
        <template #title>
          Groupes ({{ groupe.length }})
        </template>

        <template #body>
          <div class="badge-container">
            <div v-for="group in groupe" :key="group.id" class="badge-socle">
              <NuxtLink :to="'/groupe/' + group.id">
                <img :src="$nuxt.$config.public.cdnUrl + '/habbo-imaging/badge/' + group.badge + '.gif'" class="badge-img">
              </NuxtLink>
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User, UserStats, Group, Badge, Relation } from '~/types'
import * as filters from '~/utils/filters'

const route = useRoute()

const user = ref<Partial<User>>({ id: 0, username: '', look: '', motto: '', online: 0, vip_points: 0, account_created: 0, last_offline: 0 })
const stats = ref<UserStats>({ respect: 0, achievement_score: 0, online_time: 0 })
const groupe = ref<Group[]>([])
const badgecount = ref(0)
const badgescode = ref<Badge[]>([])
const nombreDePages = ref(0)
const countcoeur = ref(0)
const countami = ref(0)
const countdead = ref(0)
const randomcoeur = ref<Relation>({ username: '' })
const randomami = ref<Relation>({ username: '' })
const randomdead = ref<Relation>({ username: '' })

const totalPage = ref(1)

const loading = ref(false)

const page = route.query.page ? '?page=' + route.query.page.toString() : ''

const data = await useApiFetch<{ user: User; stats: UserStats; groupe: Group[], totalPage: number, badgecount: number, nombreDePages: number, countcoeur: number, countami: number, countdead: number, randomcoeur: Relation, randomami: Relation, randomdead: Relation }>('profil/' + route.params.username)
if (data) {
  user.value = data.user as User
  stats.value = data.stats as UserStats
  groupe.value = data.groupe as Group[]
  totalPage.value = data.totalPage as number
  badgecount.value = data.badgecount as number
  nombreDePages.value = data.nombreDePages as number
  countcoeur.value = data.countcoeur as number
  countami.value = data.countami as number
  countdead.value = data.countdead as number
  randomcoeur.value = data.randomcoeur as Relation
  randomami.value = data.randomami as Relation
  randomdead.value = data.randomdead as Relation
}

const dataTwo = await useApiFetch<{ badgescode: Badge[] }>('profil-badges/' + data.user.id + page)
if (dataTwo) {
  badgescode.value = dataTwo.badgescode
}

useHead({
  title: `Profile de ${user.value.username}`
})

watch(
  () => route.query.page,
  async (value) => {
    if (loading.value || value == null) { return }

    try {
      loading.value = true

      let pageNum = +value

      if (!pageNum || pageNum < 1) { pageNum = 1 }

      if (pageNum > totalPage.value) { pageNum = totalPage.value }

      badgescode.value = (await useApiFetch<{ badgescode: Badge[] }>('profil-badges/' + user.value.id + '?page=' + pageNum)).badgescode
    } catch {}

    loading.value = false
  }
)
</script>

<style lang="scss">
.profil {
    position: relative;

    padding-left: 128px;

    &__avatar-frame {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;

        background-color: rgba(0, 0, 0, 0.6);
        border-right: 2px solid rgba(0, 0, 0, 0.2);
        width: 128px;
        height: 100%;
        overflow: hidden;

        > img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    &__statut {
        position: absolute;
        top: 5px;
        right: 4px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        box-shadow: inset -2px -2px rgba(0, 0, 0, 0.3);

        background-color: #ff0000;

        &--online {
            background-color: #00d111;
        }
    }

    &__about {
        display: inline-block;
        // width: 100%;

        padding: 5px;
        background-color: rgba(0, 0, 0, 0.2);
        margin: 5px;
        border-radius: 5px;
    }
}

.badge-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.badge-socle {
    position: relative;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 3px;
    border: solid 2px #000;
    width: 51px;
    height: 51px;
    margin: 2px;
}

.badge-img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.relation {
    width: 200px;
    margin: 10px auto;

    &__list {
        display: flex;
        align-items: center;
        border: solid 1px #000;
        background-color: rgba(0, 0, 0, 0.4);
        line-height: 26px;
        border-radius: 3px;
        text-align: center;
        margin-top: 10px;
    }

    // &__block {

    // }

    &__icon {
        background-color: rgba(0, 0, 0, 0.2);
        width: 35px;
    }

    &__name {
        width: 100%;
        text-align: center;
    }

    &__text {
        font-size: 0.9rem;
        color: #cacaca;
        font-style: italic;
        line-height: 14px;
    }
}
</style>
