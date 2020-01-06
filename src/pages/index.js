import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Profile from "../components/profile"
import Typography from '@material-ui/core/Typography';

import { useStaticQuery, graphql, Link } from "gatsby"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <Grid container spacing={3}>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Grid key={node.id} item xs={12}>
                <Preview file={node} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile image={data.file} />
        </Grid>
      </Grid>
    </Layout>
  )
}

const Preview = ({ file }) => {
  const theme = useTheme();
  return (
    <Paper style={{
      padding: theme.spacing(3),
    }}>
      <Typography variant="h2" gutterBottom>{file.frontmatter.title}</Typography>
      <Typography variant="body1" gutterBottom>{file.excerpt}</Typography>
      <Typography variant="body2" style={{
        paddingBottom: theme.spacing(2)
      }}>{file.frontmatter.date}</Typography>
      <Button color="primary" variant="outlined" component={Link} to={`${file.fields.slug}`}>Mehr lesen</Button>
    </Paper>
  )
}


export default IndexPage
