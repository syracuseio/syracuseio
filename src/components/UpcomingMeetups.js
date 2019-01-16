import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import moment from 'moment'

const query = graphql`
  {
    allMeetupEvent(
      filter: { status: { eq: "upcoming" } }
      sort: { fields: local_date }
      limit: 3
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
      render={data => (
        <>
          <h2>Upcoming developer events</h2>
          {data.allMeetupEvent.edges.map(({ node }) => {
            let description = parseDescription(node.description)
            let parsedDate = moment(node.local_date, 'YYYY-MM-DD').format(
              'dddd, MMMM Do, YYYY'
            )

            return (
              <div key={node.id}>
                <strong>
                  <time>{parsedDate}</time>
                </strong>
                <h4>
                  <a
                    style={{ color: '#008AFF', textDecoration: 'none' }}
                    href={node.link}
                  >
                    {node.name}
                  </a>
                </h4>
                <blockquote
                  style={{
                    borderLeft: '5px solid #eee',
                    paddingLeft: 26,
                    marginLeft: 0,
                    color: '#808080',
                    fontStyle: 'italic',
                  }}
                >
                  <p>{description}</p>
                </blockquote>
                <hr />
              </div>
            )
          })}
        </>
      )}
    />
  )
}

export default UpcomingMeetups