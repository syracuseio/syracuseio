import React from 'react'
import styled from 'styled-components'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import logo from '../images/logo.svg'

const Nav = styled.nav`
  background-color: #1b1b1b;
  border-bottom: 2px solid #474747;
  padding: 20px 0;
  font-size: 12px;
  min-height: 50px;

  a {
    text-decoration: none;
    font-weight: 700;
    color: #f0f0f0;
  }
`

const NavList = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;
  letter-spacing: 1px;
`

const BrandItem = styled.li`
  padding: 20px 15px;
  height: 50px;
  font-size: 18px;
  line-height: 20px;
  margin-right: auto;
`

const MenuItem = styled.li`
  text-transform: uppercase;
  padding: 20px 15px;
  line-height: 20px;
  height: 50px;
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
            <img src={logo} alt={'Syracuse.io code logo'} />
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
