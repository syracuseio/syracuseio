import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { MDXRenderer } from 'gatsby-mdx'

import Header from './header'
import Hero from './hero'
import Footer from './footer'
import './layout.css'
import SEO from './seo'

const LayoutContainer = styled.div`
  /* adding flexbox container to layout so the footer will be pushed to the bottom of the viewport / page no matter what */
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 0 auto;
    margin: 0 auto;
    max-width: 1200px;
    padding: 50px 1rem;
  }

  footer {
    flex-shrink: 0;
  }
`

const Layout = props => {
  let { data, pageContext } = props

  console.log(pageContext)

  let title

  if (pageContext) {
    // Set the title for the homepage to be "Home"
    if (pageContext.frontmatter.title === data.site.siteMetadata.title) {
      title = 'Home'
    } else {
      title = pageContext.frontmatter.title
    }
  }

  return (
    <LayoutContainer>
      <Header menuLinks={data.site.siteMetadata.menuLinks} />
      <SEO title={title} />

      <Hero data={data} pageContext={pageContext} />

      <main>
        <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
      </main>
      <Footer />
    </LayoutContainer>
  )
}

export const pageQuery = graphql`
  query MDXPageQuery($absPath: String, $img: String) {
    site {
      siteMetadata {
        title
        menuLinks {
          name
          link
        }
      }
    }
    mdx(fileAbsolutePath: { eq: $absPath }) {
      code {
        body
      }
    }
    heroImage: file(relativePath: { eq: $img }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Layout
