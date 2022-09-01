export default function TextContentCenter(props) {

  const {title, description, learn_more} = props;

  return (

    <section className='px-4 md:px-0 md:max-w-[93.3%] w-full mx-auto flex flex-col'>
      
      <div className="flex flex-col space-y-6 vw:space-y-[1.666vw]">

        <h2 className="uppercase opacity-80 tracking-[.05em] text-center text-base md:text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.166] font-medium">
          {title}
        </h2>

        <h3 className="text-center max-w-[708px] vw:max-w-[49.16vw] mx-auto tracking-[.05em] text-[24px] md:text-[32px] vw:text-[2.22vw] leading-[1.2] opacity-80 font-light">
          {description}
        </h3>

        <a
          className="block max-w-max mx-auto text-center uppercase opacity-80 tracking-[.05em] text-[10px] leading-[11px] vw:text-[.694vw] vw:leading-[1.1] font-light"
          href={learn_more.link}
        >
          {learn_more.title}
        </a>

      </div>
      
    </section>

  )

}
