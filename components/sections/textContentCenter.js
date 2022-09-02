export default function TextContentCenter(props) {

  const {title, description, learn_more, mobileAlignment} = props;

  return (

    <section className='px-4 md:px-0 md:max-w-[94.4%] w-full mx-auto flex flex-col'>
      
      <div className="flex flex-col">

        <h2 className={`capitalize
          ${(mobileAlignment && mobileAlignment == "left") ? "text-left md:text-center" : "text-center" }
          text-[40px] lg:text-[48px] vw:text-[3.333vw] leading-[1.2] lg:leading-[66px] vw:leading-[1.375] font-light mb-6 lg:mb-4 vw:mb-[1.111vw]
        `}>
          {title}
        </h2>

        <p className={`
          ${(mobileAlignment && mobileAlignment == "left") ? "text-left md:text-center" : "text-center" }
          md:max-w-[500px] lg:max-w-[572px] vw:max-w-[39.7222vw] mx-auto text-base vw:text-[1.111vw] leading-[1.5] opacity-80 mb-10 vw:mb-[2.777vw]`
        }>
          {description}
        </p>

        <a
          className={`
            block ${(mobileAlignment && mobileAlignment == "left") ? "mr-auto md:mx-auto" : "mx-auto" }
            max-w-max text-center uppercase opacity-80 tracking-[.05em] text-lg leading-[25px] vw:text-[1.25vw] vw:leading-[1.3888] font-light underline
          `}
          href={learn_more.link}
        >
          {learn_more.title}
        </a>

      </div>
      
    </section>

  )

}
