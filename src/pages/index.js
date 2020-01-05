import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useStaticQuery, graphql, Link } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query PostExcerpts {
      allMarkdownRemark{
        edges{
          node{
            frontmatter{
              title
              date
            }
            id
            excerpt
            fields{
              slug
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Home" />
      {
        data.allMarkdownRemark.edges.map(({ node }) => <Preview key={node.id} file={node} />)
      }
    </Layout>
  )
}

const Preview = ({ file }) => (
  <>
    <h1>{file.frontmatter.title}</h1>
    <sub>{file.frontmatter.date}</sub>
    <p>{file.excerpt}</p>
    <Link to={`/${file.fields.slug}`}>Read more</Link>
  </>
)


export default IndexPage
