<template>
  <img :src="$nuxt.$config.public.assetsUrl + '/c_images/album1584/' + badgeId + '.gif'">
</template>

<script lang="ts" setup>
defineProps({
  badgeId: { type: String, default: '' }
})
</script>
