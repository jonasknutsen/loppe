import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'Loppemarkeder i nærheten av deg',
  description: 'Oversikt over loppemarkeder i nærheten av deg'
}

export default function RootLayout ({
  children
}) {
  return (
    <html lang='no'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
