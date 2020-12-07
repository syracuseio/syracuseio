import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const MDXTemplate = ({ data }) => (
  <Layout frontmatter={data.mdx.frontmatter}>
    <MDXRenderer>{data.mdx.body}</MDXRenderer>
  </Layout>
)

export const PageQuery = graphql`
  query MDXQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
        body
      frontmatter {
        title
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
