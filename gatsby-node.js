const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allContentfulCutlery(limit: 100 ) {
          edges {
            node {
              slug
              title
              featureImage {
                file {
                  url
                  fileName
                  contentType
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  const posts = result.data.allContentfulCutlery.edges
  posts.forEach(post => {
    createPage({
      path: `/blog/${post.node.slug}`,
      component: blogPost,
      context: {
        slug: post.node.slug,
      },
    })
  })

}
