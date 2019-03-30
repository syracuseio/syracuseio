import React from 'react'
import { Twitter, Mail } from 'react-feather'
import Img from 'gatsby-image'
import styled from 'styled-components'

const OrganizersGrid = styled.section`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
  }
`

const OrganizerContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  .gatsby-image-wrapper {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-right: 20px;
  }

  svg {
    margin-right: 4px;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    margin-right: 16px;
  }

  .social-link:last-child {
    margin-right: unset;
  }
`

const OrganizerSection = ({ organizers }) => (
  <>
    <h2>Organizers</h2>
    <OrganizersGrid>
      {organizers.map(organizer => {
        return (
          <OrganizerContainer>
            {organizer.image && (
              <Img fluid={organizer.image.childImageSharp.fluid} />
            )}
            <div>
              <h3 style={{ marginTop: 0 }}>{organizer.id}</h3>
              {organizer.email && (
                <span className="social-link">
                  <Mail />
                  <a href={`mailto:${organizer.email}`}>Email</a>
                </span>
              )}
              {organizer.twitter && (
                <span className="social-link">
                  <Twitter />
                  <a href={`https://twitter.com/${organizer.twitter}`}>
                    Twitter
                  </a>
                </span>
              )}
            </div>
          </OrganizerContainer>
        )
      })}
    </OrganizersGrid>
  </>
)

export default OrganizerSection
