interface Page {
  id: number
  icon: string
  title: string
  link: string
  children?: Page[]
}

const pages = ref([
  {
    id: 0,
    title: 'Blog',
    icon: 'i-mdi-chevron-right',
    link: '/blog-all'
  }
] as Page[])

export default () => {
  return {
    pages
}
}
