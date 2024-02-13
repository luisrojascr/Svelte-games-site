# test wrapper (pre-auth)

This is a wrapper for libraries that do not require post-auth API access (does not require test users).
It provides for language selection.

`pnpm i -D ../test-wrapper-preauth`

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
