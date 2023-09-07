<template>
  <img :src="runtimeConfig.public.assetsUrl + '/c_images/album1584/' + badgeId + '.gif'">
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
defineProps({
  badgeId: { type: String, default: '' }
})
</script>
