import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import SanityImage from './sanity-image'

export default function Header(props) {
  const router = useRouter()
  const menuButton = useRef()

  const {
    mainNav,
    menuImage,
    alt_text: menuImage_alt_text,
    secondHeaderNav,
    facebookHandle,
    instagramHandle,
    spotifyHandle,
    soundCloudHandle,
    reservationsButton,
    stickyHeader,
    locations,
  } = props

  const [openModal, setOpenModal] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [activeMenuImage, setActiveMenuImage] = useState()
  const [existHero, setExistHero] = useState(false)
  const [heroVisible, setHeroVisible] = useState(null)
  const [entryObserver, setEntryObserver] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleClick(e = null) {
    setOpenModal((value) => !value)
  }

  function handleMouseEnter(image, alt_text) {
    if (image) {
      setActiveMenuImage({ image, alt_text })
    }
  }

  function handleMouseLeave() {
    setActiveMenuImage({
      image: menuImage,
      alt_text: menuImage_alt_text ?? 'Image',
    })
  }

  useEffect(() => {
    setActiveModal(true)

    if (menuImage) {
      handleMouseLeave()
    }
  }, [])

  useEffect(() => {
    const mainHero = document.getElementById('mainHero')

    if (!mainHero) {
      setExistHero(false)

      if (typeof window !== 'undefined') {
        function handleScroll() {
          if (window.scrollY != 0) {
            setExistHero(true)
            setHeroVisible(false)
          } else {
            setExistHero(!true)
            setHeroVisible(!false)
          }
        }

        window.addEventListener('scroll', handleScroll)
        return window.removeEventListener('scroll', handleScroll, true)
      }

      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setEntryObserver(entry.isIntersecting)
        if (entryObserver) {
          setHeroVisible(true)
          return
        }
        setHeroVisible(false)
      },
      {
        rootMargin: '0px 0px 0px 0px',
        root: null,
        threshold: 0.45,
      }
    )

    observer.observe(mainHero)
    setExistHero(true)
  }, [router.asPath, entryObserver])

  return (
    <>
      <header
        id="header"
        className={` ${
          existHero
            ? heroVisible == false && openModal == false
              ? 'bg-[#C5A99C] duration-[200ms]  '
              : 'bg-transparent duration-[300ms]'
            : ''
        }
      transition-colors z-[100] 
      ${
        openModal
          ? 'justify-center md2:!bg-transparent right-0 fixed md2:inset-x-0'
          : `justify-between ${
              stickyHeader ? 'sticky bg-body' : 'fixed inset-x-0'
            } `
      } 
      top-0 px-4 md2:px-[2.8%] w-full md2:mx-auto flex items-center md2:justify-between
      py-6 md2:pt-8 vw:pt-[1.666vw] md2:pb-10 vw:pb-[2.0833vw]`}
      >
        <div
          className={`cursor-pointer order-3 md2:order-1 select-none ${
            openModal && 'absolute right-4 md2:left-0 md2:relative'
          }`}
        >
          <div
            onClick={handleClick}
            className={`${
              openModal && 'hidden'
            } w-[25px] vw:!w-[1.302vw] filter-nav-icons`}
          >
            <Image
              src={`/images/${existHero ? 'burguer.svg' : 'burguerBrown.svg'}`}
              alt="burger"
              layout="responsive"
              width={25}
              height={16}
            />
          </div>

          <div
            onClick={handleClick}
            className={`${!openModal && 'hidden'} w-[21px] vw:!w-[1.09375vw]`}
          >
            <Image
              src={'/images/close.svg'}
              alt="close"
              layout="responsive"
              width={21}
              height={20}
            />
          </div>
        </div>

        <div
          className={`order order-1 md2:absolute md2:inset-0 md2:w-max md2:-top-4 vw:top-[-.83333vw] md2:m-auto md2:h-max select-none md2:order-2`}
        >
          {!openModal && existHero && (
            <Link href="/" passHref>
              <a
                onClick={() => setOpenModal(false)}
                className="block cursor-pointer w-[226px] vw:w-[11.77vw] filter-nav-icons"
              >
                <Image
                  src={'/images/logo.svg'}
                  width={226}
                  height={32}
                  alt="logo.png"
                  layout="responsive"
                />
              </a>
            </Link>
          )}

          {(openModal || !existHero) && (
            <Link href="/" passHref>
              <a
                onClick={() => setOpenModal(false)}
                className="block cursor-pointer w-[226px] vw:w-[11.77vw] filter-nav-icons"
              >
                <Image
                  src={'/images/logoDark.svg'}
                  width={226}
                  height={32}
                  alt="logo.png"
                  layout="responsive"
                />
              </a>
            </Link>
          )}
        </div>

        <div className="hidden md2:block order-3 select-none">
          {reservationsButton && (
            <Link passHref href={reservationsButton?.link?.url}>
              <a>
                <p
                  className={`font-light ${
                    openModal || !existHero
                      ? 'text-[#57412d] !border-primary'
                      : 'text-white border-white'
                  } filter-nav-icons transition-colors py-2.5 px-[30px] border  hover:bg-white hover:text-primary text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.388] tracking-[.05em] uppercase`}
                >
                  {reservationsButton?.title}
                </p>
              </a>
            </Link>
          )}
        </div>
      </header>

      <div
        className={`fixed inset-0 h-full w-full transition-[transform] !duration-[300ms] ${
          openModal ? '!translate-x-0' : `${!activeModal && 'invisible'}`
        } -translate-x-full bg-body
        min-h-screen z-[90] w-full flex items-start`}
      >
        <div
          className={`md2:pl-[2.8%] w-full h-[calc(100%-80px)] md2:h-full max-w-full md2:max-w-[73.6%] 3xl:max-w-[66.666%] flex flex-col items-center
        md2:items-start justify-between pt-[101px] md2:pt-[108px] vw:pt-[5.625vw] pb-6 vw:pb-[1.25vw]`}
        >
          <div className="w-full flex flex-col md2:flex-row space-y-2 md2:space-y-0 items-start md2:space-x-[150px] vw:space-x-[3.333vw]">
            <div className="w-full md2:w-1/2 flex flex-col items-center md2:items-start">
              {mainNav.slice(0, 5).map((item, index) => {
                const { title, link, image } = item

                return title !== 'Menus' ? (
                  <NavLink
                    key={item._key}
                    item={item}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() =>
                      handleMouseEnter(item.image, item.alt_text)
                    }
                    onClick={handleClick}
                  />
                ) : (
                  <div
                    key={item._key}
                    className="flex flex-col items-center md2:items-start"
                  >
                    <div
                      className={`flex items-center w-full space-x-5 max-w-max mx-auto md2:max-w-full`}
                    >
                      <NavLink
                        item={item}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() =>
                          handleMouseEnter(item.image, item.alt_text)
                        }
                        onClick={(event) => {
                          event.preventDefault()
                          setIsMenuOpen((value) => !value)
                        }}
                      />
                      <div
                        onClick={() => {
                          setIsMenuOpen((value) => !value)
                        }}
                        ref={menuButton}
                        className={`cursor-pointer relative transition-transform w-5 h-3 md2:w-7 md2:h-6 vw:w-[1.458vw] vw:h-[.8333vw] ${
                          isMenuOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        <Image
                          src="/images/Down.svg"
                          alt="Down Icon"
                          layout={'fill'}
                        />
                      </div>
                    </div>

                    <div
                      className={`flex-col items-center md2:items-start ${
                        isMenuOpen ? 'flex' : 'hidden'
                      }`}
                    >
                      {locations &&
                        [...locations].reverse().map((location) => {
                          const {
                            slug: { current },
                            comming_soon,
                          } = location

                          return (
                            <NavLink
                              key={location._id}
                              item={location}
                              secondary
                              href={`/menus/${current}${
                                comming_soon ? '' : '?menu=dinner-menu'
                              }`}
                              onClick={handleClick}
                            >
                              {location.title.split(',')[0]}
                            </NavLink>
                          )
                        })}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col w-full items-center md2:items-start">
              {mainNav.slice(5).map((item) => (
                <NavLink
                  key={item._key}
                  item={item}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={() =>
                    handleMouseEnter(item.image, item.alt_text)
                  }
                  onClick={handleClick}
                />
              ))}

              <div className="pt-6 vw:pt-[1.25vw] hidden md2:flex flex-col space-y-2 vw:space-y-[.416vw]">
                {secondHeaderNav?.map((item) => (
                  <NavLink
                    key={item._key}
                    item={item}
                    secondary
                    onClick={handleClick}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 vw:space-x-[1.25vw]">
            {/* {
              facebookHandle && (
                <a onClick={handleClick} href={facebookHandle} className="block w-8 vw:w-[1.666vw]">

                  <Image
                    src={"/images/facebook.svg"}
                    alt="facebook logo"
                    layout="responsive"
                    width={32}
                    height={32}
                  />
    
                </a>
              )
            } */}

            {instagramHandle && (
              <a
                onClick={handleClick}
                href={instagramHandle}
                className="block w-8 vw:w-[1.666vw]"
              >
                <Image
                  src={'/images/instagram.svg'}
                  alt="instagram logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />
              </a>
            )}

            {spotifyHandle && (
              <a
                onClick={handleClick}
                href={spotifyHandle}
                className="block w-8 vw:w-[1.666vw]"
              >
                <Image
                  src={'/images/spotify.svg'}
                  alt="instagram logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />
              </a>
            )}

            {soundCloudHandle && (
              <a
                onClick={handleClick}
                href={soundCloudHandle}
                className="block w-8 vw:w-[1.666vw]"
              >
                <Image
                  src={'/images/soundCloud.svg'}
                  alt="instagram logo"
                  layout="responsive"
                  width={32}
                  height={32}
                />
              </a>
            )}
          </div>
        </div>

        <div
          className={`hidden ${
            !activeMenuImage?.image && 'bg-body'
          } lg:flex relative w-full h-full max-w-[26.4%] 3xl:max-w-[33.3333%]`}
        >
          {activeMenuImage && (
            <SanityImage
              priority={true}
              alt={activeMenuImage?.alt_text ?? 'Image'}
              className="object-cover"
              src={activeMenuImage?.image}
              layout="fill"
            />
          )}
        </div>
      </div>
    </>
  )
}

function NavLink(props) {
  const { item, href, secondary = false, children, onClick, ...rest } = props

  if (!item) {
    return null
  }

  const anchorTag = (
    <a
      href={item.externalLink}
      onClick={!item.isDisabled ? onClick : (e) => e.preventDefault()}
      className={clsx(
        'block font-light',
        item.isDisabled && 'opacity-50 cursor-default',
        secondary
          ? 'text-[24px] vw:text-[1.25vw] leading-[1.6] opacity-90'
          : 'text-[32px] md2:text-[55px] vw:text-[2.864vw] leading-[44px] md2:leading-[75px] vw:leading-[1.36] tracking-[-.04em]'
      )}
      tabIndex={item.isDisabled ? -1 : 0}
      aria-disabled={item.isDisabled}
      {...rest}
    >
      {children ?? item.title}
    </a>
  )

  return item.externalLink ? (
    anchorTag
  ) : (
    <Link href={!item.isDisabled ? href ?? item.link.url : '#'} passHref>
      {anchorTag}
    </Link>
  )
}
