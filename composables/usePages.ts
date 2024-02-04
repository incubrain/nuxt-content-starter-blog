import type { DropdownItem } from '#ui/types'

interface PageChildren {
  label: string
  link: string
  icon: string
  labelClass?: string
  iconClass?: string
  avatar?: string
  shortcuts?: string
  slot?: string
  disabled?: boolean
  class?: string
  click?: string
}

interface Page {
  id: number
  icon: string
  title: string
  link: string
  children?: DropdownItem[]
}

const pages = ref([
  {
    id: 0,
    title: 'Blog',
    icon: 'i-mdi-chevron-right',
    link: '/blog',
    children: [
      {
        label: 'Blog Frontend',
        icon: 'i-mdi-chevron-right',
        to: '/blog/frontend'
      },
      {
        label: 'Blog Backend',
        icon: 'i-mdi-chevron-right',
        to: '/blog/backend'
      },
      {
        label: 'Blog Projects',
        icon: 'i-mdi-chevron-right',
        to: '/blog/projects'
      }
    ]
  }
] as Page[])

export default () => {
  return {
    pages
  }
}
