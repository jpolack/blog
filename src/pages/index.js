import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seoMain"
import Profile from "../components/profile"
import Typography from '@material-ui/core/Typography';

import { useStaticQuery, graphql, Link } from "gatsby"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import moment from "moment";

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
            excerpt(pruneLength: 280)
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
      <SEO title="Übersicht" />
      <Grid container spacing={3} justify="center">
        <Grid item lg={7} md={8} sm={12} xs={12}>
          <Grid container spacing={3}>
            {data.allMarkdownRemark.edges
              .sort((edge1, edge2)=>{
                const date1 = moment(edge1.node.frontmatter.date)
                const date2 = moment(edge2.node.frontmatter.date)
          
                if(date1.isAfter(date2)){
                  return -1
                }
                if(date1.isBefore(date2)){
                  return 1
                }
                return 0
              })
              .map(({ node }) => (
                <Grid key={node.id} item xs={12}>
                  <Preview file={node} />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item>
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
      backgroundColor: theme.backgroundColor
    }}>
      <Typography variant="h2" gutterBottom>{file.frontmatter.title}</Typography>
      <Typography variant="body1" gutterBottom>{file.excerpt}</Typography>
      <Typography variant="body2" style={{
        paddingBottom: theme.spacing(2)
      }}>{moment(file.frontmatter.date).format("DD.MM.YYYY")}</Typography>
      <Button color="primary" variant="outlined" component={Link} to={`${file.fields.slug}`}>Mehr lesen</Button>
    </Paper>
  )
}


export default IndexPage
