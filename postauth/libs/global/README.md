# global post-auth library

`pnpm i ../global`

This library exports:

- **client** -- the Apollo GraphQL client
- **loggedIn** -- Svelte store state variable
- **setClient** -- the Svelte Apollo method to set the global Apollo GraphQL client (which should be done in global layout)
- **token** -- Svelte store state variable
- **username** -- Svelte store state variable
- **verifyToken** -- JWT token verification method, returns claims

This library also by way of dependencies will add `@apollo/client` `jwt-decode` and `svelte-apollo`

To utilize in +layout.svelte:

    <script lang="ts">
        import { client, setClient } from '@infinitro/global-postauth';

        try {
            setClient(client);
        } catch (e) {
            console.log(`error setting client: ${e}`);
        }
    </script>
