module.exports = {
  siteMetadata: {
    title: `Ein Blog`,
    subTitle: `es wird das was es wird`,
    metaTitle: `Ein Blog von Jonah Polack`,
    headline: 'Mindset, Achtsamkeit und Spiritualität',
    description: `Meine Themen sind Mindset, Achtsamkeit, Spiritualität und allgemein die großen Fragen des Lebens`,
    author: `Jonah Polack`,
    siteLanguage: 'de-DE',
    url: 'https://blog.jonahpolack.de',
    siteUrl: 'https://blog.jonahpolack.de'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sitemap',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://blog.jonahpolack.de',
        sitemap: 'https://blog.jonahpolack.de/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Montserrat']
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `jonahpolack-blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        ignore: [`**/\.draft.md`]
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
