import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const GroupContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  div.gatsby-image-wrapper {
    height: 175px;
    margin-bottom: 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  img {
    object-fit: cover;
  }

  header {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  header b {
    font-size: 18px;
  }

  .label {
    padding: 0.2em 0.6em 0.3em;
    color: white;
    font-size: 75%;
    border-radius: 0.25em;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.hackathon {
      background: #d9534f;
    }

    &.meetup {
      background: #5bc0de;
    }
  }

  p {
    color: #777;
    flex-grow: 1;
    padding: 0 10px;
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 20px;
  }

  .bottom {
    background: #f5f5f5;
    padding: 7px;
    display: flex;
    justify-content: flex-end;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .bottom a {
    background: white;
    border: 1px solid #ddd;
    padding: 3px;
    margin: 2px;
    border-radius: 2px;
    color: inherit;
    text-decoration: none;
    font-size: 75%;
  }
`

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 30px;
  margin: 20px 10px;
`

const GroupCards = () => {
  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={data => {
        let groups = data.allMdx.edges.filter(
          edge => edge.node.fields.slug !== '/groups/'
        )

        return (
          <GroupGrid>
            {groups.map(({ node: group }, idx) => {
              return (
                <GroupContainer key={`group-${idx}`}>
                  {group.frontmatter.img && (
                    <Link to={group.fields.slug}>
                      <Img
                        fluid={group.frontmatter.img.childImageSharp.fluid}
                        alt={group.frontmatter.imgAlt}
                      />
                    </Link>
                  )}
                  <header>
                    <b>{group.frontmatter.title}</b>
                    <span className={`${group.frontmatter.groupType} label`}>
                      {group.frontmatter.groupType}
                    </span>
                  </header>
                  <p>{group.frontmatter.summary}</p>
                  <div className="bottom">
                    <Link to={group.fields.slug}>Learn More</Link>
                  </div>
                </GroupContainer>
              )
            })}
          </GroupGrid>
        )
      }}
    />
  )
}

export default GroupCards
