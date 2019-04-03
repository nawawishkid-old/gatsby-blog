const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: "slug",
      value: `/posts${slug}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(
        limit: 500
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    let tags = []

    posts.forEach(({ node }) => {
      const { slug } = node.fields

      // Gather tags on each post
      tags = [...tags, ...node.frontmatter.tags]

      // Post page
      createPage({
        path: slug,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          slug,
        },
      })
    })

    tags = [...new Set(tags)] // unique

    // Tags page
    tags.forEach(tag => {
      const kebabCase = tag.toLowerCase().split(' ').join('-');

      createPage({
        path: `/tags/${kebabCase}/`,
        component: path.resolve("./src/templates/tags.js"),
        context: { tag },
      })
    })
  })
}
