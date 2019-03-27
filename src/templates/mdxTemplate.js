import React from 'react'
import { MDXRenderer } from 'gatsby-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

function NextMeetup(props) {
  let { data } = props

  return (
    data.upcomingMeetup.nodes.length > 0 && (
      <section>
        <h2>Next Event</h2>
        <a href={data.upcomingMeetup.nodes[0].link}>
          {data.upcomingMeetup.nodes[0].local_date}
          {` `}-{` `}
          {data.upcomingMeetup.nodes[0].name}
        </a>
      </section>
    )
  )
}

function ArchivedMeetups(props) {
  let { data } = props

  return (
    data.archivedEvents.nodes.length > 0 && (
      <section>
        <h2>Past Events</h2>
        {data.archivedEvents.nodes.map(event => {
          return (
            <article
              key={event.id}
              style={{
                marginBottom: 10,
              }}
            >
              <a href={event.link}>
                {event.local_date}
                {` `}-{` `}
                {event.name}
              </a>
            </article>
          )
        })}
      </section>
    )
  )
}

const MDXTemplate = ({ data }) => (
  <Layout frontmatter={data.mdx.frontmatter}>
    <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
    <NextMeetup data={data} />
    <ArchivedMeetups data={data} />
  </Layout>
)

export const PageQuey = graphql`
  query MDXPageQuery($slug: String!, $meetupGroup: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      frontmatter {
        title
        groupType
        subtitle
        wide
        imgAlt
        img {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    upcomingMeetup: allSyrEvent(
      filter: { status: { eq: "upcoming" }, meetup_group: { eq: $meetupGroup } }
      sort: { fields: local_date }
      limit: 1
    ) {
      nodes {
        ...EventLinkData
      }
    }
    archivedEvents: allSyrEvent(
      filter: { status: { eq: "past" }, meetup_group: { eq: $meetupGroup } }
      sort: { fields: local_date, order: DESC }
    ) {
      nodes {
        ...EventLinkData
      }
    }
  }
`

export default MDXTemplate
