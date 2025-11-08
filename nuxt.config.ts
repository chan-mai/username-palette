// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", 'nuxt-gtag', 'nuxt-jsonld'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
  nitro: {
    preset: 'cloudflare',
    serveStatic: true,
    prerender: {
      routes: [
        '/docs/api/v1',
      ],
    }
  },
  app: {
    head: {
      title: 'Username Palette',
      meta: [
        { charset: 'utf-8' },
        { name: 'lang', content: 'ja' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '韓国風・エモい・かわいいユーザーネームが無限生成🌙 映える！読めないユーザーネームメーカーメーカーです！' },
        { name: 'keywords', content: '読めないユーザーネームメーカー, ユーザーネームメーカー, ユーザーネーム生成, ユーザー名, ユーザーネーム作成, Username Palette, おしゃれ, 韓国風, かわいい, 可愛い, ツール' },
        { name: 'author', content: 'chan-mai' },
        { name: 'robots', content: 'index, follow' },
        { name: 'og:title', content: 'Username Palette' },
        { name: 'og:description', content: '韓国風・エモい・かわいいユーザーネームが無限生成🌙 映える！読めないユーザーネームメーカーメーカーです！' },
        { name: 'og:url', content: 'https://username-palette.mq1.dev' },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'Username Palette' },
        { name: 'og:image', content: 'https://username-palette.mq1.dev/ogp.webp' },
        { name: 'twitter:card', content: 'app' },
        { name: 'twitter:title', content: 'Username Palette' },
        { name: 'twitter:description', content: '韓国風・エモい・かわいいユーザーネームが無限生成🌙 映える！読めないユーザーネームメーカーメーカーです！' },
        { name: 'twitter:image', content: 'https://username-palette.mq1.dev/ogp.webp' },
      ],
    }
  },
  experimental: {
    viewTransition: true,
  },
  gtag: {
    id: "G-5C6MHVC1LE",
  },
});