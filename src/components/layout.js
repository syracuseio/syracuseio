import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from './header'
import Hero from './hero'
import Footer from './footer'
import './layout.css'

const LayoutContainer = styled.div`
  /* adding flexbox container to layout so the footer will be pushed to the bottom of the viewport / page no matter what */
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 0 auto;
    margin: 0 auto;
    max-width: 960px;
    padding: 50px 1rem;
  }

  footer {
    flex-shrink: 0;
  }
`

const Layout = props => {
  let { data: data_, pageContext } = props

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              menuLinks {
                name
                link
              }
            }
          }
        }
      `}
      render={data => (
        <LayoutContainer>
          <Header
            siteTitle={data.site.siteMetadata.title}
            menuLinks={data.site.siteMetadata.menuLinks}
          />
          <Hero data={data_} pageContext={pageContext} />
          <main>{props.children}</main>
          <Footer />
        </LayoutContainer>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
