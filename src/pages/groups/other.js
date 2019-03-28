import React from 'react'
import Layout from '../../components/layout'
import { graphql, useStaticQuery } from 'gatsby'
import EventLink from '../../components/EventLink'

const query = graphql`
  {
    allSyrEvent(
      filter: { meetup_group: { eq: "other" } }
      sort: { fields: local_date, order: DESC }
    ) {
      nodes {
        id
        name
        local_date(formatString: "MMMM DD, YYYY")
        link
      }
    }
  }
`

const OtherEventsPage = () => {
  const data = useStaticQuery(query)
  return (
    <Layout frontmatter={{ title: 'Other Events' }}>
      <p>
        Here are a variety of other events held by members of the Syracuse
        Developer Community
      </p>
      <section>
        {data.allSyrEvent.nodes.map(event => {
          return <EventLink event={event} key={event.id} />
        })}
      </section>
    </Layout>
  )
}

export default OtherEventsPage
