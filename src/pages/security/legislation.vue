<template>
  <div class="grid grid-cols-1 gap-1">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Législation appliqué sur Wibbo Hôtel !
        </template>
        <template #body>
          Les présentes conditions d'utilisation du service et politique de confidentialité sont régies par la législation de la République Française et du Royaume de Belgique.
        </template>
      </BaseCard>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <BaseCard>
        <template #body>
          <h4><b>Législation de la République Française</b></h4>
        </template>
      </BaseCard>
      <BaseCard>
        <template #body>
          <h4><b>Législation du Royaume de Belgique</b></h4>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'legislation'
})
</script>
