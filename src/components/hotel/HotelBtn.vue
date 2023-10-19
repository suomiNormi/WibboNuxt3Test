<template>
  <div class="absolute top-2 left-1">
    <div class="p-1 bg-gray-800 border rounded-md cursor-pointer hover:bg-gray-700 border-gray-950" @click="hasHistory() ? navigateTo(lastRouteName) : navigateTo('/home')">
      <div class="navbar-icon navbar-icon--home !top-[2px]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const lastRouteName = ref('')

const route = useRoute()

watch(
  () => route.name,
  (name) => {
    if (!name) { return }

    if (name.toString().startsWith('hotel')) { return }

    lastRouteName.value = route.path
  }
)

const hasHistory = () => lastRouteName.value !== ''
</script>
