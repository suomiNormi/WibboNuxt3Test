export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path && process.client) {
    const appElement = document.getElementById('app')
    if (!appElement) { return }

    if (to.hash) {
      findEl(to.hash, 0).then((hashElement: HTMLElement) => appElement.scrollTo({ top: (hashElement.offsetTop ?? 0) + window.innerHeight, behavior: 'smooth' }))
    }

    return appElement.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const findEl = async (hash: string, x: number): Promise<HTMLElement> => {
  return await (
    document.querySelector<HTMLElement>(hash) ||
        new Promise((resolve, reject) => {
          if (x > 20) {
            return reject(new Error('Could not find element'))
          }
          setTimeout(() => {
            resolve(findEl(hash, x++ || 1))
          }, 250)
        })
  )
}
