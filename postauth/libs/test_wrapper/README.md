# test wrapper (post-auth)

This is a wrapper for libraries that access post-auth APIs to manage testuser authentication/selection and language selection.

`pnpm i -D ../test-wrapper`

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
