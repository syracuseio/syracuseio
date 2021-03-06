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
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-size: 14px;

  .gatsby-image-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 50px;
    margin-right: 12px;
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, .1); 
  }

  svg {
    margin-right: 4px;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
  }

  .social-link:last-child {
    margin-right: unset;
  }
`

const OrganizerSection = ({ organizers }) => (
  <>
    <h3>Organizers</h3>
    <OrganizersGrid>
      {organizers.map(organizer => {
        return (
          <OrganizerContainer key={`organizer-${organizer.id}`}>
            {organizer.image && (
              <Img fluid={organizer.image.childImageSharp.fluid} />
            )}
            <div>
              <p style={{ margin: '10px 0', fontWeight: 600, fontSize: '20px' }}>{organizer.id}</p>
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
                  @{organizer.twitter}
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
