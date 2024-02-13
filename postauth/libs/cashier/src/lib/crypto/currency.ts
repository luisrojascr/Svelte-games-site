export enum TokenMode {
	Deposit = 'deposit',
	Withdraw = 'withdraw'
}

export enum FiatCurrency {
	usd = 'usd',
	eur = 'eur',
	jpy = 'jpy'
}

export const fiatCurrencies = [FiatCurrency.usd, FiatCurrency.eur, FiatCurrency.jpy];

export enum CryptoNetworkEnum {
	arb = 'arb',
	avax = 'avax',
	base = 'base',
	bsc = 'bsc',
	btc = 'btc',
	doge = 'doge',
	eth = 'eth',
	ln = 'ln',
	ltc = 'ltc',
	polygon = 'polygon',
	op = 'op'
}

export enum CryptoCurrencyEnum {
	bnb = 'bnb',
	btc = 'btc',
	doge = 'doge',
	eth = 'eth',
	ltc = 'ltc',
	matic = 'matic',
	usdc = 'usdc',
	usdt = 'usdt'
}

export const cryptoCurrencies = [
	CryptoCurrencyEnum.bnb,
	CryptoCurrencyEnum.btc,
	CryptoCurrencyEnum.doge,
	CryptoCurrencyEnum.eth,
	CryptoCurrencyEnum.ltc,
	CryptoCurrencyEnum.matic,
	CryptoCurrencyEnum.usdc,
	CryptoCurrencyEnum.usdt
];

export type Token = {
	name: string;
	decimalDisplayLength: number; // how many digits after the decimal point is *displayed* to the player
	currency: CryptoCurrencyEnum;
	networks?: CryptoNetworkEnum[];
	unsupported?: CryptoNetworkEnum[];
};

export type Network = {
	name: string;
	network: CryptoNetworkEnum;
	currencies?: CryptoCurrencyEnum[];
	unsupported?: boolean;
};

export const tokens: Token[] = [
	{
		name: 'BNB',
		decimalDisplayLength: 4,
		currency: CryptoCurrencyEnum.bnb,
		networks: [CryptoNetworkEnum.bsc],
		unsupported: [CryptoNetworkEnum.eth, CryptoNetworkEnum.polygon]
	},
	{
		name: 'Bitcoin',
		decimalDisplayLength: 7,
		currency: CryptoCurrencyEnum.btc,
		networks: [CryptoNetworkEnum.btc],
		unsupported: [
			CryptoNetworkEnum.arb,
			CryptoNetworkEnum.avax,
			CryptoNetworkEnum.base,
			CryptoNetworkEnum.eth,
			CryptoNetworkEnum.bsc,
			CryptoNetworkEnum.ln,
			CryptoNetworkEnum.op,
			CryptoNetworkEnum.polygon
		]
	},
	{
		name: 'Dogecoin',
		decimalDisplayLength: 1,
		currency: CryptoCurrencyEnum.doge,
		networks: [CryptoNetworkEnum.doge],
		unsupported: [CryptoNetworkEnum.bsc]
	},
	{
		name: 'Ethereum',
		decimalDisplayLength: 6,
		currency: CryptoCurrencyEnum.eth,
		networks: [CryptoNetworkEnum.eth],
		unsupported: [
			CryptoNetworkEnum.base,
			CryptoNetworkEnum.arb,
			CryptoNetworkEnum.avax,
			CryptoNetworkEnum.bsc,
			CryptoNetworkEnum.op,
			CryptoNetworkEnum.polygon
		]
	},
	{
		name: 'Litecoin',
		decimalDisplayLength: 4,
		currency: CryptoCurrencyEnum.ltc,
		networks: [CryptoNetworkEnum.ltc],
		unsupported: [CryptoNetworkEnum.bsc]
	},
	{
		name: 'Matic Token',
		decimalDisplayLength: 2,
		currency: CryptoCurrencyEnum.matic,
		networks: [CryptoNetworkEnum.polygon],
		unsupported: [CryptoNetworkEnum.bsc, CryptoNetworkEnum.eth]
	},
	{
		name: 'Tether',
		decimalDisplayLength: 2,
		currency: CryptoCurrencyEnum.usdt,
		networks: [CryptoNetworkEnum.bsc, CryptoNetworkEnum.eth, CryptoNetworkEnum.polygon],
		unsupported: [
			CryptoNetworkEnum.arb,
			CryptoNetworkEnum.avax,
			CryptoNetworkEnum.base,
			CryptoNetworkEnum.btc,
			CryptoNetworkEnum.op
		]
	},
	{
		name: 'USD Coin',
		decimalDisplayLength: 2,
		currency: CryptoCurrencyEnum.usdc,
		networks: [CryptoNetworkEnum.eth, CryptoNetworkEnum.polygon],
		unsupported: [
			CryptoNetworkEnum.arb,
			CryptoNetworkEnum.avax,
			CryptoNetworkEnum.base,
			CryptoNetworkEnum.bsc,
			CryptoNetworkEnum.op
		]
	}
];

export const networks: Network[] = [
	{ name: 'Arbitrum', network: CryptoNetworkEnum.arb, unsupported: true },
	{ name: 'Avalanche', network: CryptoNetworkEnum.avax, unsupported: true },
	{ name: 'Base', network: CryptoNetworkEnum.base, unsupported: true },
	{
		name: 'Binance Smart Chain',
		network: CryptoNetworkEnum.bsc,
		currencies: [CryptoCurrencyEnum.bnb, CryptoCurrencyEnum.usdt]
	},
	{ name: 'Bitcoin Mainnet', network: CryptoNetworkEnum.btc, currencies: [CryptoCurrencyEnum.btc] },
	{
		name: 'Dogecoin Mainnet',
		network: CryptoNetworkEnum.doge,
		currencies: [CryptoCurrencyEnum.doge]
	},
	{
		name: 'Ethereum Mainnet',
		network: CryptoNetworkEnum.eth,
		currencies: [CryptoCurrencyEnum.eth, CryptoCurrencyEnum.usdc, CryptoCurrencyEnum.usdt]
	},
	{ name: 'Lightning Network', network: CryptoNetworkEnum.ln, unsupported: true },
	{
		name: 'Litecoin Mainnet',
		network: CryptoNetworkEnum.ltc,
		currencies: [CryptoCurrencyEnum.ltc]
	},
	{ name: 'Optimism', network: CryptoNetworkEnum.op, unsupported: true },
	{
		name: 'Polygon',
		network: CryptoNetworkEnum.polygon,
		currencies: [CryptoCurrencyEnum.matic, CryptoCurrencyEnum.usdc, CryptoCurrencyEnum.usdt]
	}
];

export const decimalDisplayLength = (currency: CryptoCurrencyEnum | string): number =>
	tokens.find((token) => token.currency === currency)?.decimalDisplayLength || 8;

// displays the string amount with the correct number of decimal places for the given currency
export const displayCryptoCurrency = (
	amount: string,
	currency: CryptoCurrencyEnum | string
): string => {
	if (!amount) return '';
	const amountParts = amount.split('.');
	const digits = decimalDisplayLength(currency);
	if (amountParts.length === 1) {
		return amount + '.' + '0'.repeat(digits);
	}
	if (amountParts[1].length >= digits) {
		return amountParts[0] + '.' + amountParts[1].substring(0, digits);
	}
	return amountParts[0] + '.' + amountParts[1] + '0'.repeat(digits - amountParts[1].length);
};

// returns the number of networks that support the given currency
export const networksForCurrency = (currency: CryptoCurrencyEnum | undefined): number => {
	if (!currency) return 0;
	return tokens.find((token) => token.currency === currency)?.networks?.length ?? 0;
};

// returns the number of currencies that are supported by the given network
export const currenciesForNetwork = (network: CryptoNetworkEnum | undefined): number => {
	if (!network) return 0;
	return networks.find((item) => item.network === network)?.currencies?.length ?? 0;
};

// returns the default (1st) networks that supports the given currency
export const defaultNetworkForCurrency = (
	currency: CryptoCurrencyEnum | undefined
): undefined | CryptoNetworkEnum => {
	if (!currency) return undefined;
	const cryptoToken = tokens.find((item) => item.currency === currency);
	return (cryptoToken?.networks?.length ?? 0) > 0 ? cryptoToken!.networks![0] : undefined;
};

// returns the default (1st) currency that supports the given network
export const defaultCurrencyForNetwork = (
	network: CryptoNetworkEnum | undefined
): undefined | CryptoCurrencyEnum => {
	if (!network) return undefined;
	const cryptoNet = networks.find((item) => item.network === network);
	return (cryptoNet?.currencies?.length ?? 0) > 0 ? cryptoNet!.currencies![0] : undefined;
};
