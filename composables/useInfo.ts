// use this composable to configure Nuxt SEO & Metadata
// You will also have to update the nuxt.config.ts with appropriate values

import { AuthorT } from '~/types/posts'

const environment = process.env.NODE_ENV || 'development'

const website = reactive({
  name: 'Website Name',
  nameSlug: 'website-name',
  url: environment === 'development' ? 'http://localhost:3000/' : 'https://website-url.com',
  logo: 'website-logo.png',
  author: {
    name: 'Drew MacGibbon',
    avatar: 'drew-macgibbon.jpg',
    email: 'mac@incubrain.org'
  },
  keywords: 'vue3, admin, dashboard, tailwind, vue'
})

const seo = reactive({
  home: {
    title: `${website.name} - Website Title`,
    description: 'Website description'
  },
  blog: {
    // update these if you change your blog categories
    all: {
      title: 'Blog',
      description: 'Blog description'
    },
    frontend: {
      title: 'Frontend',
      description: 'Frontend description'
    },
    backend: {
      title: 'Backend',
      description: 'Backend description'
    },
    projects: {
      title: 'Projects',
      description: 'Projects description'
    }
  },
  image: website.logo,
  url: website.url,
  keywords: website.keywords,
  twitter: '@twitter',
  facebook: '@facebook',
  instagram: '@instagram',
  linkedin: '@linkedin',
  youtube: '@youtube'
})

const author = {
  name: { given: 'Drew', surname: 'MacGibbon', full: 'Drew MacGibbon', title: 'Dr.' }, // remove title if you don't need it
  avatar: 'drew-macgibbon.jpg',
  bio: {
    short: 'Nick Nuxter is a dedicated open-sourcer.',
    full: 'Nick Nuxter is a dedicated open-source contributor with 10 years experience working tirelessly on his dreams, you should give him some money.'
  },
  socials: {
    twitter: 'https://twitter.com/nuxter',
    github: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    youtube: ''
  },
  sponsorLink: '' // !TODO: add incubrain GH sponsor link
} as AuthorT

export default () => {
  return {
    website,
    seo,
    author
  }
}
