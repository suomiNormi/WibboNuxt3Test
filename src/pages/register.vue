<template>
  <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
    <div class="col-span-1 xl:col-start-2">
      <BaseCard>
        <template #title>
          Je veux m'inscrire
        </template>

        <template #body>
          <form class="grid grid-cols-1 gap-3" @submit.prevent="userRegister">
            <div class="col-span-1">
              <label for="registerInputusername" class="block mb-2 font-bold">Ton pseudonyme</label>
              <BaseInput id="registerInputusername" v-model="registerForm.username" name="username" aria-describedby="usernameHelp" placeholder="Ton pseudonyme" />
              <small id="usernameHelp" class="text-sm">Ton pseudo peut contenir des lettres (majuscules et minuscule), des nombres et des tirets (-).</small>
            </div>

            <div class="col-span-1">
              <label for="registerInputpassword" class="block mb-2 font-bold">Mot de passe</label>
              <BaseInput
                id="registerInputpassword"
                v-model="registerForm.password"
                type="password"
                name="password"
                aria-describedby="passwordHelp"
                placeholder="Mot de passe"
              />
              <small id="passwordHelp" class="text-sm">Utilise au moins 6 caractères. Inclue au moins une lettre et au moins un chiffre ou un caractère spécial.</small>
            </div>

            <div class="col-span-1">
              <label for="registerInputrepassword" class="block mb-2 font-bold">Repéter le mot de passe</label>
              <BaseInput
                id="registerInputrepassword"
                v-model="registerForm.repassword"
                type="password"
                name="repassword"
                aria-describedby="repasswordHelp"
                placeholder="Répète ton mot de passe"
              />
            </div>

            <div class="col-span-1">
              <label for="conditionCheck" class="flex items-center cursor-pointer">
                <BaseCheckBox id="conditionCheck" v-model="registerForm.condition" name="condition" />
                <div class="ml-3 font-medium">
                  J'accepte les
                  <NuxtLink
                    :to="'/security/disclaimer'"
                    target="_blank"
                  >conditions d'utilisations, la politique en matière de traitement des données personnelles et la Politique d'utilisation des Cookies.</NuxtLink>
                </div>
              </label>
            </div>

            <div class="col-span-1 mx-auto mt-2" style="width: 304px">
              <BaseRecaptcha @verify="(token: string) => registerForm.recaptchaToken = token" @expire="registerForm.recaptchaToken = ''" />
            </div>

            <div class="col-span-1">
              <BaseButton :loading="loading">
                Prêt! Maintenant, crée ton avatar !
              </BaseButton>
            </div>
          </form>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <img src="~/assets/imgs/register.png" class="w-full" alt="Wibbo inscription">
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '~/types'

const authUser = useAuthUser()

definePageMeta({
  title: 'register',
  middleware: ['un-authenticated']
})

const cookieToken = useCookie('token')

const loading = ref(false)
const registerForm = ref({ username: '', password: '', repassword: '', condition: false, email: '', recaptchaToken: '' })

const userRegister = async () => {
  if (loading.value || !registerForm.value.recaptchaToken) { return }

  try {
    loading.value = true

    const response = await useApiFetch<{ Authorization: string }>('/api/v1/register', { body: registerForm.value, method: 'POST' })

    const token = response.Authorization.split('Bearer ')[1]

    cookieToken.value = token

    const data = await useApiFetch<{ user: User }>('/api/v1/userdata')
    if (!data) { throw new Error('Une erreur est survenue') }

    authUser.value = data.user

    registerForm.value = { username: '', password: '', repassword: '', condition: false, email: '', recaptchaToken: '' }

    navigateTo('/home')
  } catch {
    cookieToken.value = ''
  }

  loading.value = false
}
</script>
