import { useRouter } from 'next/router'
import SimpleBlockContent from '@/components/simple-block-content'
import Link from "next/link";

export default function TextContentCenter(props) {

  const {
    title,
    description,
    description2,
    learn_more,
    mobileAlignment,
    titleSize,
    descriptionContent,
    locations,
    show_menu_buttton,
    is_h1
  } = props;


  let isReservation = false;
  if(learn_more?.title){    
    isReservation = learn_more?.title.toLowerCase().includes("reservation");
  }

  const router = useRouter()
  const {asPath} = router;

  return (

    <section className='px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col'>
      
      <div className="flex flex-col">

        {
          is_h1 ? (
            <h1 className={`capitalize
              ${(mobileAlignment && mobileAlignment == "left") ? "text-left md:text-center" : "text-center" }
              ${ (titleSize && titleSize == "large") && "text-[40px] lg:text-[48px] vw:text-[2.5vw] leading-[1.2] lg:leading-[66px] vw:leading-[1.375]"}
              ${ (titleSize && titleSize == "normal") && "text-[32px] lg:text-[32px] vw:text-[1.666vw] leading-[1.2] lg:leading-[44px] vw:leading-[1.375]"}
              ${ (titleSize && titleSize == "small") && "text-[24px] lg:text-[32px] vw:text-[1.666vw] leading-[1.2] lg:leading-[44px] vw:leading-[1.375]"}
              font-light mb-6 lg:mb-4 vw:mb-[.8333vw]
            `}>
              {title}
            </h1>            
          ) : (
            <h2 className={`capitalize
              ${(mobileAlignment && mobileAlignment == "left") ? "text-left md:text-center" : "text-center" }
              ${ (titleSize && titleSize == "large") && "text-[40px] lg:text-[48px] vw:text-[2.5vw] leading-[1.2] lg:leading-[66px] vw:leading-[1.375]"}
              ${ (titleSize && titleSize == "normal") && "text-[32px] lg:text-[32px] vw:text-[1.666vw] leading-[1.2] lg:leading-[44px] vw:leading-[1.375]"}
              ${ (titleSize && titleSize == "small") && "text-[24px] lg:text-[32px] vw:text-[1.666vw] leading-[1.2] lg:leading-[44px] vw:leading-[1.375]"}
              font-light mb-6 lg:mb-4 vw:mb-[.8333vw]
            `}>
              {title}
            </h2>
          )
        }

        <div className={`
          ${(mobileAlignment && mobileAlignment == "left") ? "text-left md:text-center" : "text-center" }
          md:max-w-[500px] mx-auto text-base vw:text-[.8333vw] leading-[1.5] opacity-80 mb-10 vw:mb-[2.08333vw]
          ${ (descriptionContent && descriptionContent == "small") && "lg:max-w-[551px] vw:max-w-[28.69vw]"}
          ${ (descriptionContent && descriptionContent == "normal") && "lg:max-w-[572px] vw:max-w-[29.791vw]"}
          ${ (descriptionContent && descriptionContent == "large") && "lg:max-w-[678px] vw:max-w-[35.3125vw]"}
          `}
        >

          {
            (description && !description2) && (
              <p>
              {description}
              </p>              
            )
          }

          {
            (description2) && (
              <SimpleBlockContent blocks={description2} />
            )
          }

        </div>

        <div className="flex items-center space-x-6 max-w-max mx-auto">

          {
            (learn_more && !isReservation) && (

              <Link href={learn_more?.link} passHref>

                <a
                  className={`
                    block ${(mobileAlignment && mobileAlignment == "left") ? "mr-auto md:mx-auto" : "mx-auto" }
                    max-w-max text-center uppercase opacity-80 tracking-[.05em] text-lg leading-[25px] vw:text-[.9375vw] vw:leading-[1.3888] font-light underline
                  `}                
                >
                  {learn_more?.title}
                </a>

              </Link>

            )
          }

          {
            (learn_more && isReservation) && (

              <Link href={learn_more?.link} passHref>

                <a
                  className="text-primary transition-colors hover:bg-primary hover:text-white font-avenir tracking-[0.05em] font-light text-base leading-[1] md2:text-lg md2:leading-[25px] uppercase opacity-80 py-2.5 px-[30px] border border-primary"
                >
                  {learn_more?.title}
                </a>

              </Link>

            )
          }

          {
            show_menu_buttton && (
              <Link href={asPath.replace("locations","menus")} passHref>

                <a
                  className={`
                    max-w-max text-center uppercase opacity-80 tracking-[.05em] text-lg leading-[25px] vw:text-[.9375vw] vw:leading-[1.3888] font-light
                  `}                
                >
                  MENUS
                </a>

              </Link>
            )
          }

        </div>

        {
          locations && (

            <div className="flex items-center space-x-6 max-w-max mx-auto">

              {
                [...locations].reverse().map(location => {

                  const {_id, slug:{current}, comming_soon, title} = location;

                  return (
                    <div key={_id}>

                      {
                          !comming_soon && (
                            <Link href={`/menus/${current}?menu=dinner-menu`} passHref>
                              <a
                              className={`
                                block text-lg leading-[25px] tracking-[.05em] font-light underline text-[#4A3419] uppercase opacity-80
                              `}>
                                {title.split(",")[0]}
                              </a>
                            </Link>
                          )
                        }

                        {
                          comming_soon && (
                            <div                          
                            className={`
                              block text-lg leading-[25px] tracking-[.05em] font-light underline text-[#4A3419] uppercase opacity-50 !cursor-not-allowed
                            `}>
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
