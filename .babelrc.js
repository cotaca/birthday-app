const { babelOptimizerPlugin } = require('@graphql-codegen/client-preset');

module.exports = {
    presets: ['react-app'],
    plugins: [
        [babelOptimizerPlugin, {
            artifactDirectory: './src/graphql/__generated__/gql',
            gqlTagName: 'gql'
        }]
    ]
};
