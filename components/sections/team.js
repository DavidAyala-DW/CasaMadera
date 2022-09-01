import MemberCard from '../memberCard';

export default function Team(props) {

  const {title, description, team} = props;

  return (

    <section className="px-4 md:px-0 md:max-w-[93.3%] w-full mx-auto flex flex-col space-y-[60px] lg:space-y-0 lg:flex-row lg:justify-between">

      <div className="flex flex-col space-y-6 vw:space-y-[1.666vw] md:max-w-[500px] lg:max-w-[400px] vw:max-w-[27.777vw] w-full">

        <h2 className="text-[24px] md:text-[32px] vw:text-[2.222vw] leading-[28px] md:leading-[37px] vw:leading-[1.156] tracking-[.05em] font-extralight">
          {title}
        </h2>

        <p className="text-lg vw:text-[1.25vw] leading-[21px] vw:leading-[1.1666vw] opacity-80 font-light tracking-[.05em] md:tracking-[unset]">
          {description}
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-[32px] vw:gap-x-[2.222vw] gap-y-6 lg:gap-y-[30px] vw:gap-y-[2.08vw] w-full lg:max-w-[54.5vw]">

        {
          team.map( member => {

            const {_key} = member;
            return (
              <MemberCard key={_key} member={member}/>
            )

          })
        }

      </div>

    </section>

  )

}
