export type Category = {
	name: string;
	icon: string;
	sidebarOrder: number | undefined;
	href: string;
};

export const categories: Category[] = [
	{
		name: 'Lobby',
		icon: 'LobbyIcon',
		sidebarOrder: 1,
		href: '/'
	},
	{
		name: 'Popular Games',
		icon: 'PopularIcon',
		sidebarOrder: 2,
		href: '/populargames'
	},
	{
		name: 'New Games',
		icon: 'NewGamesIcon',
		sidebarOrder: 3,
		href: '/newgames'
	},
	{
		name: 'Flush Originals',
		icon: 'OriginalsIcon',
		sidebarOrder: 4,
		href: '/originals'
	},
	{
		name: 'Live Casino',
		icon: 'CardsIcon',
		sidebarOrder: 5,
		href: '/livecasino'
	},
	{
		name: 'Feature Buy-In',
		icon: 'FeatureBuyInIcon',
		sidebarOrder: 6,
		href: '/featurebuyin'
	},
	{
		name: 'Game Shows',
		icon: 'GameShowsIcon',
		sidebarOrder: 7,
		href: '/gameshows'
	},
	{
		name: 'Slots',
		icon: 'SlotsIcon',
		sidebarOrder: 8,
		href: '/slots'
	},
	{
		name: 'Providers',
		icon: 'ProviderIcon',
		sidebarOrder: 9,
		href: '/provider'
	},
	{
		name: 'Promotions',
		icon: 'PromotionIcon',
		sidebarOrder: 10,
		href: '/promotion-page'
	}
];
