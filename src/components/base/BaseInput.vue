<template>
  <input v-model="message" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" type="text">
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: '' }
})

const emit = defineEmits(['update:modelValue'])

const message = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>
