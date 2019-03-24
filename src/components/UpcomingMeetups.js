import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import moment from 'moment'
import styled from 'styled-components'

const EventContainer = styled.div`
  margin-top: 20px;

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
  // If desc is not html, pass it through
  if (desc[0] !== '<') return desc

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
        let meetups = data.allSyrEvent.edges
        let sixWeeksMoment = moment().add(6, 'weeks')

        meetups = meetups.filter(evt => {
          let evtDate = moment(evt.node.local_date, 'YYYY-MM-DD')
          return sixWeeksMoment.diff(evtDate) >= 0
        })

        return (
          <>
            <h2>Upcoming developer events</h2>
            {meetups.map(({ node }, idx) => {
              let description = parseDescription(node.description)
              let dateMomentObj = moment(node.local_date, 'YYYY-MM-DD')

              let parsedDate = dateMomentObj.format('dddd, MMMM Do, YYYY')

              return (
                <EventContainer key={node.id}>
                  <strong>
                    <time>{parsedDate}</time>{' '}
                    <span style={{ color: '#646464', fontWeight: '500' }}>
                      ({dateMomentObj.fromNow()})
                    </span>
                  </strong>
                  <h4 style={{ marginTop: 0 }}>
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
