<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="sujet">
    <div class="flex justify-between">
      <h4 class="py-2 ml-2">
        <i v-if="sujet.statut == 1" class="text-red-700 fas fa-times" />
        {{ sujet.title }}
      </h4>

      <span>
        <BaseButton :to="'/forum/category/' + sujet.categorie" red min class="mr-2 float-start">Retour</BaseButton>
        <BaseButton v-if="isConnected && sujet.statut == 0" min class="mr-2" @click="scrollBottom">Répondre</BaseButton>
      </span>
    </div>

    <div v-if="isConnected && authUser.rank >= 6" class="forum__staff-options">
      <BaseSelect v-model="categoryForm.category" class="!w-auto inline-block mr-2 cursor-pointer" :options="navCategoryObject" @change="updateCategory" />

      <span class="mr-2 cursor-pointer" @click.prevent="statutToggle">
        <i class="fas fa-times-circle" />
        {{ sujet.statut == 0 ? 'Clôturer le sujet' : 'Ouvrir le sujet' }} &raquo;
      </span>
      <span class="mr-2 cursor-pointer" @click.prevent="epingleToggle">
        <i class="fas fa-thumbtack" />
        {{ sujet.type == 1 ? 'Épingler le sujet' : 'Désépingler' }} &raquo;
      </span>
    </div>

    <BaseCard>
      <template #body>
        <table class="w-full text-left table-auto">
          <tbody>
            <tr v-for="userd in userMessage" :key="userd.id" class="even:bg-black even:bg-opacity-10">
              <td class="hidden pb-2 align-top sm:table-cell" style="width: 150px">
                <div class="forum__avatar-framed">
                  <BaseAvatar
                    :figure="userd.look"
                    :head_direction="3"
                    gesture="sml"
                    size="l"
                    :alt="'Avatar ' + userd.username"
                    class="forum__avatar-img"
                  />
                  <div v-if="userd.rank >= 2" class="forum__badge">
                    <BaseBadgeImg v-if="userd.rank == 4" badge-id="wibbo.helpeur" alt="Wibbo badge helpeur" />
                    <BaseBadgeImg v-if="userd.rank > 4" badge-id="ADM" alt="Wibbo badge ADM" />
                  </div>
                </div>
              </td>

              <td class="p-2 align-top">
                <NuxtLink :to="'/profil/' + userd.username" class="ml-2 forum__username font-weight-bold">
                  {{ userd.username }}
                </NuxtLink>

                <b class="text-nowrap">
                  <span v-if="sujet.main_post != userd.id">RE:</span>
                  {{ sujet.title }}
                </b>

                <div v-if="isConnected" class="float-right">
                  <a v-if="sujet.statut == 0" class="forum__btn forum__btn--dark" @click.prevent="commentForm.message += '[quote]' + userd.message + '[/quote]'">
                    <i class="fas fa-quote-right" />
                  </a>

                  <span v-if="authUser.id == userd.id_auteur || authUser.rank >= 6">
                    <a class="forum__btn forum__btn--green" @click.prevent="editMessage(userd)">
                      <i class="fas fa-edit" />
                    </a>
                    <a class="forum__btn forum__btn--red" @click.prevent="deleteComment(userd.id)">
                      <i class="fas fa-trash-alt" />
                    </a>
                  </span>
                </div>

                <div>
                  <small class="text-xs text-gray-400">{{ filters.formatDateComplet(userd.date) }}</small>
                </div>

                <div v-if="editId != userd.id" style="white-space: pre-line; word-break: break-word" v-html="filters.bbcode(userd.message)" />
                <form v-else @submit.prevent="editComment">
                  <BaseInputBbCode v-model="editForm.message" />
                  <BaseButton min class="float-right" :loading="loading">
                    Enregistrer
                  </BaseButton>
                  <BaseButton red min @click="editId = 0">
                    Annuler
                  </BaseButton>
                </form>
              </td>
            </tr>
          </tbody>
        </table>

        <hr>

        <form v-if="isConnected && sujet.statut == 0" class="my-2" @submit.prevent="commentSujet">
          <BaseInputBbCode v-model="commentForm.message" />

          <div class="text-right">
            <BaseButton class="my-auto" :loading="loading" min>
              Publier
            </BaseButton>
          </div>
        </form>

        <BasePagination :number-of-pages="totalPage" class="float-right" />
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
import type { ICategory, IMessage, Sujet } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  middleware: ({ params }) => {
    if (!/^\d+$/.test(params.id.toString())) { abortNavigation() }
  }
})

const route = useRoute()
const authUser = useAuthUser()
const { showAlert } = useNotification()

const sujet = ref<Sujet | null>(null)
const userMessage = ref<IMessage[]>([])
const totalPage = ref(1)

const editId = ref(0)
const editForm = ref({ message: '' })
const commentForm = ref({ message: '' })
const categoryForm = ref({ category: 0 })

const loading = ref(false)

const navCategory = ref<ICategory[]>([
  { id: 0, name: 'Tout', denyCreate: true },
  { id: 4, name: 'Discussion' },
  { id: 1, name: 'Tutoriel' },
  { id: 2, name: 'Graphisme' },
  { id: 3, name: 'Aide' },
  { id: 6, name: 'Idée & bug' },
  { id: 7, name: 'Jeux' }
])

const refresh = async () => {
  try {
    const page = route.query.page ? '?page=' + route.query.page : ''
    const data = await useApiFetch<{ totalPage: number; sujet: Sujet; userMessage: IMessage[] }>('/api/v1/forum/sujet/' + route.params.id + page)

    totalPage.value = data.totalPage
    sujet.value = data.sujet
    userMessage.value = data.userMessage
  } catch (e) {
    showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
}

const editMessage = (userd: IMessage) => {
  editForm.value.message = userd.message
  editId.value = userd.id
}

watch(
  () => route.query.page,
  async () => await refresh(),
  { immediate: true }
)

useHead({
  title: sujet.value?.title
})

const navCategoryObject = computed(() =>
  navCategory.value.reduce((r: Record<string, string>, e) => {
    r[e.id] = e.name
    return r
  }, {})
)

onMounted(() => (categoryForm.value.category = sujet.value?.categorie ?? 0))

const scrollBottom = () => {
  const appElement = document.getElementById('app')

  appElement?.scrollTo({ top: appElement.scrollHeight, behavior: 'smooth' })
}

const editComment = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    await useApiFetch('/api/v1/forum/edit/' + editId, { body: editForm.value, method: 'POST' })

    const editMessage = userMessage.value.filter(m => m.id === editId.value)[0]

    if (editMessage) { editMessage.message = editForm.value.message }

    showAlert({
      message: 'Commentaire édité',
      type: 'success'
    })

    editId.value = 0

    editForm.value.message = ''
  } catch (e) { }

  loading.value = false
}

const commentSujet = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    const response = await useApiFetch('/api/v1/forum/comment/' + route.params.id, { body: commentForm.value, method: 'POST' })

    if (!response) { throw new Error('Commentaire non envoyé') }

    const pageId = route.query.page ? parseInt(route.query.page.toString()) : 1

    if (totalPage.value === pageId) { userMessage.value.push(response.post as IMessage) } else { navigateTo({ query: { page: totalPage.value.toString() } }) }

    commentForm.value.message = ''
  } catch (e) { }

  loading.value = false
}

const updateCategory = async () => {
  if (loading.value || !sujet.value) { return }

  try {
    loading.value = true

    await useApiFetch('/api/v1/forum/deplace/' + route.params.id, { body: categoryForm.value, method: 'PUT' })

    showAlert({
      message: 'Sujet déplacé',
      type: 'success'
    })

    sujet.value.categorie = categoryForm.value.category
  } catch (e) { }

  loading.value = false
}

const deleteComment = async (id: number) => {
  if (loading.value || !sujet.value) { return }

  try {
    loading.value = true

    await useApiFetch('/api/v1/forum/delete/' + id, { method: 'DELETE' })

    showAlert({
      message: 'Commentaire supprimé',
      type: 'success'
    })

    if (sujet.value.main_post === id) { navigateTo('/forum/category/0') } else { userMessage.value = userMessage.value.filter(u => u.id !== id) }
  } catch (e) { }

  loading.value = false
}

const epingleToggle = async () => {
  if (loading.value || !sujet.value) { return }

  try {
    loading.value = true

    const flag = sujet.value.type === 1

    await useApiFetch('/api/v1/forum/epingle/' + sujet.value.id + '/' + flag, { method: 'PUT' })

    showAlert({
      message: 'Sujet ' + (flag ? 'épinglé' : 'dé-épinglé'),
      type: 'success'
    })

    sujet.value.type = flag ? 2 : 1
  } catch (e) { }

  loading.value = false
}

const statutToggle = async () => {
  if (loading.value || !sujet.value) { return }

  try {
    loading.value = true

    const flag = sujet.value.statut === 1

    await useApiFetch('/api/v1/forum/statut/' + sujet.value.id + '/' + flag, { method: 'PUT' })

    showAlert({
      message: 'Sujet ' + (flag ? 'ouvert' : 'fermer'),
      type: 'success'
    })

    sujet.value.statut = flag ? 0 : 1
  } catch (e) { }

  loading.value = false
}

const isConnected = computed(() => authUser.value.id !== -1)
</script>

<style lang="scss">
.forum {
    &__title {
        line-height: 40px;
        margin-left: 8px;
    }

    &__badge {
        position: absolute;
        bottom: 10px;
        right: 10px;
        padding: 5px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        z-index: 2;
    }

    &__staff-options {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 5px;
        border-radius: 5px;
        margin: 5px 0;
    }

    &__username {
        position: relative;
        width: auto;
        height: auto;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 5px;
        border-radius: 0 5px 5px 0;
        color: #fff;

        &:hover {
            color: #fff;
        }

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            right: 100%;
            transform: translateY(-50%);
            border-width: 12px;
            border-style: solid;
            border-color: transparent rgba(0, 0, 0, 0.6) transparent transparent;
        }
    }

    &__avatar-framed {
        position: relative;
        background-color: rgba(0, 0, 0, 0.6);
        width: 150px;
        height: 150px;
        border-radius: 5px;
        overflow: hidden;
    }

    &__avatar-img {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
    }

    &__btn {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 5px;
        border: 1px solid transparent;
        cursor: pointer;

        &--dark {
            color: #383d41;
            background-color: #e2e3e5;
            border-color: #d6d8db;

            &:hover {
                color: #383d41;
            }
        }

        &--red {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;

            &:hover {
                color: #721c24;
            }
        }

        &--green {
            color: #155724;
            background-color: #d3fac7;
            border-color: #c3e6cb;

            &:hover {
                color: #155724;
            }
        }
    }
}

.bbcode-quote {
    background-color: rgba(218, 218, 218, 0.2);
    padding: 5px;
    border-radius: 3px;
    border: 1px solid rgba(185, 185, 185, 0.2);
}
</style>
