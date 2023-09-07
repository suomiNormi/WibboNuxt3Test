<template>
  <div class="w-full mb-2 rounded">
    <div class="mb-2">
      <button
        v-for="(icon, bbcode, index) in bbcodes"
        :key="index"
        type="button"
        class="px-2 py-1 text-2xl text-white bg-transparent border-none rounded hover:bg-gray-600 hover:bg-opacity-20"
        @click="bbcoder(bbcode)"
      >
        <i :class="icon" />
      </button>
    </div>

    <BaseSelect v-model="selectedColor" class="inline-block w-auto mb-2" :options="colors" :default-choose="'Couleurs'" @change="onChange()" />

    <textarea
      ref="textareabbcode"
      v-model="message"
      class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
      rows="5"
      :placeholder="placeholder"
      maxlength="10000"
      name="message"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Ton message à poster' }
})

const emit = defineEmits(['update:modelValue'])

const message = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const textareabbcode = ref<HTMLTextAreaElement | null>(null)
const selectedColor = ref('')
const bbcodes = ref<Record<string, string>>({
  b: 'fas fa-bold',
  i: 'fas fa-italic',
  u: 'fas fa-underline',
  quote: 'fas fa-quote-right',
  'size=small': 'fas fa-search-minus',
  'size=large': 'fas fa-search-plus',
  code: 'fas fa-code',
  'url=url': 'fas fa-link',
  youtube: 'fab fa-youtube',
  img: 'fas fa-images'
})
const colors = ref<Record<string, string>>({
  red: 'Rouge',
  orange: 'Orange',
  yellow: 'Jaune',
  green: 'Vert',
  cyan: 'Cyan',
  blue: 'Bleu',
  gray: 'Gris',
  black: 'Noir'
})

const onChange = () => {
  if (selectedColor.value === '') { return }

  bbcoder('color=' + selectedColor.value)
}

const bbcoder = (code: string) => {
  if (!textareabbcode.value) { return }

  let newValue = textareabbcode.value.value

  const startPos = textareabbcode.value.selectionStart
  const endPos = textareabbcode.value.selectionEnd

  const selectedText = newValue.substring(startPos, endPos)

  const endCode = code.includes('=') ? code.split('=')[0] : code

  newValue = replaceBetween(newValue, startPos, endPos, '[' + code + ']' + selectedText + '[/' + endCode + ']')
  textareabbcode.value.focus()

  message.value = newValue
}

const replaceBetween = (value: string, start: number, end: number, what: string) => {
  return value.substring(0, start) + what + value.substring(end)
}
</script>
