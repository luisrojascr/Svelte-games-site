<script lang="ts">
	import '../app.postcss';

	console.log(`post-auth ui version ${import.meta.env.VITE_APP_VERSION}`);
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
</svelte:head>

<slot />
