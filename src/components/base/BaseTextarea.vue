<template>
  <textarea v-model="message" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none" />
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const message = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  value: { type: String, default: '' }
})
</script>
