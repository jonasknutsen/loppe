import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import '../styles/styles.css'
import theme from '../styles/theme'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <CssBaseline />
      <Layout>
        <Component key={router.asPath} {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
