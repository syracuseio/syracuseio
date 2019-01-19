import React from 'react'
import PropTypes from 'prop-types'

import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

const HeroContainer = styled.section`
  position: relative;
  height: ${props => (props.img !== undefined ? '450px' : '250px')};

  .container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    text-align: center;
    width: 100%;
    color: ${props => props.titleColor};
    ${props =>
      props.img
        ? css`
            padding: 150px 0;
            text-shadow: 1px 1px 3px #000;
          `
        : css`
            padding: 50px 0;
          `}
  }

  h1 {
    font-size: 80px;
  }

  h2 {
    font-size: 30px;
    font-weight: 300;
  }

  hr {
    max-width: 150px;
    margin-top: -10px;
    margin-right: auto;
    margin-left: auto;
    height: 5px;
    border-radius: 3px;
    border-color: ${props => props.titleColor};
    background: ${props => props.titleColor};
    ${props =>
      props.img &&
      css`
        box-shadow: 1px 1px 3px #000;
      `};
  }
`

function Hero(props) {
  let frontmatter = props.pageContext
    ? props.pageContext.frontmatter
    : undefined

  let heroImage =
    props.data && props.data.heroImage ? props.data.heroImage : undefined

  let titleColor = heroImage !== undefined ? 'white' : 'black'

  return (
    <HeroContainer img={heroImage} titleColor={titleColor}>
      <div className="container">
        <h1>{frontmatter.title}</h1>
        <hr />
        {frontmatter.subtitle && <h2>{frontmatter.subtitle}</h2>}
      </div>
      {heroImage && (
        <Img
          fluid={heroImage.childImageSharp.fluid}
          style={{ height: 450 }}
          alt={frontmatter.imgAlt}
        />
      )}
    </HeroContainer>
  )
}

Hero.propTypes = {
  data: PropTypes.shape({
    heroImage: PropTypes.object,
  }),
  pageContext: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      imgAlt: PropTypes.string,
    }),
  }),
}

export default Hero
