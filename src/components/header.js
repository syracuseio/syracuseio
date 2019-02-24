import React from 'react'
import styled from 'styled-components'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import logo from '../images/logo.svg';

const Nav = styled.nav`
  background-color: #1b1b1b;
  border-bottom: 2px solid #474747;
  padding: 20px 0;
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 12px;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #f0f0f0;

    &:hover {
      color: #23527c;
      text-decoration: none;
    }
  }
`

const NavList = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;
`

const BrandItem = styled.li`
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
  margin-right: auto;
`

const MenuItem = styled.li`
  text-transform: uppercase;
  padding: 15px 15px;
  a {
    text-transform: uppercase;
    font-size: 12px;
  }
`

const LogoWrapper = styled.div`
  width: 100px;
  z-index: 1000;
  margin-top: -50px;
  position: absolute;
  left: 50%;
`

const Logo = styled.div`
  width: 100px;
  opacity: 1;
  position: absolute;
  margin-left: -50%;
`

const Header = ({ menuLinks }) => (
  <header>
    <Nav>
      <NavList role="navigation">
        <BrandItem>
          <Link to="/">Syracuse.io</Link>
        </BrandItem>
        {menuLinks.map(link => (
          <MenuItem key={link.name}>
            <Link to={link.link}>{link.name}</Link>
          </MenuItem>
        ))}
      </NavList>
      <LogoWrapper>
        <Logo>
          <Link to="/">
            <img src={logo} width="100px"/>
          </Link>
        </Logo>
      </LogoWrapper>
    </Nav>
  </header>
)



Header.propTypes = {
  siteTitle: PropTypes.string,
  menuLinks: PropTypes.array,
}

Header.defaultProps = {
  siteTitle: ``,
  menuLinks: [],
}

export default Header
