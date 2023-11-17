import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://0.0.0.0:8000',
	documents: ['**/**/*.graphql'],
	generates: {
		'src/lib/api.ts': {
			plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
			config: {
				clientPath: 'src/lib/api/api_client.ts',
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
