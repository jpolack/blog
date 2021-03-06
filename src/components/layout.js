/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from "@material-ui/core/colors/blue";

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          subTitle
        }
      }
    }
  `)

  const lightTheme = {
    palette: {
      primary: blue,
      text: {
        primary: "#4a4a4a",
        secondary: "#4a4a4a",
      },
    },
    backgroundColor: "#ffffff",
  }

  // const darkTheme = {
  //   palette: {
  //     primary: blue,
  //     text: {
  //       primary: "#ffffff",
  //       secondary: "#ffffff",
  //     },
  //   },
  //   backgroundColor: "#222222",
  // }

  let selectedTheme = lightTheme

  const theme = createMuiTheme(selectedTheme)

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: theme.spacing(3), backgroundColor: selectedTheme.backgroundColor }}>
        <Header title={data.site.siteMetadata.title} subTitle={data.site.siteMetadata.subTitle} />
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
