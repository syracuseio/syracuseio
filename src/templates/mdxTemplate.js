import React from 'react'
import { MDXRenderer } from 'gatsby-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

function NextMeetup(props) {
  let { data } = props

  return (
    data.upcomingMeetup.edges.length > 0 && (
      <section>
        <h2>Next Event</h2>
        <a href={data.upcomingMeetup.edges[0].node.link}>
          {data.upcomingMeetup.edges[0].node.local_date}
          {` `}-{` `}
          {data.upcomingMeetup.edges[0].node.name}
        </a>
      </section>
    )
  )
}

function ArchivedMeetups(props) {
  let { data } = props

  return (
    data.archivedEvents.edges.length > 0 && (
      <section>
        <h2>Past Events</h2>
        {data.archivedEvents.edges.map(e => {
          return (
            <article
              key={e.node.id}
              style={{
                marginBottom: 10,
              }}
            >
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
      edges {
        node {
          name
          local_date(formatString: "MMMM DD, YYYY")
          link
        }
      }
    }
    archivedEvents: allSyrEvent(
      filter: { status: { eq: "past" }, meetup_group: { eq: $meetupGroup } }
      sort: { fields: local_date, order: DESC }
    ) {
      edges {
        node {
          id
          name
          local_date(formatString: "MMMM DD, YYYY")
          link
        }
      }
    }
  }
`

export default MDXTemplate
