import React from 'react';
import { Tabs } from 'antd';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import renderHtmlToReact from '../utils/renderHtmlToReact';

const { TabPane } = Tabs;

export default ({ data }) => { 
    console.log(data.markdownRemark.htmlAst);
    const post = data.markdownRemark;
    const htmlAst = data.markdownRemark.htmlAst.children;

    const tabNames = htmlAst.filter(ast => {
        return ast.properties && "className" in ast.properties
    }).map(name => {
        return name.properties.className[0];
    })

    const tabs = htmlAst.filter(ast => {
        return ast.properties && "className" in ast.properties
    })

    return(
        <Layout>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <Tabs defaultActiveKey="1" type="card">
                    {
                        tabs.map(html => {
                            if(html.properties.className[0] === 'tab-data') {
                                return (
                                    <TabPane tab="Data" key="1">
                                        {renderHtmlToReact({
                                            type: "root", 
                                            children: [html]
                                        })}
                                    </TabPane>
                                )
                            } else {
                                return (
                                    <TabPane tab="Code" key="2">
                                        {renderHtmlToReact({
                                            type: "root", 
                                            children: [html]
                                        })}
                                    </TabPane>
                                )
                            }
                        })
                    }

                </Tabs>
            </div>
        </Layout>
    )
}

export const query = graphql `
    query($slug: String!) {
        markdownRemark( fields: { slug: { eq: $slug}}) {
            html
            htmlAst
            frontmatter {
                title
            }
        }
    }
`