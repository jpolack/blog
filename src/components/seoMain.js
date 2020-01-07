/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import moment from 'moment'

function SEO({ title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          buildTime(formatString: "YYYY-MM-DD")
          siteMetadata {
            metaTitle
            headline
            description
            siteLanguage
            author
            url
          }
        }
      }
    `
  )

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: site.siteMetadata.url,
    headline: site.siteMetadata.headline,
    inLanguage: site.siteMetadata.siteLanguage,
    mainEntityOfPage: site.siteMetadata.url,
    description: site.siteMetadata.description,
    name: site.siteMetadata.metaTitle,
    author: {
      '@type': 'Person',
      name: site.siteMetadata.author,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: site.siteMetadata.author,
    },
    copyrightYear: moment().format('YYYY'),
    creator: {
      '@type': 'Person',
      name: site.siteMetadata.author,
    },
    publisher: {
      '@type': 'Person',
      name: site.siteMetadata.author,
    },
    datePublished: moment('2019-06-19').toISOString(),
    dateModified: site.buildTime,
  }

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': site.siteMetadata.url,
        name: 'Homepage',
      },
      position: 1,
    },
  ]

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }

  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata.siteLanguage,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.metaTitle}`}
      meta={[
        {
          name: `description`,
          content: site.siteMetadata.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: site.siteMetadata.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: site.siteMetadata.description,
        },
      ]}
    >
      <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  )
}

SEO.defaultProps = {
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SEO
