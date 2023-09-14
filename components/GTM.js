import Script from 'next/script'

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export default function GTM() {
  if (process.env.NODE_ENV === 'development') {
    return <></>
  }

  if (!gtmId) {
    console.warn('No GTM ID provided')
    return <></>
  }

  return (
    <>
      {/*  Google Tag Manager */}
      <Script id="gtm">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>

      {/*  Google Tag Manager (noscript) */}
      <div
        dangerouslySetInnerHTML={{
          __html: `    
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          `,
        }}
      />
    </>
  )
}
