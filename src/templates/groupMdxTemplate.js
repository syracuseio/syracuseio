import React from 'react'
import { MDXRenderer } from 'gatsby-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import EventLink from '../components/EventLink'
import OrganizerSection from '../components/OrganizersSection'
import styled from 'styled-components'

const EventContainer = styled.p`
  margin-top: 0;
  color: #888888;
  font-size: 14px;
`
const ArchivedEventContainer = styled.section`
  a { font-size: 16px; }
`

function NextMeetup(props) {
  let { data } = props

  return (
    data.upcomingMeetup &&
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
    data.archivedEvents &&
    data.archivedEvents.nodes.length > 0 && (
      <ArchivedEventContainer>
        <h3>Past Events</h3>
        {data.archivedEvents.nodes.map(event => {
          return <EventLink event={event} key={event.id} />
        })}
      </ArchivedEventContainer>
    )
  )
}

const GroupMDXTemplate = ({ data }) => (
  <Layout frontmatter={data.mdx.frontmatter}>
    <MDXRenderer>{data.mdx.code.body}</MDXRenderer>

    <NextMeetup data={data} />
    {data.upcomingMeetup &&
      data.upcomingMeetup.nodes.length > 0 &&
      data.upcomingMeetup.nodes[0].rsvp_count && (
        <EventContainer>
          {data.upcomingMeetup.nodes[0].rsvp_count} other people are already
          planning on going...
        </EventContainer>
    )}
    {data.mdx.frontmatter.organizers && (
      <OrganizerSection organizers={data.mdx.frontmatter.organizers} />
    )}
    <ArchivedMeetups data={data} />
  </Layout>
)

export const PageQuery = graphql`
  query GroupMDXPageQuery($slug: String!, $meetupGroup: String) {
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
        rsvp_count
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

export default GroupMDXTemplate
