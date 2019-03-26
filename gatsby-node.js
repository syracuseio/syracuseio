const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const moment = require('moment')

const meetupArr = [
  { lookup: 'Syracuse JavaScript Meetup', name: 'syr_js' },
  { lookup: 'OpenHack', name: 'open_hack' },
  { lookup: 'Women in Coding', name: 'women_in_coding' },
]

exports.onCreateNode = ({
  actions,
  node,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
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

    let nodeId = createNodeId(`event-j-${node.id}`)
    let data = {
      name: node.name,
      status: status,
      local_date: node.local_date,
      description: node.description,
      link: node.link,
      meetup_group: node.meetup_group,
    }
    const nodeContent = JSON.stringify(data)
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `SyrEvent`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    })

    actions.createNode(nodeData)
  }

  if (node.internal.type === `MeetupEvent`) {
    let meetupGroup

    for (let meetup of meetupArr) {
      if (node.name.includes(meetup.lookup)) {
        meetupGroup = meetup.name
        break
      }
    }

    if (meetupGroup === undefined) {
      meetupGroup = 'other'
    }

    let nodeId = createNodeId(`event-m-${node.id}`)
    let data = {
      name: node.name,
      status: node.status,
      local_date: node.local_date,
      description: node.description,
      link: node.link,
      meetup_group: meetupGroup,
    }
    const nodeContent = JSON.stringify(data)
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `SyrEvent`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    })

    actions.createNode(nodeData)
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              meetupGroup
            }
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
        meetupGroup: node.frontmatter.meetupGroup,
      },
    })
  })
}
