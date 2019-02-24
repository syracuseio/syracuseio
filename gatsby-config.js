const path = require('path')

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Syracuse.io`,
    description: `Your local developer community.`,
    author: `@syracuseio`,
    menuLinks: [
      {
        name: 'Community',
        link: '/community',
      },
      {
        name: 'Groups',
        link: '/groups',
      },
      {
        name: 'Resources',
        link: '/resources',
      },
    ],
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
        extensions: ['.mdx', '.md'],
      },
    },
    'gatsby-plugin-catch-links',
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
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `open sans:700,800`,
          `lora:400,400i,600,700,700i`
        ]
      }
    },
    'gatsby-plugin-styled-components',
  ],
}
