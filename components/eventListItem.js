import SanityImage from "./sanity-image";
import SimpleBlockContent from '@/components/simple-block-content'

export default function EventListItem({event}) {

  const {
    title,
    description,
    image,
    alt_text,
    date = "",
    locations = [],
    book_button_text,
    book_button_link
  } = event;

  return (
    
    <div className="px-4 md:px-6 lg:px-0 lg:max-w-[94.4%] 3xl:max-w-[95.833%] w-full mx-auto flex flex-col lg:flex-row space-y-10">

      <div className="w-full order-1 lg:w-[48.529%] 3xl:w-[49.239%] lg:order-1">
        <div className="aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.3394] 3xl:aspect-w-[1.841] aspect-h-1">
          <div className="w-full h-full">
            <div className="w-full h-full relative">
              <SanityImage
                src={image}
                layout="fill"
                alt={alt_text ?? "Image"}
                className="transition duration-200 object-cover false object-center "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full order-2 lg:w-[51.471%] 3xl:w-[50.761%] flex flex-col  lg:order-2 lg:pl-[9.86%] 3xl:pl-[10.86%]">

        {
          locations?.length > 0 && (
              <div className="flex flex-col mb-5 gap-1">
                {
                  locations.map((location) => {                    
                    return (
                      <div key={location} className="font-normal text-sm vw:text-[.83333vw] leading-[1.5] opacity-[.85] vw:mb-[1.0416vw]">
                        {location}
                      </div>
                    )
                  })
                }
              </div>   
            )
          }

        <h2
          className="font-light capitalize text-[32px] vw:text-[1.666vw] leading-[44px] vw:leading-[1.375] mb-6 vw:mb-[1.25vw]"
        >
          {title}
        </h2>

        <div className="font-normal italic text-base vw:text-[.83333vw] leading-[1.5] opacity-[.85] mb-5 vw:mb-[1.0416vw]">
          {date}
        </div>

        <div className="opacity-[.85] text-base vw:text-[.8333vw] leading-[1.5] font-normal md:max-w-[500px] lg:max-w-[507px] vw:max-w-[26.40625vw] w-full hide-empty-paragraphs">
          <SimpleBlockContent blocks={description} />
        </div>

        <a href={book_button_link} className="mt-10 w-fit font-avenir text-base vw:text-[.85vw] tracking-[.05em] opacity-80 uppercase text-primary transition-colors hover:bg-primary hover:text-white font-light py-2 px-4 border border-primary">
          {book_button_text}
        </a>

      </div>

    </div>              
  )
}