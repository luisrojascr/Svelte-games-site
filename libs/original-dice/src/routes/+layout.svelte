<script lang="ts">
	// import { client } from '$lib/api/api_client';
	// import { setClient } from 'svelte-apollo';
	import '../app.postcss';

	// try {
	// 	setClient(client);
	// } catch (e) {
	// 	console.log(`error setting client: ${e}`);
	// }

	console.log(`Ape-game version ${import.meta.env.VITE_APP_VERSION}`);
</script>

<svelte:head>
	<base href="/vip" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins:400,600,700" rel="stylesheet" />
</svelte:head>

<div class="bg-primary-950 h-screen">
	<slot />
</div>
