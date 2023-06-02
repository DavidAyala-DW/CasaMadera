import React from 'react'
import EventListItem from '../eventListItem'

export default function EventList(props) {
  const { events } = props

  return (
    <section className="w-full flex flex-col gap-10 md:gap-20">
      {events.map((event) => (
        <EventListItem key={event._id} event={event} />
      ))}
    </section>
  )
}
