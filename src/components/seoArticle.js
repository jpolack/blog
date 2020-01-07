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

function SEO({title, description, url, node }) {
  const { site, file } = useStaticQuery(
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
        file(relativePath: { eq: "Profile.jpg" }) {
          childImageSharp {
            fixed(width: 400, height: 400) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
  // Initial breadcrumb list

  const schemaArticle = {
    '@context': 'http://schema.org',
    '@type': 'Article',
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
      '@type': 'Organization',
      name: site.siteMetadata.author,
      logo: {
        '@type': 'ImageObject',
        url: site.siteMetadata.url + file.childImageSharp.fixed.src,
      },
    },
    datePublished: node.birthTime,
    dateModified: node.modifiedTime,
    description: description || site.siteMetadata.description,
    headline: title,
    inLanguage: site.siteMetadata.siteLanguage,
    url: url,
    name: title,
    image: {
      '@type': 'ImageObject',
      url: site.siteMetadata.url + file.childImageSharp.fixed.src
    },
    mainEntityOfPage: site.siteMetadata.url,
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement: [
      {
        '@type': 'ListItem',
        item: {
          '@id': site.siteMetadata.url,
          name: 'Übersichtsseite',
        },
        position: 1,
      },
      {
        '@type': 'ListItem',
        item: {
          '@id': url,
          name: title,
        },
        position: 2,
      }
    ],
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
          content: description || site.siteMetadata.description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description || site.siteMetadata.description,
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
          content: description || site.siteMetadata.description,
        },
      ]}
    >
      <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  )
}

SEO.defaultProps = {
  description: undefined,
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  node: PropTypes.object.isRequired,
}

export default SEO
