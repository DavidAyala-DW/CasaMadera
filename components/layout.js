import ImageUrlBuilder from '@sanity/image-url'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Link from 'next/link'
import { getClient } from '@/lib/sanity.server'
import Footer from './footer'
import Header from './header'

function Layout(props) {
  const {
    children,
    isPreview,
    stickyHeader,
    siteSettings,
    siteSettings: {
      mainNav,
      menuImage,
      secondHeaderNav,
      footerNav,
      facebookHandle,
      instagramHandle,
      privacyPolicyHandle,
      cookiesPreferencesHandle,
      spotifyHandle,
      soundCloudHandle,
      reservationsButton,
      footer_noble_link,
      newsletter_text,
    },
    page,
    menus,
    locations,
  } = props

  const globalMenus = [mainNav, secondHeaderNav, footerNav]

  const setGlobalURL = [
    privacyPolicyHandle,
    cookiesPreferencesHandle,
    reservationsButton,
  ]

  setGlobalURL.forEach((menuItem) => {
    if (!menuItem) return

    const { slug } =
      menus.find((item) => item._id == menuItem?.link?._ref) ?? false

    if (!slug) {
      if (!menuItem?.link) {
        menuItem.link = {}
      }

      menuItem.link.url = '/'

      if (menuItem.externalLink) {
        menuItem.link.url = menuItem.externalLink
      }

      return
    }

    menuItem.link.url = slug.current != '/' ? `/${slug.current}` : '/'

    if (menuItem.externalLink) {
      menuItem.link.url = menuItem.externalLink
    }
  })

  globalMenus.forEach((menuItem) => {
    if (!menuItem) return

    menuItem.forEach((menu) => {
      let isLocation = false

      if (!menu) return

      let { slug } = menus.find((item) => item._id == menu?.link?._ref) ?? false

      if (!slug) {
        const { slug: slugLocation } =
          locations.find((item) => item._id == menu?.link?._ref) ?? false
        slug = slugLocation
        slug ? (isLocation = true) : null
      }

      if (!slug) {
        if (!menu?.link) {
          menu.link = {}
        }

        menu.link.url = '/'

        if (menu.externalLink) {
          menu.link.url = menu.externalLink
        }

        return
      }

      if (!isLocation) {
        menu.link.url = slug.current != '/' ? `/${slug.current}` : '/'
      } else {
        menu.link.url = slug.current != '/' ? `/locations/${slug.current}` : '/'
      }

      if (menu.externalLink) {
        menu.link.url = menu.externalLink
      }
    })
  })

  const imageBuilder = ImageUrlBuilder(getClient(isPreview))
  const openGraphImage = page.seo?.image ?? siteSettings.openGraphImage

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
      </Head>

      <div className="bg-body flex flex-col">
        <Header
          {...{
            mainNav,
            menuImage,
            secondHeaderNav,
            facebookHandle,
            instagramHandle,
            spotifyHandle,
            soundCloudHandle,
            reservationsButton,
            menus,
            stickyHeader,
            locations,
          }}
        />

        <NextSeo
          title={page.seo?.title}
          defaultTitle={`${page.title} | ${siteSettings.venue}`}
          description={page.seo?.description}
          openGraph={
            openGraphImage && {
              images: [
                {
                  url: imageBuilder
                    .image(openGraphImage)
                    .width(1200)
                    .height(630)
                    .url(),
                  width: 1200,
                  height: 630,
                },
              ],
            }
          }
          noindex={page.seo?.isHidden}
          nofollow={page.seo?.isHidden}
        />

        <div className="w-full min-h-screen flex flex-col relative">
          {children}
        </div>

        <Footer
          {...{
            facebookHandle,
            instagramHandle,
            spotifyHandle,
            soundCloudHandle,
            menus,
            privacyPolicyHandle,
            cookiesPreferencesHandle,
            footerNav,
            footer_noble_link,
            newsletter_text,
          }}
        />

        {reservationsButton && (
          <Link passHref href={reservationsButton?.link?.url}>
            <a className="fixed bottom-0 inset-x-0 w-full md:hidden z-[5] bg-body border-t border-[#D1C8BA] py-[13px]">
              <p className="text-center text-primary opacity-80  uppercase tracking-[0.05em] text-base font-light leading-[22px] w-full">
                {reservationsButton?.title}
              </p>
            </a>
          </Link>
        )}
      </div>
    </>
  )
}

export default Layout
