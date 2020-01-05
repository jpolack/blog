import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from '@material-ui/core/Typography';

export default ({ data: { markdownRemark, allMarkdownRemark: { edges } } }) => {
  const edge = edges.find((edge)=>edge.node.fields.slug === markdownRemark.fields.slug)

  return (
    <Layout>
      <SEO title={markdownRemark.frontmatter.title} />
      <Typography variant="h2">{markdownRemark.frontmatter.title}</Typography>
      <Typography variant="subtitle1">{markdownRemark.frontmatter.date}</Typography>
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      <Typography variant="body2"><Link to="/">Return to main Page</Link></Typography>
      {edge.next && <Typography variant="body2"><Link to={edge.next.fields.slug}>Next</Link></Typography>}
      {edge.previous && <Typography variant="body2"><Link to={edge.previous.fields.slug}>Previous</Link></Typography>}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
      fields{
        slug
      }
    }

    allMarkdownRemark{
        edges{
          next{
            fields{
              slug
            }
          }
          previous{
            fields{
              slug
            }
          }
          node{
            fields{
              slug
            }
          }
        }
      }
  }
`