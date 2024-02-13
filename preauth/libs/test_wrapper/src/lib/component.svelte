<script lang="ts">
	import { AsyncServerState, ServerState } from '$lib/api/api';
	import { t } from '$lib/locale/i18n';

	async function clickHandler(e: Event) {
		try {
			const result = await AsyncServerState({});
			let message: String = `${$t('hello')} ${result.data.health.appName} ${
				result.data.health.appVersion
			}`;
			alert(message);
		} catch (e: any) {
			console.log(`api error ${e?.message ?? 'unknown'}`);
		}
	}
</script>

<button type="button" class="purple" on:click={clickHandler}>{$t('svelte_component')}</button>

<style lang="postcss">
	button.purple {
		@apply focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900;
	}
</style>
