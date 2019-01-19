---
title: Syracuse.io
subtitle: Your local developer community
imgAlt: Historic photo of Clinton Square in Downtown Syracuse
---

Welcome to [Syracuse.io](http://syracuse.io), home to Syracuse's diverse and growing developer scene.

This is your one stop for information on [local meet ups](/groups/), lists of [local data
resources](/resources/), an active slack [community](/community/), and more to come.

Whether you are new to the area or a seasoned veteran, please check
out [tech meetups](/groups), join our
[mailing list](https://tinyletter.com/syracuseio), and hang out
with our [local slack group](//slackacuse.herokuapp.com)

<center>
  <script async defer src="https://syracuseio.now.sh/slackin.js?large" />
</center>

Take a look at our upcoming events below, join us in slack,
and join our friendly community of Syracuse devs.

import { graphql } from 'gatsby'
export const PageQuery = graphql`
  {
    heroImage: file(relativePath: { eq: "clintonsquare.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
