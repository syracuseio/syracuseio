import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import './layout.css'

import styled from 'styled-components'

const LayoutContainer = styled.div`
  /* adding flexbox container to layout so the footer will be pushed to the bottom of the viewport / page no matter what */
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 0 auto;
    margin: 0 auto;
    max-width: 960px;
    padding: 0px 1.0875rem 1.45rem;
    padding-top: 0;
  }

  footer {
    flex-shrink: 0;
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <LayoutContainer>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <Footer />
      </LayoutContainer>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
