import type { RouterConfig } from '@nuxt/schema'

interface ScrollPositions {
  [key: string]: number // This means 'scrollPositions' can have any number of string keys, each with a number value
}

const scrollPositions: ScrollPositions = {}

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (from) {
      scrollPositions[from.path] = window.scrollY
    }
    return new Promise((resolve, reject) => {
      if (to.hash) {
        setTimeout(
          () => {
            resolve({ el: to.hash, top: 60, behavior: 'smooth' })
          },
          !from || to.path !== from.path ? 500 : 1
        )
      } else if (savedPosition) {
        resolve(savedPosition)
      } else if (scrollPositions[to.path]) {
        resolve({ top: scrollPositions[to.path] })
      } else {
        resolve({ top: 0, behavior: 'smooth' })
      }
    })
  }
}
