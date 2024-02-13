# Svlete Library Extended Template with API

## This extends the svelte library template and adds the GraphQL API client

Continuing where [Svelte Library Extended Template API](../template_extended_api/) left off...

Switch to post-auth global and test wrapper

    pnpm remove @infinitro/global @infinitro/test-wrapper-preauth

# Globals Library

    pnpm i ../global_postauth

`codgegen.ts`

    import type { CodegenConfig } from '@graphql-codegen/cli';

    const config: CodegenConfig = {
        schema: process.env.VITE_API_URL,
        documents: ['src/**/*.graphql'],
        generates: {
            'src/lib/api/api.ts': {
                plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
                config: {
                    clientPath: '@infinitro/global-postauth',
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

# Test Wrapper

    pnpm i -D ../test_wrapper

use:

`+layout.svelte`

    <script lang="ts">
        import { TestWrapper } from '@infinitro/test-wrapper';
    </script>

    <TestWrapper>
        <div class="flex justify-center items-center h-screen">
            <slot />
        </div>
    </TestWrapper>
