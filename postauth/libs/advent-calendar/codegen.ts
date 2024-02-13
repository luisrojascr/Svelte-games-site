import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://0.0.0.0:8000', //'https://auth-api.flushgames.net', //,
	documents: ['src/**/*.graphql'],
	generates: {
		'src/lib/api/api.ts': {
			plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
			config: {
				clientPath: '$lib/api/api_client',
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
