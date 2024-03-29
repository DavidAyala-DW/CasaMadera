import Image from 'next/image'
import Link from 'next/link'
import SanityImage from '../sanity-image'

export default function Menus(props) {
  const { title, locations } = props
  return (
    <>
      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-[162px] pb-[72px]">
        <h1 className="font-light text-center text-[48px] leading-[66px]">
          {title}
        </h1>
      </section>

      <section
        className={`px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">
          {locations &&
            locations.map((location) => {
              const { title, image, alt_text, menus, slug } = location

              return (
                <div key={location._key} className="flex flex-col space-y-6">
                  <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
                    <Link href={`/locations/${slug?.current}`} passHref>
                      <a className="w-full h-full">
                        <div className="w-full h-full">
                          <div className="w-full h-full relative">
                            <SanityImage
                              alt={alt_text ?? 'Image'}
                              src={image}
                              layout="fill"
                              className="object-cover"
                            />
                            <div className="absolute bottom-6 right-[30px] flex-col justify-center items-center">
                              <div className="relative w-2.5 vw:w-[0.520vw] h-[18px] vw:h-[.9375vw] cursor-pointer block">
                                <Image
                                  src="/images/whiteRightArrow.svg"
                                  alt="White arrow"
                                  layout="fill"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <h2 className="text-[32px] font-light leading-11">
                      {title}
                    </h2>

                    <div className="grid grid-cols-2 gap-5 md:gap-0 md:flex md:flex-wrap items-center md:gap-x-6 md:gap-y-2">
                      {menus &&
                        menus.map((menu) => {
                          const { title, slug: slugMenu } = menu

                          return (
                            <Link
                              key={menu._key}
                              href={`/menus/${slug?.current}?menu=${slugMenu?.current}`}
                              passHref
                            >
                              <a className="opacity-80 tracking-[.05em] uppercase text-base leading-[1] md:text-lg md:leading-[25px] font-light underline whitespace-nowrap">
                                {title}
                              </a>
                            </Link>
                          )
                        })}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}
