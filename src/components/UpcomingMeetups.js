import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import moment from 'moment'
import EventPreviewCard from './EventPreviewCard'

const query = graphql`
  {
    allSyrEvent(
      filter: { status: { eq: "upcoming" } }
      sort: { fields: local_date }
      limit: 30
    ) {
      edges {
        node {
          id
          name
          description
          local_date
          link
          meetup_group
          display_name
        }
      }
    }
  }
`

function UpcomingMeetups() {
  let data = useStaticQuery(query)

  let meetups = data.allSyrEvent.edges
  let sixWeeksMoment = moment().add(6, 'weeks')

  meetups = meetups.filter(evt => {
    let evtDate = moment(evt.node.local_date)
    return sixWeeksMoment.diff(evtDate) >= 0
  })

  return (
    <>
      <h2>Upcoming developer events</h2>
      {meetups.map(({ node }, idx) => (
        <EventPreviewCard
          meetup={node}
          idx={idx}
          numMeetups={meetups.length}
          key={node.id}
        />
      ))}
    </>
  )
}

export default UpcomingMeetups
