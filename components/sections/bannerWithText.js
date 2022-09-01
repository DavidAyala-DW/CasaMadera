import BackgroundImage from "../backgroundImage";
import SimpleBlockContent from '@/components/simple-block-content'

export default function BannerWithText(props) {

  const {title, description, description_container, learn_more, backgroundImage, image_size} = props;

  const description_container_ratio = {
    "format-1": "md:max-w-[400px] vw:max-w-[27.77vw]",
    "format-2": "md:max-w-[533px] vw:max-w-[37.01vw]",    
  }

  const ratio = {
    "format-1": "aspect-w-[1.150] md:aspect-w-[2.289] lg:aspect-w-[3.26] 3xl:aspect-w-[4.38]",
    "format-2": "aspect-w-[.70] md:aspect-w-[2.286] lg:aspect-w-[1.7] 3xl:aspect-w-[2.28]",
    "original": "",
  }

  return (

    <section className="lg:max-w-[93.3%] w-full mx-auto flex flex-col space-y-4 lg:space-y-11 vw:space-y-[3.05vw]">

      <div className={`w-full aspect-h-1 ${image_size ? ratio[image_size] : ratio["original"]}`}>
        <div className="w-full h-full">

          <div className="relative w-full h-full">
            <BackgroundImage {...{...backgroundImage}} className="object-cover" layout={(image_size && image_size != "original" ? "fill" : "responsive"  )} />
          </div>

        </div>
      </div>
      
      <div className="flex flex-col px-4 md:px-10 lg:px-0 ">

        <h2 className="tracking-[.05em] font-extralight text-[24px] lg:text-[32px] vw:text-[2.222vw] leading-[28px] lg:leading-[37px] vw:leading-[1.156] mb-6 vw:mb-[1.666vw]">
          {title}
        </h2>

        <div className={`opacity-80 text-lg leading-[21px]
        ${description_container ?  description_container_ratio[description_container] : description_container_ratio["format-1"] }
        vw:text-[1.25vw] vw:leading-[1.1666] font-light mb-8 vw:mb-[2.222vw]`
        }>
          <SimpleBlockContent blocks={description} />
        </div>

        <a className="block font-light text-[10px] vw:text-[.694vw] leading-[13px] vw:leading-[1.3] tracking-[.05em] uppercase" href={learn_more.link}>
          {learn_more.title}
        </a>

      </div>

    </section>

  )
}
