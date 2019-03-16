const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const moment = require('moment')

exports.onCreateNode = ({ actions, node, getNode }) => {
  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      node,
      getNode,
    })

    actions.createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }

  if (node.internal.type === 'EventsJson') {
    let today = moment()

    let status =
      today.diff(moment(node.local_date, 'YYYY-MM-DD'), 'days') >= 0
        ? `past`
        : `upcoming`

    actions.createNodeField({
      node,
      name: `status`,
      value: status,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  const mdxTemplate = path.resolve('./src/templates/mdxTemplate.js')

  data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      component: mdxTemplate,
      path: node.fields.slug,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
