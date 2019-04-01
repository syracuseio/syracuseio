const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const moment = require('moment')

const meetupArr = [
  {
    lookup: 'Syracuse JavaScript Meetup',
    name: 'syr_js',
    displayName: 'Syracuse Javascript Meetup',
  },
  { lookup: 'OpenHack', name: 'open_hack', displayName: 'OpenHack' },
  {
    lookup: 'Women in Coding',
    name: 'women_in_coding',
    displayName: 'Women in Coding',
  },
  { lookup: 'Happy Hour', name: 'dev_drinks', displayName: '/dev/drinks' },
]

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type SyrEvent implements Node @infer(noDefaultResolvers: false) {
      name: String!
      status: String!
      local_date: Date!
      description: String
      meetup_group: String
      display_name: String
      rsvp_count: String
      link: String
    }
  `

  createTypes(typeDefs)
}

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
      display_name: node.display_name,
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
    let displayName

    for (let meetup of meetupArr) {
      if (node.name.includes(meetup.lookup)) {
        meetupGroup = meetup.name
        displayName = meetup.displayName
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
      display_name: displayName,
      rsvp_count: node.yes_rsvp_count,
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
