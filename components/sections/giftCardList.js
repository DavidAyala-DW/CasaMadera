import Link from 'next/link'
import SanityImage from '../sanity-image'
import SimpleBlockContent from '../simple-block-content'

export default function GiftCards(props) {
  const { title, description, locations } = props

  if (!locations?.length) {
    return null
  }

  return (
    <div className="px-6 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col">
      <div className="mb-10 lg:mb-20">
        {title ? (
          <h1 className="text-heading-md lg:text-heading-xl text-center">
            {title}
          </h1>
        ) : null}

        {description ? (
          <div className="max-w-[500px] mx-auto text-center text-lg">
            <SimpleBlockContent blocks={description} />
          </div>
        ) : null}
      </div>

      <div className="grid lg:grid-cols-2 gap-y-16 lg:gap-y-20 lg:gap-x-4 w-full">
        {locations.map((location) => (
          <div className="flex flex-col space-y-6" key={location._id}>
            <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">
              <div className="w-full h-full">
                <div className="w-full h-full relative">
                  <SanityImage
                    src={location.image}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl md2:text-[32px] font-light md2:leading-11">
                {location.title}
              </h2>

              <Link href={location.giftCardUrl}>
                <a className="font-avenir text-lg font-light leading-6 tracking-[0.05em] underline opacity-80 text-[#4A3419] uppercase">
                  Purchase Gift Card
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
