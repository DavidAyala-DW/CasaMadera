import SanityImage from "./sanity-image";
import SimpleBlockContent from '@/components/simple-block-content'
import { useState } from "react";
import { useEffect } from "react";

const formatDate = (date) => {

  const options = {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
    hour: 'numeric', minute: 'numeric',
    hour12: true,
  };

  const dateObject = new Date(date);  
  const formatedDate = new Intl.DateTimeFormat('en-US', options).format(dateObject);

  return formatedDate;

};

export default function Event({event}) {

  const {
    title,
    description,
    image,
    alt_text,
    date,
    book_button_text,
    book_button_link
  } = event;

  const [parsedDate, setParsedDate] = useState("");

  useEffect( () => {
    setParsedDate(formatDate(date))
  }, [])

  return (
    
    <div className="flex flex-col space-y-4 md:space-y-0 lg:grid lg:grid-cols-[40.07%_55.48%] lg:gap-x-[53.5px] 3xl:gap-x-[2.78vw] w-full">

      <div className="w-full">
        <div className="w-full aspect-h-1 aspect-w-[1.435] lg:aspect-w-[1.25]">
          <div className="w-full">
            <div className="w-full h-full relative">
              <SanityImage
                className="object-cover"
                src={image}
                alt={alt_text ?? "Image"}
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:justify-between h-full w-full">

        <div className="flex flex-col w-full mb-11 vw:mb-[2.291vw]">

          <h3 className="text-[24px] lg:text-[32px] vw:text-[1.6666vw] leading-[33px] lg:leading-11 vw:leading-[1.375] font-light mb-2 vw:mb-[.41666vw]">
            {title}
          </h3>

          <div className="font-normal text-base vw:text-[.83333vw] leading-[1.5] opacity-[.85] mb-5 vw:mb-[1.0416vw]">
            {parsedDate}
          </div>

          <div className="font-normal text-base vw:text-[.8333vw] leading-[1.5] opacity-[.85] lg:max-w-[46.3vw]">

            {
              (description) && (
                <SimpleBlockContent blocks={description} />
              )
            }

          </div>

        </div>

        <a href={book_button_link} className="w-fit font-avenir text-base vw:text-[.85vw] tracking-[.05em] opacity-80 uppercase text-primary transition-colors hover:bg-primary hover:text-white font-light py-2 px-4 border border-primary">
          {book_button_text}
        </a>

      </div>

    </div>

  )
}