import React from 'react'
import Layout from '../../components/layout'
import { StaticQuery, graphql } from 'gatsby'

const OtherEventsPage = () => (
  <Layout>
    <h1 style={{ textAlign: 'center' }}>Other Events</h1>
    <p>
      Here are a variety of other events held by members of the Syracuse
      Developer Community
    </p>
    <StaticQuery
      query={graphql`
        {
          allSyrEvent(
            filter: { meetup_group: { eq: "other" } }
            sort: { fields: local_date, order: DESC }
          ) {
            edges {
              node {
                name
                local_date(formatString: "MMMM DD, YYYY")
                link
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <section>
            {data.allSyrEvent.edges.map(e => {
              return (
                <article key={e.node.id} style={{ marginBottom: 10 }}>
                  <a href={e.node.link}>
                    {e.node.local_date}
                    {` `}-{` `}
                    {e.node.name}
                  </a>
                </article>
              )
            })}
          </section>
        )
      }}
    />
  </Layout>
)

export default OtherEventsPage
