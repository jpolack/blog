import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from '@material-ui/core/Typography';

import { useStaticQuery, graphql, Link } from "gatsby"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query{
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
    <Typography variant="h2">{file.frontmatter.title}</Typography>
    <Typography variant="subtitle1">{file.frontmatter.date}</Typography>
    <Typography variant="body1">{file.excerpt}</Typography>
    <Typography variant="body2"><Link to={`/${file.fields.slug}`}>Read more</Link></Typography>
  </>
)


export default IndexPage
