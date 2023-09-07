<template>
  <div ref="btnInstall" class="wibbo-nav__dropdown" style="display: none">
    <a class="cursor-pointer wibbo-nav__link alone"><i class="fas fa-plus" /></a>
  </div>
</template>

<script lang="ts" setup>
import type { BeforeInstallPromptEvent } from '~/types'

const btnInstall = ref<HTMLElement | null>(null)

onBeforeMount(() => {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()

    const deferredPrompt = e as BeforeInstallPromptEvent

    if (btnInstall.value) {
      btnInstall.value.style.display = 'block'

      btnInstall.value.addEventListener('click', () => {
        if (btnInstall.value) { btnInstall.value.style.display = 'none' }

        deferredPrompt.prompt()
      })
    }
  })
})
</script>
