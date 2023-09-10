<template>
  <div class="client">
    <iframe
      v-if="SSOTicket != ''"
      id="flash-container"
      :src="$nuxt.$config.public.nitroUrl + '?sso=' + SSOTicket"
      width="100%"
      height="100%"
      frameborder="0"
    />

    <HotelBtn />
  </div>
</template>

<script lang="ts" setup>
import HotelBtn from './HotelBtn.vue'

import type { NitroLegacy } from '~/types'

const SSOTicket = ref('')

const loadSSOTicket = async () => {
  SSOTicket.value = (await useApiFetch<{ SSOTicket: string }>('/api/v1/client/data')).SSOTicket as string
}

loadSSOTicket()

window.addEventListener(
  'message',
  (event) => {
    try {
      const data = event.data

      if (!(typeof data === 'string')) { return }

      if (!data.startsWith('Nitro_LegacyExternalInterface')) { return }

      const nitroLegacy = JSON.parse(data.split('Nitro_LegacyExternalInterface')[1]) as NitroLegacy

      if (!nitroLegacy) { return }

      switch (nitroLegacy.method) {
        case 'disconnect': {
          setTimeout(() => loadSSOTicket(), 4500)
          break
        }
      }
    } catch (e) { }
  },
  false
)
</script>

<style lang="scss">
.client {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: var(--app-background-color);
}

#flash-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
}
</style>
