export default defineNuxtRouteMiddleware(() => {
  const authUser = useAuthUser()

  if (authUser.value.id !== -1) { return navigateTo('/home') }
})
