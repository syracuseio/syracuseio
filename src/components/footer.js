import React from 'react'
import styled from 'styled-components'

import { GitHub, Twitter, Slack } from 'react-feather'
import { Link } from 'gatsby'

const StyledFooter = styled.footer`
  border-top: 2px solid #d44500;
  background: #f5f5f5;
  padding: 30px 0;
  margin-top: auto;
  flex-shrink: 0;

  a {
    color: #404040;
    &:hover {
      color: #23527c;
    }
  }

  .container {
    max-width: 960px;
    margin: 30px auto;
    color: #777;
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
    padding: 14px;
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

  .copyright {
    margin-bottom: 0;
  }

  .made-by {
    margin: 10px 0 0;
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
        <a
          href="https://join.slack.com/t/syracuseio/shared_invite/zt-aw7rkg3q-2cgCecN524oOVarFJWMOPw"
          className="socialmedia-image-link"
        >
          <Slack color="white" />
        </a>
      </p>
      <p className="center copyright">
        {new Date().getFullYear()} {` • `} <Link to="/">Syracuse.io</Link>
      </p>
      <p className="center font-small made-by">
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
