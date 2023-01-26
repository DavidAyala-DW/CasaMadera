import SanityImage from "../sanity-image";
import Link from "next/link";

export default function Reservations(props) {

  const {title, reservations} = props;
  return (

    <>

      <section
      className="px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col pt-[162px] pb-[100px]"      
      >

        <h1 className="font-light text-center text-[48px] leading-[66px] mb-5">
          {title}
        </h1>

      </section>

      <section className={`px-6 md:px-0 md:max-w-[94.4%] 3xl:max-w-[95%] w-full mx-auto flex flex-col`}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0 lg:gap-x-4 w-full">

          {
            reservations && reservations.map(reservation => {

              const {_key, image, alt_text, reservation_link, heading} = reservation;

              return ( 

                <div className="flex flex-col space-y-6" key={_key}>

                  <div className="flex flex-col w-full aspect-h-1 aspect-w-[1.324] md:aspect-w-[2.687] lg:aspect-w-[1.349] 3xl:aspect-w-[1.837]">

                    <div className="w-full h-full">
                      <div className="w-full h-full relative">
                        <SanityImage
                          alt={alt_text ?? "Image"}
                          src={image}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                    </div>

                  </div>
      
                  <div className="flex flex-col space-y-4">

                    <h2 className="text-[32px] cursor-pointer font-light leading-11">
                      {heading}
                    </h2>
      
                    <Link href={reservation_link } passHref>
                      <a className="!font-avenir text-lg font-light leading-6 tracking-[0.05em] underline opacity-80 text-[#4A3419] uppercase">
                        Reservations
                      </a>
                    </Link>
      
                  </div>
      
                </div> 

              )

            })
          }

        </div>

      </section>

    </>

  )

}
