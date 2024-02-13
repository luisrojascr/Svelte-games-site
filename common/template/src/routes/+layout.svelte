<script lang="ts">
	import { TestWrapper } from '@infinitro/test-wrapper-preauth';
	import '../app.css';
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
	<base href="/template" />
</svelte:head>

<TestWrapper>
	<div class="flex justify-center items-center h-screen">
		<slot />
	</div>
</TestWrapper>
