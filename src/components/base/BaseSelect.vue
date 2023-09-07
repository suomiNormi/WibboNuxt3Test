<template>
  <select v-model="message" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none">
    <option v-if="defaultChoose != ''" value="" disabled>
      {{ defaultChoose }}
    </option>
    <option v-for="(text, valueOption, index) in props.options" :key="index" :value="valueOption">
      {{ text }}
    </option>
  </select>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:modelValue'])

const message = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  value: { type: String, default: '' },
  defaultChoose: { type: String, default: '' },
  options: { type: Object, required: true }
})
// Record<string|number, string|number>
</script>
