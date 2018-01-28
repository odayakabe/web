
const siteMetadata = {
    title: 'FutoIn Guide',
    siteUrl: 'https://futoin.org',
    backgroundColor: "#fff",
    themeColor: "#311b92",
};

module.exports = {
  siteMetadata,
  plugins: [
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `docs`,
            path: `${__dirname}/docs/`,
        },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                `gatsby-remark-autolink-headers`,
                `gatsby-remark-copy-linked-files`,
                `gatsby-remark-smartypants`,
                `gatsby-plugin-sharp`,
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 590,
                        linkImagesToOriginal: true,
                        sizeByPixelDensity: false,
                    },
                },
            ],
        },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-canonical-urls',
    'gatsby-plugin-no-sourcemaps',
    {
        resolve: `gatsby-plugin-sass`,
        options: {
            includePaths: [
                'node_modules',
                'src',
                '.',
            ],
        },
    },
    {
        resolve: `gatsby-plugin-favicon`,
        options: {
            logo: "./src/components/Navigation/futoin_logo.svg",
            injectHTML: true,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: true,
                twitter: false,
                yandex: false,
                windows: false
            }
        }
    },
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: siteMetadata.title,
            short_name: siteMetadata.title,
            start_url: "/",
            background_color: siteMetadata.backgroundColor,
            theme_color: siteMetadata.themeColor,
            display: "minimal-ui",
            icons: [
                {
                    src: `/favicons/favicon-16x16.png`,
                    sizes: `16x16`,
                    type: `image/png`,
                },
                {
                    src: `/favicons/favicon-32x32.png`,
                    sizes: `32x32`,
                    type: `image/png`,
                },
                {
                    src: `/favicons/android-chrome-192x192.png`,
                    sizes: `192x192`,
                    type: `image/png`,
                },
                {
                    src: `/favicons/android-chrome-512x512.png`,
                    sizes: `512x512`,
                    type: `image/png`,
                },
            ],
        },
    },
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            trackingId: "UA-113169407-1",
            // Setting this parameter is optional
            anonymize: true,
        },
    },
    'gatsby-plugin-sitemap',
    // must be last
    'gatsby-plugin-offline',
  ],
};
