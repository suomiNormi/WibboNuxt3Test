<template>
  <div class="w-full h-full text-white bg-gray-900">
    <div class="flex flex-col items-center justify-center h-full gap-4 text-center">
      <h3 class="text-xl font-bold">
        {{ $t('error.title') }}
      </h3>
      <img src="~/assets/imgs/teaser_frank_looking.png" class="ml-[35px]">
      <div>
        <span class="text-lg">{{ $t('error.content') }}</span>
        <BaseButton primary @click="handleError">
          {{ $t('error.link') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'error'
})

defineProps({
  error: { type: Object, required: true }
})

const handleError = () => clearError({ redirect: '/' })
</script>
