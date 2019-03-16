import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import moment from 'moment'
import styled from 'styled-components'

const EventContainer = styled.div`
  a {
    color: #008aff;
    text-decoration: none;
  }

  blockquote {
    border-left: 5px solid #eee;
    padding-left: 26px;
    margin-left: 0;
    color: #808080;
    font-style: italic;
  }
`

const query = graphql`
  {
    allMeetupEvent(
      filter: { status: { eq: "upcoming" } }
      sort: { fields: local_date }
      limit: 20
    ) {
      edges {
        node {
          id
          name
          description
          local_date
          link
          internal {
            type
          }
        }
      }
    }
    allEventsJson(
      filter: { fields: { status: { eq: "upcoming" } } }
      sort: { fields: local_date }
      limit: 20
    ) {
      edges {
        node {
          id
          name
          local_date
          description
          link
          internal {
            type
          }
        }
      }
    }
  }
`

/**
 * Parse out first paragraph of event description
 * @param {string} desc - html string recieved from Meetup API
 */
function parseDescription(desc) {
  let findStr = "What we'll do<br/>"

  let idx = desc.indexOf(findStr)

  if (idx === -1) {
    findStr = '<p>'
    idx = desc.indexOf(findStr)
  }

  let idxEnd = desc.indexOf('</p>', idx)

  return desc.slice(idx + findStr.length, idxEnd)
}

function UpcomingMeetups() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        let meetups = data.allMeetupEvent.edges
        let staticEvents = data.allEventsJson.edges

        let sixWeeksMoment = moment().add(6, 'weeks')

        meetups = meetups.filter(evt => {
          let evtDate = moment(evt.node.local_date, 'YYYY-MM-DD')
          return sixWeeksMoment.diff(evtDate) >= 0
        })

        staticEvents = staticEvents.filter(evt => {
          let evtDate = moment(evt.node.local_date, 'YYYY-MM-DD')
          return sixWeeksMoment.diff(evtDate) >= 0
        })

        meetups.push(...staticEvents)

        meetups.sort((a, b) => {
          let aMoment = moment(a.node.local_date, 'YYYY-MM-DD')
          let bMoment = moment(b.node.local_date, 'YYYY-MM-DD')

          return aMoment.diff(bMoment)
        })

        return (
          <>
            <h2>Upcoming developer events</h2>
            {meetups.map(({ node }, idx) => {
              let description =
                node.internal.type === 'MeetupEvent'
                  ? parseDescription(node.description)
                  : node.description
              let parsedDate = moment(node.local_date, 'YYYY-MM-DD').format(
                'dddd, MMMM Do, YYYY'
              )

              return (
                <EventContainer key={node.id}>
                  <strong>
                    <time>{parsedDate}</time>
                  </strong>
                  <h4>
                    <a href={node.link}>{node.name}</a>
                  </h4>
                  <blockquote>
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                  </blockquote>
                  {idx !== meetups.length - 1 && <hr />}
                </EventContainer>
              )
            })}
          </>
        )
      }}
    />
  )
}

export default UpcomingMeetups
