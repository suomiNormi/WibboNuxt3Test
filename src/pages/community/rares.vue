<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="col-span-full">
      <h2 class="uppercase">
        Wibbo Rares lootbox 2022
      </h2>
    </div>
    <div class="col-span-full">
      <BaseButton
        v-for="index in [4, 3, 2, 1]"
        :key="index"
        class="mr-1"
        min
        primary
        @click="categorySelected = index"
      >
        <div class="flex gap-1">
          <div class="rarity-icons" :class="imageCategory(index)" />
          {{ nameCategory(index) }}
        </div>
      </BaseButton>
    </div>
    <Transition name="fade-in" :mode="'out-in'">
      <div :key="categorySelected" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div v-for="rare in raresOrder" :key="rare.id" class="col-span-1">
          <BaseCard class="mb-2">
            <template #title>
              {{ nameCategory(rare.rarity_level) }}
            </template>
            <template #body>
              <div class="relative w-auto h-48 overflow-hidden bg-gray-800 rounded case">
                <img :src="'https://cdn.wibbo.org/furni/' + rare.catalog_name + '.png'" class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <div class="absolute rarity-icons top-1 left-1" :class="imageCategory(rare.rarity_level)" />
                <div class="absolute p-2 bg-black rounded bottom-1 right-1 bg-opacity-60">
                  Quantités: {{ rare.amount }}
                </div>
                <div class="absolute flex gap-1 p-2 bg-black rounded top-1 right-1 bg-opacity-60">
                  <div class="wibbopoints-icon" />
                  {{ filters.formatNumber(priceRare(rare)) }}
                </div>
              </div>
            </template>
          </BaseCard>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { Rare } from '~/types'
import * as filters from '~/utils/filters'

definePageMeta({
  title: 'rares'
})

const rares = ref<Rare[]>([])
const categorySelected = ref(1)

try {
  const data = await useApiFetch<{ rares: Rare[] }>('/api/v1/rares')

  rares.value = data.rares
} catch {}

const raresOrder = computed(() => rares.value.filter(x => x.rarity_level === categorySelected.value).sort((a: Rare, b: Rare) => (a.amount > b.amount ? 1 : -1)))

const priceRare = (rare: Rare) => {
  let price = 0

  switch (rare.rarity_level) {
    case 1:
      price = 1
      break
    case 2:
      price = 50
      break
    case 3:
      price = 500
      break
    case 4:
      price = 5000
      break
  }
  return price <= 0 ? 1 : price
}

const nameCategory = (rarityLevel: number) => {
  switch (rarityLevel) {
    case 1:
      return 'Basique'
    case 2:
      return 'Commun'
    case 3:
      return 'Épique'
    case 4:
      return 'Légendaires'
  }

  return 'rare'
}

const imageCategory = (rarityLevel: number) => {
  switch (rarityLevel) {
    case 1:
      return 'basic'
    case 2:
      return 'commun'
    case 3:
      return 'epic'
    case 4:
      return 'legendary'
  }

  return 'rare'
}
</script>

<style lang="scss">
.case {
    background-image: url(~/assets/imgs/rares/case.png);
    background-repeat: repeat;
}

.wibbopoints-icon {
    width: 20px;
    height: 20px;
    background-image: url(~/assets/imgs/icons/wibbopoints.png);
}

.rarity-icons {
    width: 20px;
    height: 20px;

    &.basic {
        background-image: url(~/assets/imgs/rares/rare-basic.png);
    }

    &.commun {
        background-image: url(~/assets/imgs/rares/rare-commun.png);
    }

    &.epic {
        background-image: url(~/assets/imgs/rares/rare-epic.png);
    }

    &.legendary {
        background-image: url(~/assets/imgs/rares/rare-legendary.png);
    }
}
</style>
