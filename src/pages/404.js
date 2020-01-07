import React from "react"

import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seoMain"
import Profile from "../components/profile"
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";

const NotFoundPage = () => {
  const theme = useTheme()
  return (
    <Layout>
      <SEO title="Seite nicht gefunden" />
      <Grid container justify="center" spacing={3}>
        <Grid item lg={6} md={8} sm={12} xs={12}>
          <Paper style={{
            padding: theme.spacing(3),
          }}>
            <Typography variant="h2" gutterBottom>Diese Seite existiert nicht</Typography>
            <Typography variant="body1">Versuch es einfach nochmal von der Übersichtsseite aus. <Link to="/">Nochmal versuchen</Link></Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Profile />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default NotFoundPage
