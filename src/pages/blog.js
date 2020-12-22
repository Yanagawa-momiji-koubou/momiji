import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />

      <div className="flex-container">
        {data.allContentfulCutlery.edges.map(({ node }) => {
          return (
            <div className='flex-item'>
              <Link to={node.slug}>
                <div className="blog-image">
                  <Img fluid={node.featureImage.fluid} />
                </div>
              </Link>
              {node.createdAt}
              <h4 className="blog-title">{node.title}</h4>
              <Link to={node.slug}> 続きを読む</Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCutlery {
      edges {
        node {
          slug
          title    
          createdAt(formatString: "YYYY/MM/DD")
          featureImage {
            fluid (maxWidth: 480) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }

  }
`
