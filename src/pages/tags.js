import React from "react"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"

export default ({
  data: {
    site: {
      siteMetadata: { title },
    },
    allMarkdownRemark: { group },
  },
}) => (
  <div>
    <SEO title={title} />
    <div>
      <ul>
        {group.map(tag => {
          const { fieldValue, totalCount } = tag

          return (
            <li>
              <Link
                to={`/tags/${fieldValue
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
              >
                <h3>
                  {fieldValue} ({totalCount})
                </h3>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  </div>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 500) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
