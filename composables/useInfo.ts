

const website = reactive({
  name: 'Blog Name',
  nameSlug: 'blog-name',
  url: 'https://blog-url.com',
  logo: 'blog-logo.png',
  description: 'Vue3 Admin Dashboard',
  author: {
    name: 'Drew MacGibbon',
    avatar: 'drew-macgibbon.jpg',
    email: 'mac@incubrain.org'
  }
  keywords: 'vue3, admin, dashboard, tailwind, vue',
})



export default () => {
  return {
    website,
  }
}