<template>
  <Teleport to="body">
    <transition name="opacity">
      <div v-if="props.show" ref="modal" class="modal" @click.prevent="emit('close')">
        <div class="modal__close" @click="emit('close')">
          <i class="fas fa-times" />
        </div>
        <div class="modal__container" @click.stop>
          <transition name="fade-in-down">
            <slot />
          </transition>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close'])

const props = defineProps({
  show: { type: Boolean, require: true }
})
</script>

<style lang="scss">
.modal {
    @apply fixed left-0 right-0 top-0 bottom-0 w-full h-full overflow-auto flex justify-center items-center;
    z-index: 999;
    background-color: rgb(0, 129, 204); /* Fallback color */
    background-color: rgba(0, 129, 204, 0.4); /* Black w/ opacity */
    backdrop-filter: blur(10px);

    /* The Close Button */
    &__close {
        @apply fixed float-right text-5xl text-white font-bold;

        top: 10px;
        right: 25px;

        &:hover,
        &:focus {
            @apply cursor-pointer text-gray-50;
        }
    }

    &__container {
        position: relative;
        z-index: 1;
        max-width: 80%;
        max-height: 80%;
    }
}
</style>
