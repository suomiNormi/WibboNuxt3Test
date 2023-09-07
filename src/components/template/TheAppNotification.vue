<template>
  <transition name="fade-in-right" mode="out-in">
    <div v-if="alert" :key="triggerTransition ? 'true' : 'false'" class="p-2 webnotif-alert">
      <h4 class="px-2 text-xl font-bold text-center text-white">
        <span>{{ alert.type == 'error' ? 'Erreur' : alert.type == 'warning' ? 'Attention' : 'Confirmation' }}</span>
        <i class="absolute cursor-pointer top-2 right-2 fas fa-times" @click="hideAlert" />
      </h4>

      <div class="flex items-center justify-center py-2 overflow-x-scroll">
        <div class="flex-wrap px-4 text-2xl">
          <i
            class="fas animate-pulse"
            :class="{
              'fa-times': alert.type == 'error',
              'fa-exclamation': alert.type == 'warning' || alert.type == 'confirm',
              'fa-check': alert.type == 'success',
            }"
          />
        </div>

        <div class="break-words">
          {{ alert.translate ? t(alert.message, alert.params ?? []) : alert.message }}
        </div>
      </div>

      <div v-if="alert.type == 'confirm'" class="flex flex-row justify-between p-2">
        <BaseButton min @click="confirmAlert()">
          Confirmer
        </BaseButton>
        <BaseButton min red @click="hideAlert()">
          Annuler
        </BaseButton>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { hideAlert } = useNotification()
const alert = useNotificationAlert()

const triggerTransition = ref(true)

const confirmAlert = () => {
  if (alert.value?.callback) {
    try {
      alert.value?.callback()
    } catch (e) { }
  }
}
</script>

<style lang="scss">
.webnotif-alert {
    @apply fixed w-auto h-auto rounded-lg;

    bottom: 5%;
    right: 10px;
    z-index: 99999;
    background-color: var(--primary-color);
    width: 250px;
    border: 1px solid rgba(105, 105, 105, 0.15);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15), -2px -2px 0 rgba(0, 0, 0, 0.15);
}
</style>
