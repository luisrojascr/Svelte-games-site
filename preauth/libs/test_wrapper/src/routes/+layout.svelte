<script lang="ts">
	import { TestWrapper } from '$lib';
	import { client, setClient } from '@infinitro/global';
	import '../app.css';

	try {
		setClient(client);
	} catch (e) {
		console.log(`error setting client: ${e}`);
	}
</script>

<svelte:head>
	<base href="/test_wrapper" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
</svelte:head>

<TestWrapper>
	<div class="flex justify-center items-center h-screen">
		<slot />
	</div>
</TestWrapper>
