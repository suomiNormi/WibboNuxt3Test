<template>
  <div id="logo" class="logo" @mouseover="startAnimation" @mouseleave="hover = false">
    <div id="logo-w" class="sprite sprite-w" @click="onClick('w')" />
    <div id="logo-i" class="sprite sprite-i" @click="onClick('i')" />
    <div id="logo-b1" class="sprite sprite-b1" @click="onClick('b1')" />
    <div id="logo-b2" class="sprite sprite-b2" @click="onClick('b2')" />
    <div id="logo-o" class="sprite sprite-o" @click="onClick('o')">
      <BaseAvatar
        v-show="!avatarAnimated"
        class="logo__personnage"
        :figure="props.avatarLook"
        action="sit"
        :direction="2"
        :head_direction="2"
        size="s"
      />
      <BaseAvatar
        v-show="avatarAnimated"
        class="logo__personnage"
        :figure="props.avatarLook"
        action="sit,wav,drk=0"
        :direction="2"
        :head_direction="3"
        size="s"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  avatarLook: { type: String, required: true }
})

const hover = ref(false)
const animationReverse = ref(false)
const avatarAnimated = ref(false)

const onClick = (elementId: string) => {
  if (!allAnimationEnd()) { return }

  const element = document.getElementById('logo-' + elementId)
  if (!element) { return }

  if (elementId === 'o') { avatarAnimated.value = true }

  element.classList.add('animated2')
  element.addEventListener('animationend', () => {
    element.classList.remove('animated2')
    avatarAnimated.value = false
  })
}

const startAnimation = () => {
  if (hover.value) { return }

  hover.value = true

  if (!allAnimationEnd()) { return }

  let elementIds = ['w', 'i', 'b1', 'b2', 'o']
  if (animationReverse) { elementIds = elementIds.reverse() }

  animationReverse.value = !animationReverse.value

  let index = 0
  const intervalId = setInterval(() => {
    if (index >= elementIds.length) {
      if (!allAnimationEnd()) { return }

      clearInterval(intervalId)

      return
    }

    const elementId = elementIds[index]
    if (!elementId) { return }

    const element = document.getElementById('logo-' + elementId)
    if (!element) { return }

    if (elementId === 'o') { avatarAnimated.value = true }

    element.classList.add('animated')
    element.addEventListener('animationend', () => {
      element.classList.remove('animated')
      avatarAnimated.value = false
    })

    index++
  }, 150)
}

const allAnimationEnd = () => {
  const elementIds = ['w', 'i', 'b1', 'b2', 'o']
  for (const elementId of elementIds) {
    const element = document.getElementById('logo-' + elementId)
    if (!element) { return false }

    if (element.classList.contains('animated')) { return false }

    if (element.classList.contains('animated2')) { return false }
  }

  return true
}
</script>

<style lang="scss">
.logo {
    position: relative;
    width: 182px;
    cursor: pointer;
    animation-duration: 1s;
    animation-fill-mode: both;
    filter: drop-shadow(2px 1px 0 #fff) drop-shadow(-2px 1px 0 #fff) drop-shadow(0 -2px 0 #fff);

    &__personnage {
        width: 32px;
        height: 55px;
        position: absolute;
        top: -40px;
    }

    .sprite {
        background-image: url(~/assets/imgs/logo-sprite.png);
        background-repeat: no-repeat;
        display: block;
    }

    .sprite.sprite-b1 {
        background-position: 0 0;
        width: 28px;
        height: 33px;
        float: left;
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .sprite.sprite-b2 {
        background-position: -28px 0;
        width: 28px;
        height: 33px;
        float: left;
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .sprite.sprite-i {
        background-position: 0 -33px;
        width: 20px;
        height: 33px;
        float: left;
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .sprite.sprite-o {
        background-position: -20px -33px;
        width: 28px;
        height: 33px;
        float: left;
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .sprite.sprite-w {
        background-position: -56px 0;
        width: 38px;
        height: 33px;
        float: left;
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .animated {
        animation-name: float-logo;
        transform-origin: center bottom;
    }

    @keyframes float-logo {
        0% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(-20px);
        }

        100% {
            transform: translateY(0px);
        }
    }

    .animated2 {
        animation-name: bounce-logo;
        transform-origin: center bottom;
    }

    @keyframes bounce-logo {
        from,
        20%,
        53%,
        80%,
        to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
        }

        40%,
        43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -30px, 0);
        }

        70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -15px, 0);
        }

        90% {
            transform: translate3d(0, -4px, 0);
        }
    }
}
</style>
