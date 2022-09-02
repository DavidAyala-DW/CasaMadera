import SanityImage from "../sanity-image";
import SimpleBlockContent from '@/components/simple-block-content'

export default function ImageWithText(props) {

  const {title, description, image, position} = props;

  return (

    <section className="px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col lg:flex-row  space-y-5 lg:space-y-0 lg:items-center justify-between">

      <div
        className={`w-full lg:w-1/2 order-1
        ${position == "firstImage" ? "lg:order-1" : "lg:order-2" }`
      }>  

        <div className={`aspect-w-[1.435] md:aspect-w-[2.9121] lg:aspect-w-[1.34] aspect-h-1`}>        

          <div className="w-full h-full">
            <div className="w-full h-full relative">
              <SanityImage src={image} layout="fill" alt="Image" className="object-cover object-top" />
            </div>
          </div>

        </div>

     </div>


      <div
        className={`w-full lg:w-1/2 order-2 flex flex-col space-y-6 vw:space-y-[1.666vw]
        ${position == "firstImage" ? "lg:order-2 lg:pl-[9.86%]" : "lg:order-1 lg:pr-[9.86%]" }`
      }>        

        <h2 className="tracking-[.05em] capitalize text-[28px] md:text-[24px] lg:text-[32px] leading-[32px] md:leading-[28px] lg:leading-[37px] vw:text-[2.222vw] vw:leading-[1.156] font-extralight">
          {title}
        </h2>

        <div className="opacity-80 text-lg leading-[21px] vw:text-[1.25vw] vw:leading-[1.1666] font-light md:max-w-[500px] lg:max-w-[400px] vw:max-w-[27.77vw]">
          <SimpleBlockContent blocks={description} />
        </div>

      </div>

    </section>

  )

}
