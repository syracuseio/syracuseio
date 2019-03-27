import React from 'react'
import Layout from '../../components/layout'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  {
    allSyrEvent(
      filter: { meetup_group: { eq: "other" } }
      sort: { fields: local_date, order: DESC }
    ) {
      nodes {
        ...EventLinkData
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
          return (
            <article key={event.id} style={{ marginBottom: 10 }}>
              <a href={event.link}>
                {event.local_date}
                {` `}-{` `}
                {event.name}
              </a>
            </article>
          )
        })}
      </section>
    </Layout>
  )
}

export default OtherEventsPage
