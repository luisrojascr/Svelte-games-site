<script lang="ts">
	import { from } from '@apollo/client';
	import { Header } from '@infinitro/header_preauth';
	import { SideBar } from '@infinitro/sidebar_preauth';
	import { VIP } from '@infintro/vip_preauth';
	import '../app.postcss';

	console.log(`pre-auth website version ${import.meta.env.VITE_APP_VERSION}`);
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
	<meta name="google-signin-client_id" content={import.meta.env.VITE_GOOGLE_CLIENT_ID} />
</svelte:head>

<div class="flex flex-row w-full">
	<div>
		<Header />
	</div>
	<div class="top-16 absolute flex flex-row w-full">
		<div class="fixed overflow-hidden w-56">
			<SideBar />
		</div>
		<div class="w-full justify-center ml-56">
			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(body) {
		@apply bg-primary-900;
	}
</style>
