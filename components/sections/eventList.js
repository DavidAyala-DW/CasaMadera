import EventListItem from "../eventListItem"
import React from 'react'

export default function EventList(props) {

  const {events} = props;

  return (
    <section className='w-full flex flex-col gap-10 md:gap-20'>
      {
        events.map((event) => {

          const {_key, active = false} = event;
          if(!active) return <></>;

          return (
            <EventListItem key={_key} event={event} />
          )

        })
      }
    </section>
  )
}
