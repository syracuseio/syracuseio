import React from 'react'
import { MDXRenderer } from 'gatsby-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const MDXTemplate = ({ data }) => (
  <Layout frontmatter={data.mdx.frontmatter}>
    <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
    {data.mdx.frontmatter.groupType &&
      data.mdx.frontmatter.title !== `Hack Upstate` && (
        <p>
          If you want to see upcoming meetups for {data.mdx.frontmatter.title}{' '}
          or any of the other groups, visit the{' '}
          <a href="https://www.meetup.com/Syracuse-Software-Development-Meetup/">
            Meetup.com page
          </a>
        </p>
      )}
  </Layout>
)

export const PageQuey = graphql`
  query MDXPageQuery($slug: String!) {
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
  }
`

export default MDXTemplate
