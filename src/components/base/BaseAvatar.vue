<template>
  <div
    v-if="square || headonly"
    :style="{ backgroundImage: `url(${url})` }"
    :class="{ 'avatar-square': square, 'avatar-head': headonly && size != 's', 'avatar-head-s': headonly && size === 's' }"
  />
  <img v-else :src="url" class="max-w-none" alt="avatar">
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()

const props = defineProps({
  figure: { type: String, default: '' },
  action: { type: String, default: '' },
  direction: { type: Number, default: 0 },
  headDirection: { type: Number, default: 0 },
  gesture: { type: String, default: '' },
  size: { type: String, default: '' },
  imgFormat: { type: String, default: '' },
  frame: { type: Number, default: 0 },
  headonly: { type: Boolean, default: false },
  trim: { type: Boolean, default: false },
  square: { type: Boolean, default: false }
})

const url = computed(() => {
  const params = []
  if (props.action) { params.push(`action=${props.action}`) }
  if (props.direction) { params.push(`direction=${props.direction}`) }
  if (props.headDirection) { params.push(`head_direction=${props.headDirection}`) }
  if (props.gesture) { params.push(`gesture=${props.gesture}`) }
  if (props.size) { params.push(`size=${props.size}`) }
  if (props.imgFormat) { params.push(`img_format=${props.imgFormat}`) }
  if (props.frame) { params.push(`frame=${props.frame}`) }
  if (props.headonly) { params.push(`headonly=${props.headonly ? 1 : 0}`) }
  if (props.trim) { params.push(`trim=${props.trim}`) }

  return runtimeConfig.public.avatarUrl + `/?figure=${props.figure || 'hr-115-42.hd-190-1.ch-215-62.lg-285-91.sh-290-62'}${params.length ? '&' + params.join('&') : ''}`
})
</script>

<style lang="scss">
.avatar-head {
    width: 54px;
    height: 62px;
    background-position: center -10px;
}

.avatar-head-s {
    width: 32px;
    height: 20px;
    background-position: center -10px;
}

.avatar-square {
    width: 40px;
    height: 40px;
    background-position: center -21px;
}
</style>
