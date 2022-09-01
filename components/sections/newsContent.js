import SanityImage from "../sanity-image";

export default function NewsContent(props) {

  const {show, query} = props;
  
  if(!query) return (<></>);

  const {
    title = "",
    description = "",
    link = {},
    image = ""
  } = query;
  
  return (  

    <>

      {( show && query !== undefined) && (

        <section
            className="px-4 md:px-0 md:max-w-[93.3%] w-full mx-auto flex flex-col pt-[107px] md:pt-[142px] vw:pt-[9.86vw]"
          >   

            <div className="flex flex-col mb-12 md:mb-[38px] vw:mb-[2.63vw]">

              <h1 className="tracking-[.05em] leading-7 md:leading-[37px] vw:leading-[1.156] text-[24px] md:text-[32px] vw:text-[2.222vw] font-extralight mb-6 md:mb-4 lg:mb-3 vw:mb-[.8333vw]">
                {title}
              </h1>
        
              <p className="hidden md:block font-light text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.166] opacity-80 mb-5 vw:mb-[1.3888vw]">
                Tuesday 24, May 2022  7:00PM
              </p>

              <div className="font-light text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.1666vw] opacity-80 mb-8 md:max-w-[470px] lg:max-w-[880px] vw:max-w-[61.111vw]">
                {description}
              </div>

              <a className="block tracking-[.05em] uppercase text-[10px] vw:text-[.6944vw] leading-[13px] vw:leading-[1.3] font-light" href={link.url}>
                {link.title}
              </a>

            </div>  

            <div className="w-full aspect-h-1 aspect-w-[1.055] md:aspect-w-[1.45] lg:aspect-w-[1.7]">
              <div className="w-full h-full">
                <div className="relative w-full h-full">
                  <SanityImage src={image} layout={"fill"} className="object-cover"/>
                </div>
              </div>
            </div>       

        </section>

      )}

    </>

  )

}
