import React from 'react'
import styled from 'styled-components'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const Nav = styled.nav`
  background-color: #1B1B1B;
  border-bottom: 2px solid #474747;
  padding: 0 20px;
  font-size: 12px;
  min-height: 50px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
    font-weight: 700;
    color: #F0F0F0;
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

const Header = ({ siteTitle, menuLinks }) => (
<Nav>
  <NavList role="navigation">
    <BrandItem><Link to="/">Syracuse.io</Link></BrandItem>
    {
      menuLinks.map(link =>
        <MenuItem key={link.name}>
          <Link to={link.link}>{link.name}</Link>
        </MenuItem>)
    }
  </NavList>
</Nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  menuLinks: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  menuLinks: [],
}

export default Header
