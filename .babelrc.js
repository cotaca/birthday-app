const { babelOptimizerPlugin } = require('@graphql-codegen/client-preset');

module.exports = {
    presets: ['react-app'],
    plugins: [
        [babelOptimizerPlugin, {
            artifactDirectory: './src/__generated__/gql',
            gqlTagName: 'gql'
        }]
    ]
};
