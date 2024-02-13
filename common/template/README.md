# Svlete Library Extended Template

## This extends the svelte library template

    pnpm create svelte@latest template

[ ] SvelteKit demo app

[ ] Skeleton project

[X] **Library Project**

---

[ ] Yes, using Javascript with JSDoc comments

[X] **Yes, using Typescript syntax**

[ ] No

---

[X] **Add ESLint for code linting**

[X] **Add Prettier for code formatting**

[X] **Add Playright for browser testing**

[ ] Try the Svelte 5 preview (unstable!)

---

# Static Adapeter and Server-Side Generation (SSG)

https://kit.svelte.dev/docs/adapter-static

    pnpm i -D @sveltejs/adapter-static
    pnpm remove @sveltejs/adapter-auto

`svelte.config.js`

    import adapter from '@sveltejs/adapter-static';
    import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

    /\*_ @type {import('@sveltejs/kit').Config} _/
    const config = {
    preprocess: vitePreprocess(),

    	kit: {
    		adapter: adapter({
    			pages: 'build',
    			assets: 'build',``
    			fallback: undefined,
    			precompress: false,
    			strict: true
    		})
    	}

    };

    export default config;

`./src/routes/+layout.ts`

    export const prerender = true;
    export const ssr = false;

# Tailwind CSS

https://tailwindcss.com/docs/guides/sveltekit

    pnpm install -D tailwindcss postcss autoprefixer
    pnpx tailwindcss init -p

`tailwind.config.js`

    export default {
    	content: ['./src/**/*.{html,js,svelte,ts}'],
    };

`./src/app.css`

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

`./src/routes/+layout.svelte`

    <script>
    	import '../app.css';
    </script>

    <slot />

# Subfolder Path

setup library to run in a subfolder so we can publish on a single dev site of libraries

`svelte.config.js`

    kit: {
    	paths: { base: '/template' }
    }

`./src/routes/+layout.svelte`

    <svelte:head>
    	<base href="/template" />
    </svelte:head>

`package.json`

    vite build --base=/template/

# Environments

    pnpm install -D env-cmd

`.env.local.env
.env.prod.env
.env.stage.env`

    # This must not contain sensitive or confidential information as it is bundled into client-side code

`package.json`

    "scripts": {
    	"dev": "pnpm dev:local",
    	"dev:prod": "NODE_ENV=production VITE_GIT_VERSION=$(git rev-parse --short HEAD) VITE_APP_VERSION=$npm_package_version env-cmd -f .env.prod.env vite dev",
    	"dev:stage": "NODE_ENV=production VITE_GIT_VERSION=$(git rev-parse --short HEAD) VITE_APP_VERSION=$npm_package_version env-cmd -f .env.stage.env vite dev",
    	"dev:local": "NODE_ENV=production VITE_GIT_VERSION=$(git rev-parse --short HEAD) VITE_APP_VERSION=$npm_package_version env-cmd -f .env.local.env vite dev",
    	"build:prod": "NODE_ENV=production VITE_GIT_VERSION=$(git rev-parse --short HEAD) VITE_APP_VERSION=$npm_package_version env-cmd -f .env.prod.env vite build --base=/template/ && npm run package",
    	"build": "pnpm build:local",
    	"build:stage": "NODE_ENV=production VITE_GIT_VERSION=$(git rev-parse --short HEAD) VITE_APP_VERSION=$npm_package_version env-cmd -f .env.stage.env vite build --base=/template/ && npm run package",
    	"build:local": "NODE_ENV=production VITE_GIT_VERSION=$(git rev-parse --short HEAD) VITE_APP_VERSION=$npm_package_version env-cmd -f .env.local.env vite build --base=/template/ && npm run package"
    }

# Globals Library

    pnpm i ../global

# Test Wrapper

    pnpm i -D ../test_wrapper_preauth

use:

`+layout.svelte`

    <script lang="ts">
        import { TestWrapper } from '@infinitro/test-wrapper-preauth';
    </script>

    <TestWrapper>
        <div class="flex justify-center items-center h-screen">
            <slot />
        </div>
    </TestWrapper>

# Localization

`./src/lib/locale/i18n.ts`

    import { locale, t } from '$lib/locale/i18n';

    locale.set(lang) -> set locale language

    $t('code') -> localized string

`./src/lib/locale/langs.ts`

Languages we are translated into

`./src/lib/locale/translations.ts`

Aggregation of translations

`./src/lib/locale/types.ts`

Types related to localization

`./src/lib/locale/edited/en.json`

This is the primary English language translation of the libraries strings.

`./src/lib/locale/prompt/en.json`

This is generally just a copy of the primary English translation but can be edited if those edits produce better translations. It is the default English source file passed to AI for translation into each language.

`./src/lib/locale/prompt/{lang}.json`

The English source passed to the AI for each language can be overrided per language in case a different English source leads to better translation for that language.

`./src/lib/locale/generated/{lang}.json`

This is the generated output produced by the prompt for each language, without edits.

`./src/lib/locale/edited/{lang}.json`

This is the generated output produced by the prompt for each language, with post-generation edits. This will be the file used for the respective language.

`package.json`

    "scripts": {
    	"localegen": "cd ../../scripts && pnpm gen_locale libs/template"
    }
