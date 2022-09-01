import Image from "next/image"
import CollectionCard from "../collectionCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from "swiper";

export default function RestaurantsCarousel(props) {

  const {title, view_all, collections} = props;

  return (

    <section className="pl-4 md:pl-[3.33%] w-full flex flex-col pb-12 vw:pb-[3.333vw] relative">

      <div className="flex flex-col w-full space-y-2 vw:space-y-[.5vw] mb-8 md:mb-[52px] vw:mb-[3.61vw]">

        <h2 className="opacity-80 uppercase tracking-[.05em] text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.166] font-medium">
          {title}
        </h2>

        <a href={view_all.link} className="block uppercase tracking-[.05em] text-[10px] vw:text-[.694vw] leading-[11px] vw:leading-[1.1] font-medium">
          {view_all.title}
        </a>

      </div>

      <Swiper
        spaceBetween={16}
        slidesPerView={2.1}
        className="w-full"
        navigation={{
          prevEl: '.left-arrow',
          nextEl: '.right-arrow ',
        }}
        modules={[Navigation]}
        breakpoints = {{

          320: {
            slidesPerView: 1.08,
            spaceBetween: 12
          },
          768: {
            slidesPerView: 2.1,
            spaceBetween: 16,
          }

        }}
      >

        {collections && collections.map( collection => {

          const {_key} = collection;

          return(
            <SwiperSlide key={_key} className="flex flex-col w-full">
              <CollectionCard collection={collection} />
            </SwiperSlide>
            
          ) 

        })}

      </Swiper>

      <div className="absolute pl-[3.33%] bottom-0 left-0 flex items-center space-x-4 vw:space-x-[1.111vw]">

        <div className="left-arrow cursor-pointer w-[11px] vw:w-[.763vw]">
          <Image
            src="/images/prev.svg"
            alt="Next"
            width={11}
            height={19}
            layout="responsive"
          />
        </div>

        <div className="right-arrow cursor-pointer w-[11px] vw:w-[.763vw]">
          <Image
            src="/images/next.svg"
            alt="Next"
            width={11}
            height={19}
            layout="responsive"
          />
        </div>

      </div>

    </section>

  )

}
