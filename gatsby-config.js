const path = require('path')

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Syracuse.io`,
    description: `Your local developer community.`,
    author: `@syracuseio`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') },
        extensions: [".mdx", ".md"]
      },
    },
    {
      resolve: `gatsby-source-meetup`,
      options: {
        key: process.env.MEETUP_API_KEY,
        groupUrlName: `Syracuse-Software-Development-Meetup`,
        status: `upcoming,past`,
        desc: `true`,
        page: 200,
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
