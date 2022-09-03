import Container from '@mui/material/Container'
import Footer from './Footer'
import Header from './Header'

const Layout = (props) => {
  return (
    <div className='app'>
      <Header />
      <main>
        <Container maxWidth='md' sx={{ margin: '0 auto' }}>
          {props.children}
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
