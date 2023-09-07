import type { NotificationAlert } from '~/types'

export const useNotificationAlert = () => useState<NotificationAlert | null>('notification-alert', () => null)

let alertTimeout = 0

export const useNotification = () => {
  const alert = useNotificationAlert()

  const showAlert = ({ message = '', type = 'success', duration = 25, callback = undefined, translate = false, params = undefined } = {} as NotificationAlert) => {
    alert.value = { message, type, callback, translate, params }

    if (alertTimeout) {
      clearTimeout(alertTimeout)
    }

    if (duration) {
      alertTimeout = window.setTimeout(() => hideAlert(), duration * 1000)
    }
  }

  const hideAlert = () => {
    alert.value = null
    if (alertTimeout) {
      clearTimeout(alertTimeout)
    }
  }

  return {
    hideAlert,
    showAlert
  }
}
