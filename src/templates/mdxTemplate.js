import React from 'react'
import { MDXRenderer } from 'gatsby-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import EventLink from '../components/EventLink'
import OrganizerSection from '../components/OrganizersSection'

function NextMeetup(props) {
  let { data } = props

  return (
    data.upcomingMeetup.nodes.length > 0 && (
      <section>
        <h2>Next Event</h2>
        <EventLink event={data.upcomingMeetup.nodes[0]} />
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
          return <EventLink event={event} key={event.id} />
        })}
      </section>
    )
  )
}

const MDXTemplate = ({ data }) => (
  <Layout frontmatter={data.mdx.frontmatter}>
    <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
    {data.mdx.frontmatter.organizers && (
      <OrganizerSection organizers={data.mdx.frontmatter.organizers} />
    )}
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
        organizers {
          id
          twitter
          email
          image {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
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
        id
        name
        local_date(formatString: "MMMM DD, YYYY")
        link
      }
    }
    archivedEvents: allSyrEvent(
      filter: { status: { eq: "past" }, meetup_group: { eq: $meetupGroup } }
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

export default MDXTemplate
