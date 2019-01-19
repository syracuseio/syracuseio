---
title: OpenHack
subtitle: Code together, on anything
summary: >
  A casual meetup based around developer side-projects.
  OpenHack Syracuse happens on the second tuesday of every month at Syracuse Coworks
imgAlt: photo from OpenHack meetup
---

A casual meetup based around developer side-projects. OpenHack Syracuse happens on the second tuesday of every month at Syracuse Coworks.

We welcome local developers and designers of all skill levels, interests, ages genders, you-name-it to get together to write code or push pixels. We’ll provide good food, good people, and creative energy.

import { graphql } from 'gatsby'
export const PageQuery = graphql`
  {
    heroImage: file(relativePath: { eq: "openhack-august-15.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
