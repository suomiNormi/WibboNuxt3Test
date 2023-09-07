export default defineNuxtRouteMiddleware(() => {
  const authUser = useAuthUser()

  if (authUser.value.id === -1) { return navigateTo('/') } else if (authUser.value.rank < 6) { return navigateTo('/home') }
})
