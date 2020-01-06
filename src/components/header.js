import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { useTheme } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"

const Header = ({ title, subTitle }) => {
  const theme = useTheme();
  return (
    <header>
      <Link to="/" style={{
        textDecoration: 'none',
        color: theme.palette.text.primary,
      }}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center">
              <Typography variant="h1">{title}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center">
              <Typography variant="body1">{subTitle}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
      <Divider style={{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      }} />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
