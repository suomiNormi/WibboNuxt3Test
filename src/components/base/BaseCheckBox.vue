<template>
  <div class="relative cursor-pointer">
    <input
      :id="props.id"
      v-model="message"
      type="checkbox"
      class="sr-only"
      :name="props.name"
      :checked="props.value"
    >

    <div class="block h-8 rounded-full w-14" :class="!props.white ? 'bg-gray-600' : 'bg-white'" />

    <div class="absolute w-6 h-6 transition bg-white rounded-full dot left-1 top-1" :class="props.white ? 'bg-gray-600' : 'bg-white'" />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const message = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const props = defineProps({
  modelValue: { type: [Boolean], default: false },
  value: { type: Boolean, default: false },
  white: { type: Boolean, default: false },
  name: { type: String, required: true },
  id: { type: String, required: true }
})
</script>

<style lang="scss">
input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
}
</style>
