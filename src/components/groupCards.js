import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const GroupContainer = styled.div`
  border-radius: 4px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.24);
  }

  p {
    color: #777;
    flex-grow: 1;
    padding: 0 10px;
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 20px;
  }
`

const LearnMoreLink = styled(Link)`
  background: #f5f5f5;
  color: #7a7a7a;
  padding: 7px;
  text-align: center;
  font-weight: 200;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  &:hover {
    text-decoration: none;
  }
`

const Header = styled(Link)`
  display: block;
  height: 200px;
  position: relative;

  div.gatsby-image-wrapper {
    height: 200px;
    margin-bottom: 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  img {
    object-fit: cover;
  }

  b {
    font-size: 24px;
    color: white;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.24);
    position: absolute;
    bottom: 10px;
    padding: 0 10px;
  }
`

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 30px;
  margin: 20px 10px;
  margin-bottom: 40px;
`

const Tint = styled.div`
  background-color: black;
  opacity: 0.25;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const GroupCards = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/src/content/groups/" } }
        sort: { fields: frontmatter___title }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              group
              summary
              groupType
              imgAlt
              img {
                childImageSharp {
                  fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  let groups = data.allMdx.edges.filter(
    edge => edge.node.fields.slug !== '/groups/'
  )

  return (
    <GroupGrid>
      {groups.map(({ node: group }, idx) => {
        return (
          <GroupContainer key={`group-${idx}`}>
            {group.frontmatter.img && (
              <Header to={group.fields.slug}>
                <Img
                  fluid={group.frontmatter.img.childImageSharp.fluid}
                  alt={group.frontmatter.imgAlt}
                />
                <Tint />
                <b>{group.frontmatter.title}</b>
                <span className={`${group.frontmatter.groupType} label`}>
                  {group.frontmatter.groupType}
                </span>
              </Header>
            )}
            <p>{group.frontmatter.summary}</p>
            <LearnMoreLink to={group.fields.slug}>Learn More</LearnMoreLink>
          </GroupContainer>
        )
      })}
    </GroupGrid>
  )
}

export default GroupCards
