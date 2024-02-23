<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

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
	export let isMobile: boolean | undefined;
	export let bgColor = '#222C55';

	let showMenu: boolean = false;

	function toggleDropdown() {
		showMenu = !showMenu;
	}

	const handleChange = (filteredOption: Option): void => {
		handleOptionClick(filteredOption);
		showMenu = false;
	};

	$: displayStyle = v3 ? 'grid' : 'flex';
	$: gridColumns = v3 ? 'repeat(auto-fill, minmax(50px, 1fr))' : '';
	$: borderColor = v3 ? '#d6d7df' : '';
	$: backgroundColor = bgBlue ? '#222c56' : '#ffffff';

	$: borderBottomLeftRadius = showMenu ? '0' : '4px';
	$: borderBottomRightRadius = showMenu ? '0' : '4px';
	$: borderStyle = `1px solid ${showMenu ? '' : '#8b90a5'}`;
	$: computedButtonStyle = `${buttonStyle}; border-bottom-left-radius: ${borderBottomLeftRadius}; border-bottom-right-radius: ${borderBottomRightRadius}; background-color: ${bgColor}; border: ${borderStyle};`;
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

	<button class="dropdown-button" on:click={toggleDropdown} style={computedButtonStyle} {disabled}>
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
		<div
			class="menu-content"
			style={`
				display: ${displayStyle};
				grid-template-columns: ${gridColumns};
				border: 1px solid ${borderColor};
				background-color: ${backgroundColor};
			`}
		>
			{#each options as filteredOption (filteredOption.value)}
				{#if filteredOption.value !== currentOption?.value}
					<button
						class="menu-button"
						on:click={() => handleChange(filteredOption)}
						style={`${buttonStyle}; ${v3 ? '' : `border: 1px solid #d6d7df;`}; background-color: ${
							bgColor ? bgColor : '#ffffff'
						};`}
						class:bg-blue={bgColor === '#222c56'}
						class:v3
						class:is-mobile={isMobile}
					>
						<span class="button-content" class:v3>
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
		@apply relative w-full justify-center inline-flex flex-col items-start;
		-webkit-box-pack: center;
		-webkit-box-align: center;
	}

	.menu-content {
		@apply w-full text-white absolute flex-col top-[calc(100%_-_1px)] pointer-events-auto min-w-[21px] z-[1400] rounded-bl rounded-br;
	}

	.menu-content button :last-child {
		@apply rounded-bl rounded-br border-b-[1px_solid_#d6d7df];
	}

	.dropdown-button {
		@apply w-full text-xs font-bold leading-[2] text-white touch-manipulation relative inline-flex justify-between items-center rounded p-[6px_12px] transition-[background_300ms_ease_0s,opacity_300ms_ease_0s,transform_100ms_ease_0s,border-color_150ms_ease];
	}

	.dropdown-button :hover {
		@apply transition-[border_150ms_ease];
	}

	.menu-button {
		@apply text-xs font-bold leading-[2] text-white relative inline-flex justify-start items-center p-[6px_12px] transition-[background_300ms_ease,opacity_300ms_ease,transform_100ms_ease];
	}

	/* .menu-button :hover {
		@apply bg-[#4b4b87] text-[#273262];
	} */

	.bg-blue {
		@apply bg-[#222c56];
	}

	.v3 {
		@apply justify-center border-none;
	}

	.button-content {
		@apply inline-flex items-center w-full justify-between transition-[background_300ms_ease,opacity_300ms_ease,transform_100ms_ease];
	}

	.button-content .v3 {
		@apply justify-center;
	}

	.label-wrapper {
		@apply flex justify-start items-center text-xs font-bold leading-[1.33] tracking-[1px] text-white mb-2;
	}

	.label-wrapper span {
		@apply inline-flex justify-center items-center;
	}

	.label-wrapper-v2 {
		@apply inline-flex items-center text-[10px] font-bold leading-[1.6] tracking-[0.6px] text-[#848aa0] m-[0_0_0.25em] transition-[all_200ms_ease-out_0s];
		display: -webkit-inline-box;
		display: -webkit-inline-flex;
		display: -ms-inline-flexbox;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-letter-spacing: 0.6px;
		-moz-letter-spacing: 0.6px;
		-ms-letter-spacing: 0.6px;
		-webkit-transition: all 200ms ease-out 0s;
	}

	.label-wrapper-v2 span {
		@apply inline-flex justify-center items-center;
	}

	/* @media (max-width: 580px) {
		.wrapper {
			width: 100% !important;
			max-width: 100% !important;
			margin-top: 0px !important;
		}
	} */
</style>
