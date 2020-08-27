import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Router } from "next/dist/client/router"
import NProgress from 'nprogress'
import "nprogress/nprogress.css"

Router.events.on("routeChangeStart", () => {
  NProgress.start()
})

Router.events.on("routeChangeComplete", () => {
  NProgress.done()
})

Router.events.on("routeChangeError", () => {
  NProgress.done()
})


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
