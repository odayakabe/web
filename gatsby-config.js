module.exports = {
  siteMetadata: {
    title: 'FutoIn',
    siteUrl: 'https://futoin.org',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-canonical-urls',
    {
        resolve: `gatsby-plugin-favicon`,
        options: {
            logo: "./src/favicon.png",
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
            name: "FutoIn",
            short_name: "FutoIn",
            start_url: "/",
            background_color: "#311b92",
            theme_color: "#311b92",
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
