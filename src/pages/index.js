import React, {useState} from "react"
import { Drawer, Button } from 'antd';
import { graphql, Link } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: black;
`

const IndexPage = ({ data }) => {

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return(
  <Layout>
    <SEO title="Home" />

    <div>
    <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <h1>Blog Name</h1>
      <h4>Total blog count: { data.allMarkdownRemark.totalCount}</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>{ node.frontmatter.title }</BlogTitle>
            </BlogLink>
            <p>{ node.frontmatter.date }</p>
            <p>{ node.frontmatter.description }</p>
            <p>{ node.excerpt }</p>
            <hr/>
          </div>
        ))
      }
    </div>
  </Layout>
  )

}

export default IndexPage
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
          fields {
            slug
          }
          html
          excerpt
        }
      }
      totalCount
    }
  }
`

