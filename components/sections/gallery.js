import SanityImage from '../sanity-image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Gallery(props) {

  const {gallery} = props;

  return (

    <section className="w-full 3xl:max-w-[93.3%] 3xl:mx-auto  flex flex-col relative">

      <Swiper
        loop={true}
        spaceBetween={24}
        slidesPerView={"auto"}
        initialSlide={1}
        onSwiper={ (swiper) => {

          // if(typeof window !== 'undefined'){
          //   swiper.slideTo(2,500)
          // }
          
        }}
        className="w-full gallery"
        breakpoints = {{

          320: {
            spaceBetween: 9,
            initialSlide: 1
          },
          768: {
            spaceBetween: 24,
            initialSlide: 0
          },
          1024: {
            spaceBetween: 24,
            initialSlide: 1
          },
          1920: {
            spaceBetween: 24,
            initialSlide: 0
          }

        }}
      >
        {
          gallery.map(item => {

            const {_key, image, format} = item;

            const formats = {

              "format-1": "!w-[37.6%] md:!w-[19.623%] lg:!w-[22.847%] 3xl:!w-[18.092%] h-auto !pt-[22.5vw]",
              "format-2": "!w-[38.66%] md:!w-[19.623%] lg:!w-[27.5%] 3xl:!w-[21.71%] h-auto !pt-[9.65vw]",
              "format-3": "!w-[63.2%] md:!w-[31.989%] lg:!w-[44.79%] 3xl:!w-[35.36%] h-full",
              "format-4": "!w-[37.6%] md:!w-[34.408%] md:!max-h-[206px] lg:!max-h-max lg:!w-[26.66%] 3xl:!w-[21.05%] h-auto !pt-[3.47vw]"

            }

            return(
              <SwiperSlide key={_key} className={`overflow-hidden ${formats[format]}`}>
                <SanityImage src={image} className="w-full object-cover" layout={"responsive"} />
              </SwiperSlide>
            )

          })
        }
      </Swiper>

      {/* <div className="flex items-start space-x-2 md:space-x-6 w-full">
      {
          gallery.map(item => {

            const {_key, image, format} = item;

            const formats = {

              "format-1": "w-[9.94%] h-auto pt-[22.5vw]",
              "format-2": "w-[28.94%] h-auto pt-[9.65vw]",
              "format-3": "w-[47.14%] h-full",
              "format-4": "w-[13.96%] h-auto pt-[3.47vw]"

            }

            return(
              <div className={`${formats[format]}`} key={_key}>
                <SanityImage src={image} className={`object-cover`} layout={"responsive"} />
              </div>
            )

          })
        }
      </div> */}

    </section>

  )

}
