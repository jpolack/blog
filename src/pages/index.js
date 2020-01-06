import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Typography from '@material-ui/core/Typography';

import { useStaticQuery, graphql, Link } from "gatsby"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import Img from "gatsby-image"

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
      file(relativePath: { eq: "Profile.jpg" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 400, height: 400) {
            ...GatsbyImageSharpFixed
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
          <Profile image={data.file}/>
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
      <Typography variant="h2">{file.frontmatter.title}</Typography>
      <Typography variant="body1">{file.excerpt}</Typography>
      <Typography variant="body2">{file.frontmatter.date}</Typography>
      <Button color="primary" variant="outlined" component={Link} to={`/${file.fields.slug}`}>Mehr lesen</Button>
    </Paper>
  )
}

const Profile = ({image}) => {
  const theme = useTheme();

  return (
    <Paper style={{
      padding: theme.spacing(3),
    }}>
      <Typography variant="h2">Über mich</Typography>
      <Typography variant="h3">Jonah Polack</Typography>
      <Typography variant="body1">Aus Köln</Typography>
      <Typography variant="body1">und fragt gerne "Warum?"</Typography>
      <Button color="primary" variant="outlined" href="https://jonahpolack.de">Kontakt aufnehmen</Button>
      <Avatar component={Img} fixed={image.childImageSharp.fixed} variant="circle" style={{
        width: theme.spacing(12),
        height: theme.spacing(12)
      }}></Avatar>
    </Paper>
  )
}


export default IndexPage
