const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const moment = require('moment')

const meetupArr = [
  {
    lookup: 'Syracuse JavaScript Meetup',
    name: 'syr_js',
    displayName: 'Syracuse JavaScript Meetup',
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
      local_time: String!
      description: String
      meetup_group: String
      display_name: String
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
    let eventMoment = moment(
      `${node.local_date} ${node.local_time}`,
      'YYYY-MM-DD HH:mm'
    )

    let status = today.diff(eventMoment) >= 0 ? `past` : `upcoming`

    let nodeId = createNodeId(`event-j-${node.id}`)
    let data = {
      name: node.name,
      status: status,
      local_date: node.local_date,
      local_time: node.local_time,
      description: node.description,
      link: node.link,
      meetup_group: node.meetup_group,
      display_name: node.display_name,
    }
    const nodeContent = JSON.stringify(data)
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: node.id,
      children: [],
      internal: {
        type: `SyrEvent`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    })

    actions.createNode(nodeData)
  }

  if (node.internal.type === `MeetupJson`) {
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

    let today = moment()
    let eventMoment = moment(
      `${node.local_date} ${node.local_time}`,
      'YYYY-MM-DD HH:mm'
    )

    // console.log(node)

    let status = today.diff(eventMoment) >= 0 ? `past` : `upcoming`

    if (status !== 'upcoming' && status !== 'past') {
      console.log(JSON.stringify({ s: status }))
    }

    let nodeId = createNodeId(`event-m-${node.id}`)
    let data = {
      name: node.name,
      status: status,
      local_date: node.local_date,
      local_time: node.local_time,
      description: node.description,
      link: node.link,
      meetup_group: meetupGroup,
      display_name: displayName,
    }
    const nodeContent = JSON.stringify(data)
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: node.id,
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
  const groupMdxTemplate = path.resolve('./src/templates/groupMdxTemplate.js')

  data.allMdx.edges.forEach(({ node }) => {
    // Render the group pages with an enhanced template
    if (
      node.fields.slug.indexOf('/groups/') !== -1 &&
      node.fields.slug !== '/groups/'
    ) {
      actions.createPage({
        component: groupMdxTemplate,
        path: node.fields.slug,
        context: {
          slug: node.fields.slug,
          meetupGroup: node.frontmatter.meetupGroup,
        },
      })
    } else {
      actions.createPage({
        component: mdxTemplate,
        path: node.fields.slug,
        context: {
          slug: node.fields.slug,
        },
      })
    }
  })
}
