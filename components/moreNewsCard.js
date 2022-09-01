import SanityImage from "./sanity-image";

export default function MoreNewsCard({news}) {

  const {title, image, description, slug} = news;

  return (
    
    <div className="flex flex-col lg:grid lg:grid-cols-[35.90%_calc(64.1%-65px)] vw:grid-cols-[35.90%_calc(64.1%-4.513vw)] lg:gap-x-[65px] vw:gap-x-[4.513vw] w-full">

      <div className="w-full mb-4 vw:mb-[1.111vw]">
        <div className="w-full aspect-h-1 aspect-w-[1.435] md:aspect-w-[2.91] lg:aspect-w-[1.25]">
          <div className="w-full">
            <div className="w-full h-full relative">
              <SanityImage className="object-cover" src={image} alt="Event image" layout="fill"/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:justify-between h-full w-full">

        <div className="flex flex-col w-full mb-[32px] md:mb-20 lg:mb-0">

          <h3 className="font-extralight text-[24px] lg:text-[32px] vw:text-[2.222vw] leading-7 lg:leading-[37px] vw:leading-[1.156] tracking-[.05em] mb-8 lg:mb-5 vw:mb-[1.3888vw] md:max-w-[338px] lg:max-w-[616px] vw:max-w-[42.77vw]">
            {title}
          </h3>

          <div className="hidden lg:block text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.1666vw] font-light opacity-80 md:max-w-[533px] vw:max-w-[37.013vw]">
            {description}
          </div>

        </div>

        <a href={`/news/${slug.current}`} className="max-w-max flex items-center opacity-80">

          <p className="font-light md:font-normal text-[10px] vw:text-[.69444vw] leading-[13px] vw:leading-[1.3] tracking-[.05em] uppercase">
            View
          </p>

        </a>

      </div>

    </div>

  )
}
