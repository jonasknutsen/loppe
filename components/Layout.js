import Container from '@mui/material/Container'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div className='app'>
      <Container maxWidth='md' sx={{ margin: '0 auto', height: '100%' }}>
        {props.children}
        <Footer />
      </Container>
    </div>
  )
}

export default Layout
