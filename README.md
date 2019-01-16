# Syracuse.io 2.0

This is the source code for the next generation of https://syracuse.io – Its goal is 
to build a consolidated directory and calendar of technology user groups and meetups.

We use [gatsby](https://gatsbyjs.org) as a static site generator, and this source code
is built on, deployed to, and hosted by [netlify](https://www.netlify.com).

### To generate the site

1. Clone this repo
2. [Install gatsby CLI](https://www.gatsbyjs.org/tutorial/part-zero/#install-gatsby-cli)
3. Grab your [API key from Meetup](https://secure.meetup.com/meetup_api/key/). This allows you to pull down events from our meetup group into the site when developing. Then, create a file called `.env` in the root directory and place the key here as shown below (let's say for example our token is `4dea`):
```
MEETUP_API_KEY=4dea
```
4. Run `gatsby develop`

Gatsby will build the site and run a webserver so you can view it.  Visit
http://localhost:8000 to view the site.

### Grabbing API Tokens

### Adding and removing meetup groups

We'd love to include your group! Please contact the syracuse.io maintainers to get your 
group added.

