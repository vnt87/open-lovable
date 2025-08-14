module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    localeDetection: true,
  },
  fallbackLng: 'en',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}