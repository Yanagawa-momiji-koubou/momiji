import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const options = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        src={node.data.target.fields.file["ja-JP"].url}
      />
    )
  },
};

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulCutlery
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
      // description={post..description || post.excerpt}
      />
      <div className="blog-wrapper">
        <p>{post.createdAt}</p>
        <h2>{post.title}</h2>
        {documentToReactComponents(data.contentfulCutlery.body.json, options)}
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String! ) { 
    site {
      siteMetadata {
        title
      }
    }
    contentfulCutlery (slug: { eq: $slug}) {
      slug
      title
      createdAt(formatString: "YYYY/MM/DD")
      featureImage {
        fluid(maxWidth: 480) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        json
      }
    }
  }
`
