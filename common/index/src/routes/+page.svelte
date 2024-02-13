<script lang="ts">
	import { locale } from '$lib/locale/i18n';

	locale.set('en');
</script>

<div class="margins">
	<div class="page">
		<ul>
			<h1>Pre-Auth Components</h1>
			<li><a href="/auth">Auth</a></li>
			<li><a href="/header_preauth">Header</a></li>
			<li><a href="/sidebar_preauth">Sidebar</a></li>
			<li><a href="/vip_preauth">VIP</a></li>
		</ul>
		<ul>
			<h1>Post-Auth Components</h1>
			<li><a href="/cashier">Cashier</a></li>
			<li><a href="/chat">Chat</a></li>
			<li><a href="/settings">Settings</a></li>
			<li><a href="/vip">VIP</a></li>
		</ul>
		<ul>
			<h1>Games</h1>
			<li><a href="/ape-crash">Ape Crash</a></li>
		</ul>
		<ul>
			<h1>Pre-Auth</h1>
			<li><a href="/preauth-ui">UI Layer</a></li>
			<li><a href="/preauth-website">Website</a></li>
		</ul>
		<ul>
			<h1>Post-Auth</h1>
			<li><a href="/postauth-ui">UI Layer</a></li>
			<li><a href="/postauth-website">Website</a></li>
		</ul>
		<ul>
			<h1>Templates</h1>
			<li><a href="/template">Template</a></li>
			<li><a href="/template_preauth">Template (Pre-Auth)</a></li>
			<li><a href="/template_postauth">Template (Post-Auth)</a></li>
			<li><a href="/test_wrapper_preauth">Test Wrapper (Pre-Auth)</a></li>
			<li><a href="/test_wrapper_postauth">Test Wrapper (Post-Auth)</a></li>
		</ul>
	</div>
</div>

<style lang="postcss">
	div.margins {
		@apply flex justify-center items-center;
	}
	div.page {
		@apply w-1/2 min-w-96;
	}
	ul {
		@apply pb-6;
	}
	h1 {
		@apply text-lg font-bold;
	}
	a {
		@apply text-blue-500;
	}
</style>
