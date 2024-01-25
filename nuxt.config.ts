// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      script: [],
      link: []
    }
  },

  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/ui', '@nuxtjs/seo', '@vueuse/nuxt'],

  site: {
    url: 'your-blog-url.com',
    name: 'Site title SEO',
    description: 'Site description SEO',
    defaultLocale: 'en',
    trailingSlash: false,
    titleSeparator: ' | ',
    debug: process.env.NODE_ENV !== 'production',
    identity: {
      type: 'Organization'
    },
    twitter: '@your-twitter'
  },

  ogImage: {
    componentOptions: {
      global: true
    }
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  typescript: {
    shim: false,
    tsConfig: {
      exclude: ['node_modules', 'dist'],
      compilerOptions: {
        strict: true
      }
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  ui: {
    icons: ['mdi', 'heroicons']
  },

  // image: {
  //   format: ["webp", "jpg", "png"],
  // },

  runtimeConfig: {},

  routeRules: {
    // pre-rendered at build time
    '/**': { prerender: true }
  },

  ssr: true,

  content: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
    },
  }
})
