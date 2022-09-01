import BackgroundImage from "../backgroundImage";

export default function Hero(props) {

  const {backgroundImage} = props;

  return (

    <section className="w-full flex flex-col">

      <div className={`w-full aspect-h-1  aspect-w-[1.82] md:aspect-w-[2.038] lg:aspect-w-[2.651] 3xl:aspect-w-[3.926]`}>
        <div className="w-full h-full">

          <div className="relative w-full h-full">
            <BackgroundImage {...{...backgroundImage}} className="object-cover" layout="fill" />
          </div>

        </div>
      </div>

    </section>

  )

}
