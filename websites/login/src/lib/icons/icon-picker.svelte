<script lang="ts">
	import CardsIcon from '$lib/icons/cards.svelte';
	import LobbyIcon from '$lib/icons/lobby.svelte';
	import OriginalsIcon from '$lib/icons/originals.svelte';
	import PopularIcon from '$lib/icons/popular.svelte';
	import NewGamesIcon from '$lib/icons/newgames.svelte';
	import PromotionIcon from '$lib/icons/promotion.svelte';
	import GameShowsIcon from '$lib/icons/game-shows.svelte';
	import ProviderIcon from '$lib/icons/provider.svelte';
	import FeatureBuyInIcon from '$lib/icons/feature-buyin.svelte';
	import SlotsIcon from '$lib/icons/slots.svelte';

	enum Icon {
		CardsIcon = 'CardsIcon',
		LobbyIcon = 'LobbyIcon',
		OriginalsIcon = 'OriginalsIcon',
		PopularIcon = 'PopularIcon',
		NewGamesIcon = 'NewGamesIcon',
		PromotionIcon = 'PromotionIcon',
		GameShowsIcon = 'GameShowsIcon',
		ProviderIcon = 'ProviderIcon',
		FeatureBuyInIcon = 'FeatureBuyInIcon',
		SlotsIcon = 'SlotsIcon'
	}

	export let icon: string = 'CardsIcon';
	export let size: number = 20;
	export let active: boolean = false;
	export let hover: boolean = true;
	export let color: string | undefined = undefined;
</script>

{#if icon === Icon.CardsIcon}
	<CardsIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.LobbyIcon}
	<LobbyIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.OriginalsIcon}
	<OriginalsIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.PopularIcon}
	<PopularIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.NewGamesIcon}
	<NewGamesIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.PromotionIcon}
	<PromotionIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.GameShowsIcon}
	<GameShowsIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.ProviderIcon}
	<ProviderIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.FeatureBuyInIcon}
	<FeatureBuyInIcon {size} {active} bind:hover {color} />
{:else if icon === Icon.SlotsIcon}
	<SlotsIcon {size} {active} bind:hover {color} />
{/if}
