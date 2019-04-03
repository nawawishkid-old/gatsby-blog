import React from "react"
import { graphql, Link } from "gatsby"

export default ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const isPlural = totalCount > 1
  const headerText = `There ${isPlural ? "are" : "is"} ${totalCount} post${
    isPlural ? "s" : ""
  } tagged with ${tag}`

  return (
    <div>
      <h1>{headerText}</h1>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.fields.slug}>
            <Link to={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/tags">All tags</Link>
    </div>
  )
}

export const query = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 500
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
