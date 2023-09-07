import { DEFAULT_USER, useAuthUser } from './useAuthUser'
import { User } from '~~/src/types'

export const useAuth = () => {
  const authUser = useAuthUser()
  const authToken = useCookie('auth-token')

  const setUser = (user: User) => {
    authUser.value = user
  }

  const setCookie = (token: string) => {
    authToken.value = token
  }

  const login = async (username: string, password: string) => {
    const data = await useApiFetch<{ Authorization: string }>('/api/v1/login', { body: { username, password }, method: 'POST' })

    const token = data.Authorization?.split('Bearer ')[1]

    setCookie(token)

    await nextTick()

    await me()
  }

  const logout = () => {
    setCookie('')
    setUser(DEFAULT_USER)
  }

  const me = async () => {
    if (authToken.value && authUser.value.id === -1) {
      try {
        const data = await useApiFetch<{ user: User }>('/api/v1/userdata')

        if (!data) {
          throw new Error('No user data')
        }

        setUser(data.user)
      } catch (error) {
        setCookie('')
      }
    }
  }

  return {
    me,
    login,
    logout
  }
}
