import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXing, faGithub } from '@fortawesome/free-brands-svg-icons'
import RssFeed from '@material-ui/icons/RssFeed';
import Avatar from '@material-ui/core/Avatar';
import Img from "gatsby-image"

const Profile = () => {
  const theme = useTheme();

  const data = useStaticQuery(graphql`
    query{
      site{
        siteMetadata{
          url
          xing
          github
        }
      }
      file(relativePath: { eq: "Profile.jpg" }) {
        childImageSharp {
          fixed(width: 400, height: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Paper style={{
      padding: theme.spacing(3),
    }}>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <Avatar component={Img} fixed={data.file.childImageSharp.fixed} variant="circle" style={{
            width: theme.spacing(18),
            height: theme.spacing(18)
          }}></Avatar>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h2">Über mich</Typography>
              <Typography variant="h3" style={{
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2)
              }}>Jonah Polack</Typography>
              <Typography variant="body1">Aus Köln</Typography>
              <Typography variant="body1" style={{
                paddingBottom: theme.spacing(2)
              }}>und fragt gerne "Warum?"</Typography>
              <Button color="primary" variant="outlined" href="https://jonahpolack.de">Kontakt aufnehmen</Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item>
              <IconButton href={`${data.site.siteMetadata.url}/rss.xml`} target='_blank'><RssFeed /></IconButton>
              <IconButton href={`${data.site.siteMetadata.xing}`} target='_blank'><FontAwesomeIcon icon={faXing} /></IconButton>
              <IconButton href={`${data.site.siteMetadata.github}`} target='_blank'><FontAwesomeIcon icon={faGithub} /></IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Profile