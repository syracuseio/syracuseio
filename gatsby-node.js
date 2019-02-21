exports.onCreatePage = ({ page, actions }) => {
  console.log(page)
  if (page.component.endsWith('.md') && page.context.img === undefined) {
    console.log('deleting page')
    actions.deletePage(page)
    actions.createPage({
      ...page,
      component: require.resolve('./src/components/markdown-layout.js'),
      context: {
        ...page.context,
        img: page.context.frontmatter.featuredImgUrl,
        absPath: page.componentPath,
      },
    })
  }
}
