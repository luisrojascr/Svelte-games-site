<script lang="ts">
	import CCIcon from '$lib/icons/cc.svelte';
	import { locale } from '$lib/locale/i18n';

	let element: HTMLSelectElement;
	let value = '';

	const onChange = () => {
		locale.set(element.value);
	};

	locale.subscribe((_value) => {
		value = _value;
		if (element) element.value = _value;
	});
</script>

<span class="section">
	<div class="relative w-full">
		<div class="leading-icon">
			<CCIcon />
		</div>
		<select
			name="language"
			id="language"
			bind:this={element}
			on:change={onChange}
			on:input={onChange}
			{value}
		>
			<option value="cs">Čeština</option>
			<option value="en">English</option>
			<option value="de">Deutsch</option>
			<option value="es">Español</option>
			<option value="fr">Français</option>
			<option value="it">Italiano</option>
			<option value="pt">Português</option>
			<option value="ru">Русский</option>
			<option value="zh">中文</option>
			<option value="ja">日本語</option>
		</select>
	</div>
</span>

<style lang="postcss">
	.section {
		@apply pt-4 flex;
	}
	.leading-icon {
		@apply absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none;
	}
	select,
	select:disabled {
		@apply border bg-background-900 border-100 text-white text-sm rounded-lg block w-full p-2.5 pl-10;
	}
	select:focus {
		@apply border bg-background-900  text-white text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 pl-10;
	}
</style>
