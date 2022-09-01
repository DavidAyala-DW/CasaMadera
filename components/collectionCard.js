import Image from "next/image"
import SanityImage from './sanity-image'

export default function CollectionCard({collection}) {
  
  const {title, location, image, link} = collection;

  return (
    <div className="relative w-full aspect-w-[1.37] md:aspect-w-[1.34] aspect-h-1">

      <div className="w-full h-full">
        <a href={link} className="h-full block w-full relative">
          <SanityImage className="w-full h-full"  src={image} layout={"fill"}/> 
        </a>
      </div>

      <div className="absolute w-full h-full inset-0 flex flex-col justify-end pb-5 vw:pb-[1.3888vw] pl-4 md:pl-6 vw:pl-[1.66vw] pr-7 md:pr-9 vw:pr-[2.5vw]">

        <div className="flex items-end lg:items-center justify-between">

          <div className="flex flex-col space-y-2 vw:space-y-[.5vw]">
      
            <h3 className="uppercase tracking-[.05em] text-[20px] lg:text-[24px] vw:text-[1.66vw] leading-[23px] lg:leading-[28px] vw:leading-[1.166] font-medium">
              {title}
            </h3>

            <p className="opacity-80 max-w-[260px] lg:max-w-full text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.166] font-medium">
              {location}
            </p>
            
          </div>

          <a className="block w-[11px] vw:w-[.763vw]" href={link}>
            <Image
              src="/images/whiteRightArrow.svg"
              alt="white arrow"
              width={11}
              height={19}
              layout="responsive"
            />
          </a>

        </div>

      </div>
      
    </div>
  )

}
