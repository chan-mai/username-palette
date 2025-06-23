// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", 'nuxt-gtag'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },
  nitro: {
    preset: 'cloudflare',
    serveStatic: true,
  },
  app: {
    head: {
      title: 'Username Palette',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'インスタやTikTokなどのSNSで使える、いい感じのエモいユーザーネームを生成します。' },
        { name: 'keywords', content: '読めないユーザーネームメーカー, ユーザーネームメーカー, ユーザーネーム生成, ユーザーネーム作成, Username Palette' },
        { name: 'author', content: 'chan-mai' },
        { name: 'robots', content: 'index, follow' },
        { name: 'og:title', content: 'Username Palette' },
        { name: 'og:description', content: 'インスタやTikTokなどのSNSで使える、いい感じのエモいユーザーネームを生成します。' },
        { name: 'og:url', content: 'https://username-palette.mq1.dev' },
        { name: 'og:type', content: 'website' },
        { name: 'og:site_name', content: 'Username Palette' },
        { name: 'twitter:card', content: 'app' },
        { name: 'twitter:title', content: 'Username Palette' },
        { name: 'twitter:description', content: 'インスタやTikTokなどのSNSで使える、いい感じのエモいユーザーネームを生成します。' },

      ]
    }
  },
  gtag: {
    id: "G-5C6MHVC1LE",
  },
});