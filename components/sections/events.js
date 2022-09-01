import Event from "../event";

export default function Events(props) {

  const {events} = props;

  return (

    <section className='px-4 md:px-0 md:max-w-[93.3%] w-full mx-auto flex flex-col'>

      <div className="flex flex-col space-y-16">

        {

          events.map( event => {

            const {_key} = event;

            return (
              <Event key={_key} event={event} />
            )

          })

        }

      </div>
    </section>

  )

}
