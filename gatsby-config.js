const path = require('path')

require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Syracuse.io`,
    description: `Your local developer community.`,
    author: `@syracuseio`,
    siteUrl: 'https://syracuse.io',
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
  mapping: {
    'Mdx.frontmatter.organizers': `OrganizersJson`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
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
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `staticData`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') },
        extensions: ['.mdx', '.md'],
      },
    },
    'gatsby-plugin-catch-links',
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `syracuse.io`,
        short_name: `syracuse.io`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`open sans:700,800`, `lora:400,400i,600,700,700i`],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
  ],
}
