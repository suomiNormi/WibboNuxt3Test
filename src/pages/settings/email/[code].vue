<template>
  <div class="col-span-2">
    <BaseCard>
      <template #title>
        {{ check ? 'Confirme ton email' : 'Email' }}
      </template>

      <template #body />
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
import type { MailCheck } from '~/types'

definePageMeta({
  middleware: ['authenticated']
})

const authUser = useAuthUser()
const route = useRoute()
const { showAlert } = useNotification()

const check = ref<MailCheck>({ type: 0, email: '', temps: 0 })

onMounted(async () => {
  if (!route.params.code) { return }

  try {
    const data = await useApiFetch<{ check: MailCheck }>('settings/email/' + route.params.code, { method: 'PUT' })

    if (data != null && data.check) {
      showAlert({
        message: 'Un mail de confirmation a été envoyé a ton nouvel email, check ta boite email!',
        type: 'success'
      })

      check.value = data.check
    } else {
      showAlert({
        message: 'Ton email a bien été valider!',
        type: 'success'
      })

      authUser.value.mail = check.value.email

      check.value = { type: 0, email: '', temps: 0 }
    }
  } catch {}
})
</script>
