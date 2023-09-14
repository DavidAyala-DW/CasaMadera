import Cookies from 'js-cookie'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import CookieConsent from 'react-cookie-consent'
import GTM from '@/components/GTM'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const allCookies = Cookies.get('_gtm_all_cookies')

    if (allCookies && allCookies == true) {
      const dataLayer = window.dataLayer
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({ event: 'all-cookies' })
      }
    }
  }, [])

  return (
    <>
      {process.env.NODE_ENV !== 'development' && (
        <GTM id={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <Head>
        <link rel="shortcut icon" href="/images/Casa Madera Favicon.png" />
      </Head>
      <Component {...pageProps} />
      <CookieConsent
        containerClasses="cookie"
        contentClasses="cookieContent"
        declineButtonClasses="cookieDeclineButton"
        declineButtonText="Decline"
        buttonClasses="cookieButton"
        buttonWrapperClasses="CookitButtonsWrapper"
        disableStyles={true}
        enableDeclineButton={true}
        location="bottom"
        buttonText="Accept All"
        cookieName="_gtm_all_cookies"
        expires={150}
        onAccept={() => {
          const dataLayer = window.dataLayer
          if (typeof dataLayer !== 'undefined') {
            dataLayer.push({ event: 'all-cookies' })
          }
        }}
      >
        We use cookies to ensure that we give you the best experience on our
        website. See
        <Link href="/privacy-policy" passHref>
          <a className="px-2 underline pointer ">Privacy policy</a>
        </Link>
        and
        <Link href="/website-terms" passHref>
          <a className="px-2 underline pointer ">Website Terms</a>
        </Link>
      </CookieConsent>
    </>
  )
}
