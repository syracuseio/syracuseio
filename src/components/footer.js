import React from 'react'
import styled from 'styled-components'

import { GitHub, Twitter } from 'react-feather'
import { Link } from 'gatsby'

const StyledFooter = styled.footer`
  border-top: 2px solid #d44500;
  background: #f5f5f5;

  .container {
    max-width: 960px;
    margin: 30px auto;
    color: #777;
  }

  .container a {
    color: #404040;
    text-decoration: none;
  }

  .container a:hover {
    color: #0085a1;
    text-decoration: underline;
  }

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .center {
    text-align: center;
  }

  .font-small {
    font-size: 14px;
  }

  a.socialmedia-image-link {
    padding: 16px;
    background: #404040;
    border-radius: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  a.socialmedia-image-link:last-of-type {
    margin-right: 0;
  }
`

const Footer = () => (
  <StyledFooter>
    <div className="container">
      <p className="flex-center">
        <a
          href="https://github.com/syracuseio"
          className="socialmedia-image-link"
        >
          <GitHub color="white" />
        </a>
        <a
          href="https://twitter.com/syracuseio"
          className="socialmedia-image-link"
        >
          <Twitter color="white" />
        </a>
      </p>
      <p className="center">
        {new Date().getFullYear()} {` • `} <Link to="/">Syracuse.io</Link>
      </p>
      <p className="center font-small">
        Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {` • `}Deployed on{` `}
        <a href="https://netlify.com">Netlify</a>
        {` • `}Source on{` `}
        <a href="https://github.com/syracuseio/syracuseio">GitHub</a>
      </p>
    </div>
  </StyledFooter>
)

export default Footer