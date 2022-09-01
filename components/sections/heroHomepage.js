import BackgroundImage from "../backgroundImage";
import SimpleBlockContent from '@/components/simple-block-content'

const HeroHomepage = (props) => {

  const {title, description, reservation, backgroundImage} = props;

  return (

     <section className="px-4 md:px-6 lg:px-0 lg:max-w-[93.3%] w-full mx-auto flex flex-col space-y-8 md:space-y-[37px] lg:space-y-8 vw:space-y-[2.22vw]">

      <div className="w-full">
        <BackgroundImage {...{...backgroundImage,priority:true}} />
      </div>

      <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6 vw:space-x-[1.666vw] w-full">
        
        <h1
        className="max-w-[80%] md:max-w-[70.7%] lg:max-w-[calc(50%-20px)] vw:max-w-[calc(50%-1.666vw)] w-full
        uppercase text-[32px] lg:text-[40px] vw:text-[2.777vw] leading-[1.2] tracking-[.05em] opacity-90 font-extralight"
        >
          {title}
        </h1>

        <div className="flex flex-col space-y-10 lg:space-y-12 vw:space-y-[3.333vw] w-full">

          <div className="font-extralight opacity-80 md:max-w-[71.83%] lg:max-w-full leading-[1.5] text-[20px] vw:text-[1.388vw]">
            <SimpleBlockContent blocks={description} />
          </div>

          <a href={reservation.link} className="block opacity-80 tracking-[.05em] uppercase text-[10px] vw:text-[0.69vw] leading-[11px] vw:leading-[1.1] font-extralight">
            {reservation.label}
          </a>

        </div>

      </div>

    
    </section>

  );

}

export default HeroHomepage;
