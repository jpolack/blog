/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

// Creating a slug for each .md file and appending it to the graphql node
exports.onCreateNode = async({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type !== "MarkdownRemark") {
        return
    }
    
    const slug = createFilePath({ node, getNode, basePath: 'pages' })

    createNodeField({
        node,
        name: `slug`,
        value: slug,
    })
}

// Using the slug to create a page with the template
exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)
    result.data.allMarkdownRemark.edges
        .forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blogpost.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.fields.slug,
                },
            })
        })
}