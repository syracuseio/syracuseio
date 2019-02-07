---
title: Hack Upstate
subtitle: Bi-Annual 24 hour Hackathon
summary: >
  Weekend hackathons held twice a year (Fall & Spring)
  where developers, designers, engineers and innovators from across Upstate New York
  come to Syracuse, NY, to share ideas, form teams, build projects,
  and win awesome prizes in 24 hours
imgAlt: Hack Upstate Sign
---

Advancing Upstate New York’s tech community through events and education.

Hack Upstate organizes weekend hackathons twice a year (i.e., Fall & Spring) where developers, designers, engineers and innovators from across Upstate New York come to Syracuse, NY, to share ideas, form teams, build projects, and win awesome prizes in 24 hours. The event is free to attend for all participants. Join us!

import { graphql } from 'gatsby'
export const PageQuery = graphql`
  {
    heroImage: file(relativePath: { eq: "hackupstate.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
