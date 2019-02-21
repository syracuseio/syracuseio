import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const GroupContainer = styled.div`
  height: 450px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  div.gatsby-image-wrapper {
    height: 175px;
    margin-bottom: 10px;
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
  }

  .hackathon {
    background: #d9534f;
  }

  .meetup {
    background: #5bc0de;
  }

  p {
    color: #777;
    flex-grow: 1;
    padding: 0 10px;
    margin-bottom: 0;
  }

  .bottom {
    background: #f5f5f5;
    padding: 7px;
    display: flex;
    justify-content: flex-end;
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
  margin-bottom: 20px;
`

const GroupCards = () => {
  let query = graphql`
    {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      allMdx(filter: { fileAbsolutePath: { regex: "/src/pages/groups/" } }) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              group
              summary
              type
              featuredImgUrl
            }
          }
        }
      }
    }
  `

  return (
    <StaticQuery
      query={query}
      render={data => {
        let groups = data.allMdx.edges.filter(
          edge => edge.node.frontmatter.type !== null
        )

        return (
          <GroupGrid>
            {groups.map(({ node: group }) => {
              // extract filepath from absolute path for each group
              const searchString = '/src/pages'
              const newIndex =
                group.fileAbsolutePath.indexOf(searchString) +
                searchString.length
              let path = group.fileAbsolutePath.slice(newIndex, -3) + '/'

              let img = data.allFile.edges.filter(
                edge =>
                  group.frontmatter.featuredImgUrl === edge.node.relativePath
              )[0]

              return (
                <GroupContainer>
                  {/* TODO: Replace with featuredImage */}
                  {img && (
                    <Link to={path}>
                      <Img fluid={img.node.childImageSharp.fluid} alt="" />
                    </Link>
                  )}
                  <header>
                    <b>{group.frontmatter.title}</b>
                    <span className={`${group.frontmatter.type} label`}>
                      {group.frontmatter.type}
                    </span>
                  </header>
                  <p>{group.frontmatter.summary}</p>
                  <div className="bottom">
                    <Link to={path}>Learn more</Link>
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
