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
