import SanityImage from "../sanity-image";
import SimpleBlockContent from '@/components/simple-block-content'
import Link from "next/link"
import SanityLink from "../sanityLink"
import { socialMediasIcons } from "@/helpers/socialMedias";
import Image from "next/image";

export default function ImageWithText(props) {

  const {
    title,
    description,
    image,
    alt_text,
    position,
    links,
    socialMedias,
    alignment,
    imageAspectRatio,
    isPressPage,
    menus,
    imagesPosition,
    imagePositionTablet,
    locations,
    show_facebook_icon,
    facebook_link
  } = props;


  let isReservation = false;

  if(links?.title){
    isReservation = links?.title.toLowerCase()?.includes("reservation");
  }

  const socialMediasList = socialMedias?.socialMedias ?? [];

  const alignments = {
    top: "lg:items-start",
    center: "lg:items-center",
    bottom: "lg:items-end",
  }

  const aspectRatioDesktop = {
    "landscape": "lg:aspect-w-[1.3394] 3xl:aspect-w-[1.841]",
    "portrait": "lg:aspect-w-[1.0652] 3xl:aspect-w-[1.431]"
  }

  const aspectRatioDesktopPressPage = {
    "landscape": "lg:aspect-w-[1.297] 3xl:aspect-w-[1.641]",
    "portrait": "lg:aspect-w-[1.0652] 3xl:aspect-w-[1.431]"
  }


  const aspectRatioObject = isPressPage && isPressPage === true  ? aspectRatioDesktopPressPage : aspectRatioDesktop;

  const contentSize = {

    image: {
      "landscape" : "lg:w-[48.529%] 3xl:w-[49.239%]",
      "portrait" : "lg:w-[49.191%] 3xl:w-[48.8586%]"
    },

    text: {
      "landscape" : "lg:w-[51.471%] 3xl:w-[50.761%]",
      "portrait" : "lg:w-[50.809%] 3xl:w-[51.1414%]"
    }
    
  }

  return (

    <section
      className={`px-4 md:px-6 lg:px-0 lg:max-w-[94.4%] 3xl:max-w-[95.833%] w-full mx-auto flex flex-col lg:flex-row space-y-10 lg:space-y-0  justify-between 
        ${alignments[alignment]}
      `}
    >

      <div
        className={`w-full order-1 ${imageAspectRatio ? contentSize.image[imageAspectRatio] :  contentSize.image["landscape"]} ${ (isPressPage && isPressPage === true) && "3xl:!w-[45.32%]" }
        ${position == "firstImage" ? "lg:order-1" : "lg:order-2" }`
      }>  

        <div className={`aspect-w-[1.324] md:aspect-w-[2.687] ${imageAspectRatio ? aspectRatioObject[imageAspectRatio] : aspectRatioObject["landscape"] } aspect-h-1`}>        

          <div className="w-full h-full">
            <div className="w-full h-full relative">
              <SanityImage
                src={image}
                layout="fill"
                alt={alt_text ?? "Image"}
                className={`object-cover ${ (imagePositionTablet && imagePositionTablet == "bottom") && "md:object-bottom" } object-center ${ (imagesPosition && imagesPosition == "bottom")  ? "3xl:object-[0%_100%]" : "" }`}
              />
            </div>
          </div>

        </div>

     </div>

      <div
        className={`w-full  order-2 ${imageAspectRatio ? contentSize.text[imageAspectRatio] :  contentSize.text["landscape"]} flex flex-col 
        ${position == "firstImage" ? " lg:order-2 lg:pl-[9.86%] 3xl:pl-[10.86%] " : " lg:order-1 lg:pr-[9.86%] 3xl:pr-[10.86%]" }
        ${alignment == "top" && " lg:pt-[15px] vw:pt-[.78125vw] "}
        `
      }>        

        <h2
        className="font-light capitalize text-[32px] vw:text-[1.666vw] leading-[44px] vw:leading-[1.375] mb-6 vw:mb-[1.25vw]"
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
              className={`
                ${!isReservation ? 'mt-10 text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.38888] tracking-[.05em] opacity-80 uppercase underline font-light vw:mt-[2.08333vw]' : ''}
                ${isReservation ? 'mt-10 text-base leading-[1]  md2:text-lg vw:text-[.9375vw] md2:leading-[25px] vw:leading-[1.38888] tracking-[.05em] opacity-80 uppercase text-primary transition-colors hover:bg-primary hover:text-white font-avenir font-light py-2.5 px-[30px] border border-primary max-w-max' : ''}
              `}
            >
              {links?.title}
            </SanityLink>
          )
        }

        {
          
          (facebook_link && show_facebook_icon) && (

            <a href={facebook_link} className="block w-8 vw:w-[1.666vw] mt-5">

              <Image
                src={"/images/facebook.svg"}
                alt="facebook logo"
                layout="responsive"
                width={32}
                height={32}
              />

            </a>
            
          )
                      
        }

        {
          (socialMediasList && socialMediasList.length>0) && (

            <div className="mt-10 vw:mt-[2.08333vw] w-full flex items-center space-x-5 vw:space-x-[1.0416w]">

              {                
                socialMediasList.map(item => {

                  const {SocialMedia, link, _key} = item;
                
                  return ( 

                    link && (
                      
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
                                    
                  )
                })              
              }

            </div>
          )
        }

        {
          (menus && Array.isArray(menus) ) && (
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row mt-10 md:items-center md:space-x-6 vw:space-x-[1.25vw]">
              {
                menus.map(menu => {

                  const {_key,slug:{current}, title} = menu;

                  return(
                    <Link key={_key} href={`/menus/${props.slug}?menu=${current}`} passHref>
                      <a className="block font-light text-lg vw:text-[.9375vw] leading-[25px] vw:leading-[1.3888] tracking-[.05em] underline uppercase opacity-80">
                        {title}
                      </a>
                    </Link>
                  )

                })
              }
            </div>
          )
        }

        {
          locations && (

            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:flex-wrap mt-10 md:items-center md:max-w-[70%]">

              {
                [...locations].reverse().map( (location,i) => {

                  const {_id, slug:{current}, comming_soon, title} = location;

                  return(

                    <div key={_id}>

                      {
                        !comming_soon && (
                          <Link href={`/menus/${current}?menu=cocktail-menu`} passHref>
                            <a
                            className={`block font-light text-lg vw:text-[.9375vw] md:pb-[11px] vw:pb-[.5729vw] md:pr-6
                            vw:pr-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[.05em] underline uppercase
                            ${comming_soon ? "opacity-50 !cursor-not-allowed" : "opacity-80"} `}>
                              {title.split(",")[0]}
                            </a>
                          </Link>
                        )
                      }

                      {
                        comming_soon && (
                          <div                          
                          className={`block font-light text-lg vw:text-[.9375vw] md:pb-[11px] vw:pb-[.5729vw] md:pr-6
                          vw:pr-[1.25vw] leading-[25px] vw:leading-[1.3888] tracking-[.05em] underline uppercase
                          ${comming_soon ? "opacity-50 !cursor-not-allowed" : "opacity-80"} `}>
                            {title.split(",")[0]}
                          </div>
                        )
                      }

                    </div>
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

