import { useEffect, useState } from "react";
import DetailCard from "../detailCard";

export default function Details(props) {

  const [featuredDetail, setFeaturedDetail] = useState();
  const {title, description, details} = props;

  useEffect(() => {
    const firstFeaturedDetail = details.find(detail => detail.featuredDetail == true);
    setFeaturedDetail(firstFeaturedDetail);
  }, []);

  return (

    <section className="px-4 md:px-0 md:max-w-[93.3%] w-full mx-auto flex flex-col">

      <div className="flex flex-col space-y-[60px] md:space-y-20 lg:space-y-0 lg:flex-row items-start lg:justify-between w-full mb-12 lg:mb-[136px] vw:mb-[9.444vw]">

        <div className="flex flex-col lg:max-w-[calc(50%-48px)] vw:max-w-[calc(50%-3.333vw)]">

          <h2 className="max-w-[64%] md:max-w-max tracking-[.05em] text-[24px] leading-[28px] md:text-[32px] vw:text-[2.222vw] md:leading-[37px] vw:leading-[1.56] font-extralight mb-6 vw:mb-[1.6666vw]">
            {title}
          </h2>

          <p className="tracking-[.05em] md:tracking-[unset] text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.1666] opacity-80 font-light md:max-w-[500px] lg:max-w-[400px] vw:max-w-[27.77vw]">
            {description}
          </p>
          
        </div>

        {
          featuredDetail && (
            <div className="w-full lg:max-w-[50%]">
              <DetailCard detail={featuredDetail} />
            </div>            
          )
        }

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-12 lg:gap-x-6 lg:gap-y-[148px] vw:gap-x-[1.666vw] vw:gap-y-[10.277vw]">
      
        {
          details.map( detail => {

            if(JSON.stringify(detail) == JSON.stringify(featuredDetail) ) return;

            const {_key } = detail;

            return(
              <DetailCard detail={detail} key={_key} />
            )

          })
        }

      </div>

    </section>

  )

}
