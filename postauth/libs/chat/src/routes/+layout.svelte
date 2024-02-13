<script lang="ts">
	import { client, setClient } from '@infinitro/global-postauth';
	import { TestWrapper } from '@infinitro/test-wrapper';
	import '../app.postcss';

	try {
		setClient(client);
	} catch (e) {
		console.log(`error setting client: ${e}`);
	}
</script>

<svelte:head>
	<base href="/chat" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
</svelte:head>

<TestWrapper>
	<div class="flex">
		<slot />
	</div>
</TestWrapper>
