<script lang="ts">
	import Sidebar from '$lib/nav/sidebar.svelte';
	import { menuAutoCollapsed, navigatePage } from '$lib/nav/state';
	import Topnav from '$lib/nav/topnav.svelte';
	import '../app.postcss';

	// menu auto-collapse indicates whether the sidebar menu should autocollapse on desktop
	// this is set by the hamburger menu button in the topnav when in deskptop (lg) viewarea
	let _menuAutoCollapsed: boolean = false;
	menuAutoCollapsed.subscribe((value: boolean) => (_menuAutoCollapsed = value));

	let iframe: HTMLIFrameElement | null | undefined = null;
	let contentWindow: Window | null | undefined = null;
	const iframeHost = import.meta.env.VITE_INNER_URL;
	console.log(`postauth website version ${import.meta.env.VITE_APP_VERSION}`);

	function iframe_loaded(event: Event) {
		contentWindow = iframe?.contentWindow;
	}

	navigatePage.subscribe((page: string) => {
		if (contentWindow && contentWindow.postMessage) {
			contentWindow.postMessage('this is the parent', '*');
			// console.log(`posted message to ${iframeHost}`);
		}
		if (iframe && iframe.contentWindow) {
			iframe.contentWindow.postMessage('this is the parent', '*');
			// console.log(`posted message to ${iframeHost}`);
		}
		console.log(`posted message to ${iframeHost}`);
	});

	window.addEventListener('message', (event) => {
		// if (event.origin !== iframeHost) return;
		console.log(`iframe parent got message from event.orgin ${event.origin} ${event.data}`);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
</svelte:head>

<body class="bg-background-950">
	<Topnav />
	<div class="flex pt-16">
		<Sidebar />
		<div
			id="main-content"
			class="overflow-y-auto h-full absolute bottom-0 right-0 top-16 left-0 border-t border-100 {_menuAutoCollapsed
				? 'lg:ml-16'
				: 'lg:ml-60'}"
		>
			<iframe
				id="iframe"
				src={iframeHost}
				class="w-full h-full"
				title="Casino"
				bind:this={iframe}
				on:load={iframe_loaded}
				on:message={(event) => {
					console.log(`iframe got message from event.orgin ${event.origin} ${event.data}`);
				}}
			/>
		</div>
	</div>
</body>

<style type="postcss">
	:global(body) {
		@apply bg-background-950;
	}
</style>
