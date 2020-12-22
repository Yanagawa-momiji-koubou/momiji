import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const HomeIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />

      <div className="jumbotron__container">
        <Img fluid={data.topVisual.childImageSharp.fluid}
          className="jumbotron__img"
        />
        <div className="jumbotron__text_block">
          {/* <h2>Hello, world</h2> */}
        </div>
      </div>
      {/* About section */}
      <div className="grid">
        <div className="grid_item1">
          <h2>プロフィール</h2>
          <p>モミジ工房は　木の温もりのある
          バターナイフ 作りから始まりました！
          そのバターナイフ は　どの角度に置いても
          刃先がテーブルに触れ無い
          とっても使い勝手の良い　バターナイフ なのです！
          勿論、ジャムにも果物にもケーキや、お菓子等、色々なもに使えます。
          このバターナイフ を愛用してくださった多くの方からのリクエストや
          バターナイフ を作った端材から
          フォークやスプーン等、種類も多くなり
          多くの方々に、愛用していただいていることに
          感謝しています。
          これからも楽しく使っていただける
          木の温もりのある
          カトラリー作りに挑戦して行きます
          よろしくお願いいたします。
          </p>
        </div>
        <div className="grid_item2">
          <Img fixed={data.selfPortfolio.childImageSharp.fixed} />
        </div>
      </div>

      {/* Blog section */}
      <div className="section-wrapper">
        <h2 className="text-center">ブログ</h2>
        <div className="flex-container">
          {data.allContentfulCutlery.edges.map(({ node }) => {
            return (
              <div className='flex-item'>
                <Link to={`blog/${node.slug}`}>
                  <div className="blog-image">
                    <Img fluid={node.featureImage.fluid} />
                  </div>
                </Link>
                {node.createdAt}
                <h4 className="blog-title">{node.title}</h4>
                <Link to={`blog/${node.slug}`}> 続きを読む</Link>
              </div>
            )
          })}
        </div>
        <div className="text-center">
          <Link to={"/blog"}>
            <button className="button">ブログ一覧</button>
          </Link>
        </div>
      </div>

      <div className="text-center">
        <h2>作った商品についてお気軽にお問い合わせください</h2>
        <a href="https://forms.gle/qNM6p23iUP1Wh9hn9 "><button className="button">お問い合わせ</button></a>
      </div>

    </Layout>
  )
}

export default HomeIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCutlery(limit: 3) {
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
     topVisual: file(absolutePath: { regex: "/jumbotron.jpg/" }) {
      childImageSharp {
        fluid(quality: 95) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    selfPortfolio: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width:250, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
