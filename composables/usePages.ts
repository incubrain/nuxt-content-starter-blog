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
    link: '/blog/all'
  }
  // {
  //   id: ,
  //   title: 'About',
  //   icon: 'i-mdi-chevron-right',
  //   link: '/about',
  //   children: []
  // }
] as Page[])

const socials = ref([
  {
    id: 1,
    title: 'Github',
    link: 'https://github.com/incubrain',
    username: 'incubrain',
    icon: 'i-mdi-github'
  },
  {
    id: 2,
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/company/incubrain/',
    username: 'incubrain',
    icon: 'i-mdi-linkedin'
  },
  {
    id: 3,
    title: 'YouTube',
    link: 'https://youtube.com/channel/UC8MV3xG8i_G47445TADB23A',
    username: 'incubrain',
    icon: 'i-mdi-youtube'
  },
  {
    id: 4,
    title: 'Instagram',
    link: 'https://instagram.com/incubrain',
    username: 'incubrain',
    icon: 'i-mdi-instagram'
  },
  {
    id: 5,
    title: 'Twitter',
    link: 'https://twitter.com/incubrain',
    username: 'incubrain',
    icon: 'i-mdi-twitter'
  }
])

export default () => {
  return {
    pages,
    socials
  }
}
