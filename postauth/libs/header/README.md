# Svlete Library Extended Template with API

## This extends the svelte library template and adds the GraphQL API client

Continuing where [Svelte Library Extended Template](../template_extended/) left off...

    pnpm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations graphql-tag graphql-codegen-svelte-apollo

`.env.{stage}.env`

    # This must not contain sensitive or confidential information as it is bundled into client-side code
    VITE_API_URL="https://.../"

`codgegen.ts`

    import type { CodegenConfig } from '@graphql-codegen/cli';

    const config: CodegenConfig = {
        schema: process.env.VITE_API_URL,
        documents: ['src/**/*.graphql'],
        generates: {
            'src/lib/api/api.ts': {
                plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
                config: {
                    clientPath: '@infinitro/global',
                    asyncQuery: true,
                    namingConvention: {
                        typeNames: 'change-case-all#pascalCase',
                        enumValues: 'keep',
                        transformUnderscore: true
                    }
                }
            }
        }
    };
    export default config;

`package.json`

    "scripts": {
        "codegen:local": "env-cmd -f .env.local.env graphql-codegen",
        "codegen:prod": "env-cmd -f .env.prod.env graphql-codegen",
        "codegen:stage": "env-cmd -f .env.stage.env graphql-codegen",
        "codegen": "pnpm codegen:local",
    },
