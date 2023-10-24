<template>
  <div class="col-span-2">
    <BaseCard>
      <template #title>
        Mot de passe
      </template>

      <template #body>
        <form class="grid grid-cols-1 gap-3 md:grid-cols-2" @submit.prevent="passwordPost">
          <div class="col-span-full">
            <label class="form-label">Mot de passe actuel</label>
            <BaseInput v-model="passwordForm.oldpassword" type="password" placeholder="Mot de passe actuel" />
          </div>

          <div class="col-span-1">
            <label class="form-label">Nouveau mot de passe</label>
            <BaseInput v-model="passwordForm.newpassword" type="password" placeholder="Nouveau mot de passe" />
          </div>

          <div class="col-span-1">
            <label class="form-label">Repéter le mot de passe</label>
            <BaseInput v-model="passwordForm.repassword" type="password" placeholder="Repéter le mot de passe" />
          </div>

          <div class="col-span-full">
            <small id="newPassWord" class="form-text">Utilise un mot de passe à 6 caractères. Inclue au moins une lettre et au moins un chiffre ou un caractère spécial.</small>
          </div>

          <div class="col-span-full">
            <BaseButton :loading="loading">
              Mettre à jour
            </BaseButton>
          </div>
        </form>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['authenticated']
})

const { showAlert } = useNotification()

const loading = ref(false)
const passwordForm = ref({ oldpassword: '', newpassword: '', repassword: '' })

const passwordPost = async () => {
  if (loading.value) { return }

  try {
    loading.value = true

    await useApiFetch('settings/password', { body: passwordForm.value, method: 'POST' })

    showAlert({
      message: 'Mot de passe changer!',
      type: 'success'
    })

    passwordForm.value = { oldpassword: '', newpassword: '', repassword: '' }
  } catch {}

  loading.value = false
}
</script>
