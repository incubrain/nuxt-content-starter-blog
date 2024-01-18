export default defineAppConfig({
  ui: {
    primary: 'emerald',
    slideover: {
      background: 'bg-gray-50 dark:bg-neutral-950'
    },
    card: {
      background: '',
      ring: 'ring-1 ring-zinc-200 dark:ring-zinc-800',
      divide: 'divide-y divide-zinc-200 dark:divide-zinc-800',
      header: {
        background: 'bg-white dark:bg-black'
      }
    },
    notifications: {
      position: 'bottom-1 right-1'
    },
    button: {
      color: {
        white: {
          solid: 'dark:bg-neutral-950'
        }
      }
    }
  }
})
