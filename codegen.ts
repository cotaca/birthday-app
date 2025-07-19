import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: [
        {
            'https://graphql.anilist.co': {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        },
    ],
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
            plugins: [
                {
                    add: {
                        content: '/* eslint-disable */\n// @ts-nocheck',
                    },
                },
            ],
            presetConfig: {
                gqlTagName: 'gql',
            },
            config: {
                useTypeImports: true,
                declarationKind: 'interface',
                emitLegacyCommonJSImports: false,
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;