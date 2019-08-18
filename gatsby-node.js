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

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    `
      interface SyrEvent @nodeInterface {
        id: ID!
        name: String!
        status: String!
        local_date: Date! @dateformat
        local_time: String!
        description: String
        meetup_group: String
        display_name: String
        rsvp_count: String
        link: String
      }
      type EventsJson implements Node & SyrEvent {
        id: ID!
        name: String!
        local_date: Date! @dateformat
        status: String! @proxy(from: "fields.status")
        local_time: String!
        rsvp_count: String
      }
    `,
    schema.buildObjectType({
      name: 'MeetupEvent',
      fields: {
        name: { type: 'String!' },
        status: { type: 'String!' },
        local_time: { type: 'String!' },
        rsvp_count: { type: 'String' },
        local_date: {
          type: 'Date!',
          extensions: {
            dateformat: {},
          },
        },
        meetup_group: {
          type: 'String',
          resolve(parent) {
            let meetupGroup
            for (let meetup of meetupArr) {
              if (parent.name.includes(meetup.lookup)) {
                meetupGroup = meetup.name
                break
              }
            }

            return meetupGroup || null
          },
        },
        display_name: {
          type: 'String',
          resolve(parent) {
            let displayName
            for (let meetup of meetupArr) {
              if (parent.name.includes(meetup.lookup)) {
                displayName = meetup.displayName
                break
              }
            }

            return displayName || null
          },
        },
      },
      interfaces: ['Node', 'SyrEvent'],
    }),
  ]

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
