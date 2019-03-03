import React from 'react'
import PropTypes from 'prop-types'

import Img from 'gatsby-image'
import styled from 'styled-components'
import { BREAKPOINT_SMALL_SCREEN } from './GlobalStyle'

const HeroContainer = styled.section`
  position: relative;
  height: ${props => (props.img ? '450px' : '122px')};
  margin-top: ${props => (props.img ? '0' : '45px')};
  margin-bottom: ${props => (props.img ? '35px' : '0')};

  .container {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    width: 100%;
    height: 100%;
    color: ${props => props.titleColor};
    text-shadow: ${props => (props.img ? '1px 1px 3px #000' : 'unset')};
  }

  hr {
    max-width: 150px;
    width: 100px;
    box-shadow: 1px 1px 3px #000;
    margin-top: -10px;
    margin-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
    border-width: 4px;
    border-radius: 3px;
    border-color: ${props => props.titleColor};
    background: ${props => props.titleColor};
    box-shadow: ${props => (props.img ? '1px 1px 3px #000' : 'unset')};
  }

  h1,
  h2 {
    margin-top: 0;
  }

  .heroImage {
    height: 100%;
  }

  @media (max-width: ${BREAKPOINT_SMALL_SCREEN}) {
    height: 300px;

    h1 {
      font-size: 50px;
    }

    h2 {
      font-size: 27px;
    }
  }
`

function Hero(props) {
  if (props.frontmatter === undefined) {
    return null
  }
  let { title, subtitle, img, imgAlt } = props.frontmatter

  let titleColor = img ? 'white' : 'inherit'

  return (
    <HeroContainer img={img} titleColor={titleColor}>
      <div className="container">
        <h1>{title}</h1>
        {subtitle && (
          <React.Fragment>
            <hr />
            <h2>{subtitle}</h2>
          </React.Fragment>
        )}
      </div>
      {img && (
        <Img
          className="heroImage"
          fluid={img.childImageSharp.fluid}
          alt={imgAlt}
        />
      )}
    </HeroContainer>
  )
}

Hero.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    img: PropTypes.object,
    imgAlt: PropTypes.string,
  }),
}

export default Hero
