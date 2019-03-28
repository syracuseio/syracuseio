import React from 'react'

const EventLink = props => {
  let { event } = props

  return (
    <article style={{ marginBottom: 10 }}>
      <a href={event.link}>
        {event.local_date}
        {` `}-{` `}
        {event.name}
      </a>
    </article>
  )
}

export default EventLink
