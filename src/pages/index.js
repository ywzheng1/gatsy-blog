import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />

    <div>
      <h1>Blog Name</h1>
      <h4>Total blog count: { data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <h2>{ node.frontmatter.title }</h2>
            <p>{ node.frontmatter.date }</p>
            <p>{ node.frontmatter.description }</p>
            <p>{ node.excerpt }</p>
            <hr/>
          </div>
        ))
      }
    </div>
    {/* <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/page-3/">Go to page 3</Link> */}
  </Layout>
)

export default IndexPage
export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
          html
          excerpt
        }
      }
      totalCount
    }
  }
`

