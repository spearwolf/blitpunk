module.exports = {
  siteMetadata: {
    title: 'site-title',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-react-css-modules',
      options: {
        // *.css files are included by default.
        // To support another syntax (e.g. SCSS),
        // add `postcss-scss` to your project's devDependencies
        // and add the following option here:
        filetypes: {
          '.scss': { syntax: 'postcss-scss' },
        },

        // Exclude global styles from the plugin using a RegExp:
        exclude: '/global/',
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/styles/typography.js',
      },
    },
  ],
};
