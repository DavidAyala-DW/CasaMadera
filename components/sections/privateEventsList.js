import Image from 'next/image'
import Link from 'next/link'
import SanityImage from '../sanity-image'

export default function PrivateEventsList(props) {
  const { title, description, events } = props
  return (
    <>
      <section className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-20 md2:pt-[162px] pb-6 md2:pb-[100px]">
        <h1 className="font-light text-center text-[32px] md2:text-[48px] leading-[66px]">
          {title}
        </h1>

        <div className=" font-libreBaskerville text-base max-w-[568px] mx-auto font-normal leading-6 text-center ">
          {description}
        </div>
      </section>

      <section
        className={`px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">
          {events &&
            events.map((event) => {
              const { _key, title, image, alt_text, book_link, slug } = event

              return (
                <div className="flex flex-col space-y-6" key={_key}>
                  <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
                    <Link href={`/private-events/${slug?.current}`} passHref>
                      <a className="w-full h-full">
                        <div className="w-full h-full">
                          <div className="w-full h-full relative">
                            <SanityImage
                              alt={alt_text ?? 'Image'}
                              src={image}
                              layout="fill"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <Link href={`/private-events/${slug?.current}`} passHref>
                      <a className="block">
                        <h2 className="text-2xl md2:text-[32px] cursor-pointer font-light md2:leading-11">
                          {title}
                        </h2>
                      </a>
                    </Link>

                    {/* <Link href={book_link } passHref>
                      <a className="!font-avenir text-lg font-light leading-6 tracking-[0.05em] underline opacity-80 text-[#4A3419] uppercase">
                        BOOK EVENT
                      </a>
                    </Link> */}
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}
