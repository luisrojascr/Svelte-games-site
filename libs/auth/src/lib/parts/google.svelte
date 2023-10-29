<script lang="ts">
	import * as jose from 'jose';
	import { onMount } from 'svelte';
	import { stateEmail, stateEmailConfirmed, stateGoogleToken } from '../state';
	onMount(() => {
		window.onGoogleSignIn = (response: any) => {
			try {
				const jwt = jose.decodeJwt(response.credential);
				console.log(JSON.stringify(jwt, null, 4));
				if (jwt?.email_verified && jwt?.email) {
					stateEmail.set(jwt!.email as string);
					stateGoogleToken.set(response.credential);
					stateEmailConfirmed.set(true);
				}
			} catch (e) {
				console.log(`error verifying Google credentails: ${e}`);
			}
		};
	});
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
	data-context="signin"
	data-ux_mode="popup"
	data-callback="onGoogleSignIn"
	data-itp_support="true"
/>

<div
	data-type="standard"
	data-shape="pill"
	data-theme="filled_blue"
	data-size="large"
	data-logo_alignment="left"
	data-width="184"
	class="g_id_signin"
/>

<style lang="postcss">
	/* .google {
		@apply w-full text-white bg-[#1a73e8] hover:bg-[#4d92ed] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
	} */
</style>
