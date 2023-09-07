<template>
  <VueRecaptcha :sitekey="siteKey" :load-recaptcha-script="true" />
</template>

<script lang="ts" setup>
import { VueRecaptcha } from 'vue-recaptcha'

const siteKey = computed(() => {
  return '6LdLrv4SAAAAADqmp8nOviJO_WcpaKGeRflnQeNp'
})
</script>
