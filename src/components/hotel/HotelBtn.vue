<template>
  <div class="client-nav__container">
    <div class="client-nav client-nav__web" @click="hasHistory() ? navigateTo(lastRouteName) : navigateTo('/home')">
      <i class="fa-solid fa-house" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// const fullscreen = ref(false)
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

// const toggleFullScreen = () => {
//   const body = document.querySelector('body')

//   if (!document.fullscreenElement && body) {
//     fullscreen.value = true

//     if (body.requestFullscreen) { body.requestFullscreen() }
//   } else {
//     fullscreen.value = false

//     if (document.exitFullscreen) { document.exitFullscreen() }
//   }
// }
</script>

<style lang="scss">
.client-nav {
    &__container {
        position: absolute;
        top: 10px;
        left: 5px;
    }

    position: relative;
    float: left;
    margin-left: 5px;
    padding: 0 10px;
    color: #fff;
    background-color: var(--primary-color);
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.45), inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1);

    &__text {
        display: inline-block;
        color: #fff;
        // text-shadow: 0 2px 1px rgba(0,0,0,.3);
        max-width: 0px;
        margin: 0;
        visibility: hidden;
        white-space: nowrap;

        transition: max-width 0.2s, margin-left 0.2s;
    }

    &:hover &__text {
        max-width: 100px;
        visibility: visible;
        margin-left: 5px;
    }

    &__web {
        line-height: 30px;
        text-align: center;
        text-shadow: 0 2px 1px rgba(255, 255, 255, 0.2);
    }

    &__align {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
}

.fullscreen {
    &__icon {
        &--on {
            width: 15px;
            height: 14px;
            background: url('~/assets/imgs/icons/fullscreen_on.png') no-repeat 0 0;
        }

        &--off {
            width: 15px;
            height: 14px;
            background: url('~/assets/imgs/icons/fullscreen_off.png') no-repeat 0 0;
        }
    }
}
</style>
