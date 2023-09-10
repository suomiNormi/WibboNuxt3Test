<template>
  <BaseCard>
    <template #title>
      Créer un sujet
    </template>

    <template #body>
      <form class="grid grid-cols-1 gap-3" @submit.prevent="createPost">
        <div class="col-span-1">
          <label for="sujetInput" class="block mb-2 font-bold">Sujet</label>
          <BaseInput id="sujetInput" v-model="createForm.sujet" placeholder="Ton sujet" name="topicName" />
        </div>

        <div class="col-span-1">
          <label class="block mb-2 font-bold">Categorie</label>
          <BaseSelect v-model="createForm.category" :options="navCategoryObject" />
        </div>

        <div class="col-span-1">
          <label for="bbcode-textarea" class="block mb-2 font-bold">Message</label>
          <BaseInputBbCode v-model="createForm.message" />
        </div>

        <div class="col-span-1">
          <BaseButton :to="'/forum/category/0'" red min>
            Annuler
          </BaseButton>
          <BaseButton min class="float-right" :loading="loading">
            Publier
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseCard>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['authenticated'],
  title: 'forum-create'
})

const authUser = useAuthUser()

const loading = ref(false)
const createForm = ref({ sujet: '', category: '4', message: '' })
const navCategory = ref([
  { id: 0, name: 'Tout', denyCreate: true },
  { id: 1, name: 'Tutoriel' },
  { id: 2, name: 'Graphisme' },
  { id: 3, name: 'Aide' },
  { id: 4, name: 'Discussion' },
  { id: 6, name: 'Idée & bug' },
  { id: 7, name: 'Jeux' }
])

if (authUser.value.rank >= 8) {
  navCategory.value.push({ id: 8, name: 'Information' })
}

const navCategoryObject = computed(() =>
  navCategory.value
    .filter(x => !x.denyCreate)
    .reduce((r: Record<string, string>, e) => {
      r[e.id] = e.name
      return r
    }, {})
)

const createPost = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    const response = await useApiFetch<{ id: number }>('/api/v1/forum/create', { body: createForm.value, method: 'POST' })

    navigateTo('/forum/sujet/' + response.id)

    createForm.value = { sujet: '', category: '4', message: '' }
  } catch {}

  loading.value = false
}
</script>
