<script lang="ts">
	import DropdownArrowIcon from '$lib/assets/images/DropdownArrowIcon.svelte';
	import type { Option } from '$lib/parts/store/mines-types';
	import { clickOutside } from '$lib/utils/click-outside-action';

	// Props for the CustomDropdown component
	export let options: Option[];
	export let handleOptionClick: (option: Option) => void;
	export let currentOption: Option;
	export let wrapperStyle: any;
	export let buttonStyle: any;
	export let label: string = '';
	export let labelV2: boolean = false;
	export let v2: boolean = false;
	export let v3: boolean = false;
	export let bgBlue: boolean = false;
	export let section: string = '';
	export let disabled: boolean = false;
	// export let isMobile: boolean | undefined;

	let showMenu: boolean = false;

	function handleChange(filteredOption: Option): void {
		handleOptionClick(filteredOption);
		showMenu = false;
	}

	const bgColor = v2 ? '#222C55' : '#ffffff';
</script>

<div class="wrapper" style={wrapperStyle} use:clickOutside={() => (showMenu = false)}>
	{#if label && labelV2}
		<div class="label-wrapper-v2">
			<span>{label}</span>
		</div>
	{/if}
	{#if label && !labelV2}
		<div class="label-wrapper">
			<span>{label}</span>
		</div>
	{/if}

	<button
		class="dropdown-button"
		on:click={() => (showMenu = !showMenu)}
		style={buttonStyle}
		{disabled}
	>
		<span class="button-content">
			{#if currentOption?.inputChildren}
				<svelte:component this={currentOption.inputChildren} />
			{:else}
				<span>{currentOption?.label}</span>
			{/if}

			<DropdownArrowIcon
				width="11px"
				height="6px"
				fill="#8b90a5"
				style={`transform: ${
					showMenu ? 'rotate(180deg)' : 'none'
				}; transition: all 0.2s ease-in-out;`}
			/>
		</span>
	</button>

	{#if showMenu}
		<div class="menu-content" style={`background-color: ${bgColor};`}>
			{#each options as filteredOption (filteredOption.value)}
				{#if filteredOption.value !== currentOption?.value}
					<button
						class="menu-button"
						on:click={() => handleChange(filteredOption)}
						style={buttonStyle}
					>
						<span class="button-content">
							{#if filteredOption.inputChildren}
								<svelte:component this={filteredOption.inputChildren} />
							{:else}
								<span>{filteredOption.label}</span>
							{/if}
						</span>
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		position: relative;
		width: 100%;
		position: relative;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.menu-content {
		width: 100%;
		color: rgb(255, 255, 255);
		position: absolute;
		display: flex;
		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
		border: 1px solid #d6d7df;
		flex-direction: column;
		top: calc(100% - 1px);
		pointer-events: all;
		min-width: 21px;
		z-index: 1400;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		background: #ffffff;
		background-color: #222c56;
	}
	.menu-content button:last-child {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		border-bottom: 1px solid #d6d7df;
		border: 'none';
	}

	.dropdown-button {
		width: 100%;
		font-family: 'Open Sans', serif;
		font-size: 12px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 2;
		letter-spacing: normal;
		color: #273262;
		touch-action: manipulation;
		position: relative;
		display: inline-flex;
		-webkit-box-pack: center;
		justify-content: space-between;
		-webkit-box-align: center;
		align-items: center;
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s,
			border-color 150ms ease;
		border-radius: 4px;

		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		border: 1px solid #d6d7df;
		border-bottom: 1px solid #d6d7df;
		background-color: #ffffff;
		padding: 6px 12px;
	}

	.dropdown-button:hover {
		border: 1px solid #8b90a5;
		transition: border 150ms ease;
	}

	.menu-button {
		font-family: 'Open Sans', serif;
		font-size: 12px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 2;
		letter-spacing: normal;
		color: #848aa0;
		touch-action: manipulation;
		position: relative;
		display: inline-flex;
		-webkit-box-pack: center;
		justify-content: flex-start;
		-webkit-box-align: center;
		align-items: center;
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
		border-top: solid 1px #d6d7df;

		padding: 6px 12px;
		border-left: 1px solid #d6d7df;
		border-right: 1px solid #d6d7df;
		border: none;
	}

	.menu-button:hover {
		background-color: #4b4b87;
		color: #273262;
	}

	.button-content {
		display: inline-flex;
		position: relative;
		-webkit-box-align: center;
		align-items: center;
		width: 100%;
		justify-content: center;
		transition:
			background 300ms ease 0s,
			opacity 300ms ease 0s,
			transform 100ms ease 0s;
	}

	.label-wrapper {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-family: 'Open Sans', serif;
		font-size: 12px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.33;
		letter-spacing: 1px;
		/* color: #848aa0; */
		color: #fff;
		margin-bottom: 8px;
	}

	.label-wrapper span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	.label-wrapper-v2 {
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		font-family: 'Open Sans', serif;
		font-size: 10px;
		font-weight: bold;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.6;
		-webkit-letter-spacing: 0.6px;
		-moz-letter-spacing: 0.6px;
		-ms-letter-spacing: 0.6px;
		letter-spacing: 0.6px;
		color: #848aa0;
		margin: 0px 0px 0.25em;
		-webkit-transition: all 200ms ease-out 0s;
		transition: all 200ms ease-out 0s;
	}

	.label-wrapper-v2 span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	/* @media (max-width: 580px) {
		.wrapper {
			width: 100% !important;
			max-width: 100% !important;
			margin-top: 0px !important;
		}
	} */
</style>
