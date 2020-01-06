import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Profile from "../components/profile"
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/styles"

export default ({ data: { markdownRemark, allMarkdownRemark: { edges } } }) => (
  <Layout>
    <Blogpost markdownRemark={markdownRemark} edges={edges}/>
  </Layout>
)

const Blogpost = ({ markdownRemark, edges}) => {
  const edge = edges.find((edge) => edge.node.fields.slug === markdownRemark.fields.slug)
  const theme = useTheme();

  return (
    <>
      <SEO title={markdownRemark.frontmatter.title} />
      <Grid container justify="center" spacing={3}>
        <Grid item lg={6} md={8} sm={12} xs={12}>
          <Paper style={{
            padding: theme.spacing(3),
          }}>
            <Typography variant="h2" gutterBottom>{markdownRemark.frontmatter.title}</Typography>
            <Typography variant="body2">Gepostet am {markdownRemark.frontmatter.date}</Typography>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
            <Grid container justify="space-between" spacing={3}>
              {edge.previous
                ? (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="outlined"
                      component={Link}
                      to={`${edge.previous.fields.slug}`}
                      startIcon={<ArrowBack />}
                    >Vorheriger Artikel</Button>
                  </Grid>
                )
                : <Grid item />
              }
              {edge.next
                ? (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="outlined"
                      component={Link}
                      to={`${edge.next.fields.slug}`}
                      endIcon={<ArrowForward />}
                    >Nächster Artikel</Button>
                  </Grid>
                )
                : <Grid item />
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Profile />
        </Grid>
      </Grid>
    </>
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