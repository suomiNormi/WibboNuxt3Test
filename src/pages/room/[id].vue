<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1 md:col-start-2">
      <BaseCard>
        <template #title>
          Rejoindre un appartement
        </template>

        <template #body>
          <b>Nom:</b> {{ room.caption || 'Aucun titre' }}<br>
          <b>Propriétaire:</b>
          <NuxtLink :to="'/profil/' + room.owner">
            {{ room.owner }}
          </NuxtLink><br>
          <b>Description:</b>
          {{ room.description || 'Aucune description' }}
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Room } from '~/types'

definePageMeta({
  middleware: ({ params }) => {
    if (!/^\d+$/.test(params.id.toString())) { abortNavigation() }
  }
})

const route = useRoute()

const room = ref<Room>({ caption: '', owner: '', description: '' })

try {
  const data = await useApiFetch<{ room: Room }>('room/' + route.params.id)

  room.value = data.room
} catch {}

useHead({
  title: room.value.caption
})
</script>
