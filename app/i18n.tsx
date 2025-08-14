import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)