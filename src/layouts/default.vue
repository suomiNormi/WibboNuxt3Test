<template>
  <div id="app" class="app" :class="{ dark: darkMode }">
    <client-only>
      <HotelIframe v-if="clientLoader && isConnected" />
    </client-only>

    <TheAppNotification />

    <transition name="fade-slow">
      <div v-show="!isClientRoute" id="web" class="web">
        <TheHeaderCloud />
        <TheNavbar @toggle-theme="toggleTheme" />

        <div class="container p-4 main">
          <slot />
        </div>

        <TheFooter />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import TheFooter from '../components/template/TheFooter.vue'
import TheHeaderCloud from '../components/template/TheHeaderCloud.vue'
import TheAppNotification from '../components/template/TheAppNotification.vue'
import TheNavbar from '../components/template/TheNavbar.vue'
import HotelIframe from '../components/hotel/HotelIframe.vue'

const route = useRoute()
const authUser = useAuthUser()

const clientLoader = ref(false)
const darkMode = ref(true)

watch(
  () => route.name,
  (name) => {
    if (!name) { return }

    if (name.toString().startsWith('hotel')) { clientLoader.value = true }
  },
  { immediate: true }
)

const toggleTheme = () => {
  if (darkMode.value) {
    localStorage.theme = 'light'
    darkMode.value = false
  } else {
    localStorage.theme = 'dark'
    darkMode.value = true
  }
}

onMounted(() => {
  const el = document.getElementById('web')

  if (!el) { return }

  el.addEventListener('click', documentClick)
})

onBeforeUnmount(() => {
  const el = document.getElementById('web')

  if (!el) { return }

  el.removeEventListener('click', documentClick)
})

const documentClick = (event: MouseEvent) => {
  if (isClientRoute.value || !clientLoader.value) { return }

  const el = document.getElementById('web')

  if (!el) { return }

  if (el !== event.target) { return }

  if (clientLoader.value) { navigateTo('/hotel') }
}

const isConnected = computed(() => authUser.value.id !== -1)

const isClientRoute = computed(() => (route && route.name ? route.name.toString().startsWith('hotel') : false))
</script>

<style lang="scss">
.app {
    color: #ffffff;
    background-color: #002f44;
}

::-webkit-scrollbar {
  width: 14px;
}

::-webkit-scrollbar-thumb {
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
  }
}

.web {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  z-index: 20;
  background-color: var(--app-background-color);
  color: #ffffff;

  backdrop-filter: blur(5px);
}

.main {
  flex: 1 0 auto;
}

:focus, button:focus {
  outline: none;
}
</style>
