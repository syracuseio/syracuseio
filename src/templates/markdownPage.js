import React from 'react'
import Layout from '../components/layout'
import { Link, graphql } from 'gatsby'

export default function(props) {
  const page = props.data.markdownRemark
  const { html } = page

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`
