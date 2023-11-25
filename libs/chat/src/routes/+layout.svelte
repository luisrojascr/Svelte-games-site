<script lang="ts">
	import Chat from '$lib/chat.svelte';
	import '../app.postcss';

	console.log(`Chat wrapper version ${import.meta.env.VITE_APP_VERSION}`);
</script>

<svelte:head>
	<base href="/auth" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
	<meta name="google-signin-client_id" content={import.meta.env.VITE_GOOGLE_CLIENT_ID} />
</svelte:head>

<body>
	<Chat />
</body>
