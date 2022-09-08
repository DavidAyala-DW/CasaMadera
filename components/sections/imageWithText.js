import SanityImage from "../sanity-image";
import SimpleBlockContent from '@/components/simple-block-content'
import SanityLink from "../sanityLink"
import { socialMediasIcons } from "@/helpers/socialMedias";
import Image from "next/image";

export default function ImageWithText(props) {

  const {
    title,
    description,
    image,
    position,
    links,
    socialMedias,
    alignment
  } = props;

  const socialMediasList = socialMedias?.socialMedias ?? [];

  const alignments = {
    top: "lg:items-start",
    center: "lg:items-center",
    bottom: "lg:items-end",
  }

  return (

    <section
      className={`pl-4 pr-[11px] md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col lg:flex-row space-y-10 lg:space-y-0  justify-between 
        ${alignments[alignment]}
      `}
    >

      <div
        className={`w-full lg:w-1/2 order-1
        ${position == "firstImage" ? "lg:order-1" : "lg:order-2" }`
      }>  

        <div className={`aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.382] 3xl:aspect-w-[1.844] aspect-h-1`}>        

          <div className="w-full h-full">
            <div className="w-full h-full relative">
              <SanityImage src={image} layout="fill" alt="Image" className="object-cover object-top" />
            </div>
          </div>

        </div>

     </div>


      <div
        className={`w-full lg:w-1/2 order-2 flex flex-col 
        ${position == "firstImage" ? "lg:order-2 lg:pl-[9.86%]" : "lg:order-1 lg:pr-[9.86%]" }
        ${alignment == "top" && "lg:pt-[15px] vw:pt-[.78125vw]"}
        `
      }>        

        <h2
        className="font-light md:tracking-[.05em] capitalize text-[32px] vw:text-[1.666vw] leading-[44px] vw:leading-[1.375] mb-6 vw:mb-[1.25vw]"
        >
          {title}
        </h2>

        <div className="opacity-[.85] text-base vw:text-[.8333vw] leading-[1.5] font-normal md:max-w-[500px] lg:max-w-[507px] vw:max-w-[26.40625vw] w-full">
          <SimpleBlockContent blocks={description} />
        </div>

        {
          links && (
            <SanityLink
              {...{links}}
              className="mt-10 text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.38888] tracking-[.05em] opacity-80 uppercase underline font-light vw:mt-[2.08333vw]"
            >
              {links?.title}
            </SanityLink>
          )
        }

        {
          socialMediasList && (

            <div className="mt-10 vw:mt-[2.08333vw] w-full flex items-center space-x-5 vw:space-x-[1.0416w]">

              {                
                socialMediasList.map(item => {

                  const {SocialMedia, link, _key} = item;
                
                  return ( 
                
                    <a
                      href={link}
                      key={_key}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-8 vw:w-[1.666vw]"
                    >
                      <Image
                        src={socialMediasIcons[SocialMedia].url}
                        width={32}
                        height={32}
                        layout="responsive"
                        alt="social media"
                      />
                
                    </a>
                    
                  )
                })              
              }

            </div>
          )
        }

      </div>

    </section>

  )

}

