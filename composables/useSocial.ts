interface Link {
  id: number
  icon: string
  title: string
  url: string
  event: {
    name: string
  }
}

const linksObject = {
  discord: {
    id: 0,
    title: 'Discord',
    icon: 'i-mdi-discord',
    url: 'https://discord.gg/zSGHvNZXAa',
    event: {
      name: 'join_community'
    }
  },
  personalGithub: {
    id: 1,
    title: 'Personal Github',
    icon: 'i-mdi-github',
    url: 'https://github.com/Drew-Macgibbon',
    event: {
      name: 'view_github'
    }
  },
  personalLinkedin: {
    id: 2,
    title: 'Personal Linkedin',
    icon: 'i-mdi-linkedin',
    url: 'https://www.linkedin.com/in/drew-macgibbon',
    event: {
      name: 'view_linkedin'
    }
  }
}

const links: Link[] = Object.values(linksObject)

const ceoObject = {
  ...linksObject,
  personalEmail: {
    id: 3,
    title: 'Email',
    icon: 'i-mdi-email',
    url: 'mailto:mac@incubrain.org',
    event: {
      name: 'send_email'
    }
  }
}

const ceoLinks: Link[] = Object.values(ceoObject)

export default function useSocial() {
  return {
    discord: linksObject.discord,
    personalGithub: linksObject.personalGithub,
    personalLinkedin: linksObject.personalLinkedin,
    personalEmail: ceoObject.personalEmail,
    links,
    ceoLinks
  }
}
