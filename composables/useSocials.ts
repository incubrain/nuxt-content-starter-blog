interface Link {
  id: number
  icon: string
  title: string
  url: string
  username?: string
  event?: {
    name: string
  }
}

const socials = [
  {
    id: 1,
    title: 'Incubrain Github',
    url: 'https://github.com/incubrain',
    username: 'incubrain',
    icon: 'i-mdi-github'
  },
  {
    id: 2,
    title: 'Incubrain LinkedIn',
    url: 'https://www.linkedin.com/company/incubrain/',
    username: 'incubrain',
    icon: 'i-mdi-linkedin'
  },
  {
    id: 3,
    title: 'Incubrain YouTube',
    url: 'https://youtube.com/channel/UC8MV3xG8i_G47445TADB23A',
    username: 'incubrain',
    icon: 'i-mdi-youtube'
  },
  {
    id: 4,
    title: 'Incubrain Instagram',
    url: 'https://instagram.com/incubrain',
    username: 'incubrain',
    icon: 'i-mdi-instagram'
  },
  {
    id: 5,
    title: 'Incubrain Twitter',
    url: 'https://twitter.com/incubrain',
    username: 'incubrain',
    icon: 'i-mdi-twitter'
  },
  {
    id: 6,
    title: 'Personal Linkedin',
    icon: 'i-mdi-linkedin',
    url: 'https://www.linkedin.com/in/drew-macgibbon'
  }
] as Link[]

export default function useSocials() {
  return {
    socials,
    personalLinkedin: socials.find((social) => social.id === 6)!,
    companyYouTube: socials.find((social) => social.id === 3)!,
    companyGitHub: socials.find((social) => social.id === 1)!,
  }
}
