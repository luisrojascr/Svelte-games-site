import { CurrencyEnum, DiceRollConditionEnum, LanguageEnum, OnLoss, OnWin } from '$lib/utils/cc';
import { decimalCryptoDisplay, decimalDisplayLength, generateRandomHex } from '$lib/utils/helper.js';
import { derived, get, writable } from 'svelte/store';

export interface Bet {
    id: string;
    numberRolled: string;
    win: boolean;
}

export interface BalanceItem {
    sessionId: number | string;
    balance: number;
}

export const FiatArr = ['usd', 'jpy', 'eur'];
export const CryptoArr = [
    'arb', 'ava', 'bnb', 'btc', 'cro', 'dai', 'dash', 'demo', 'doge', 'eth',
    'ftm', 'ltc', 'matic', 'usdc', 'usdt'
];

function getURLParameter(param: string, defaultValue: string) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || defaultValue;
}

export const currentWalletState = writable<{ type: CurrencyEnum; available: number }>({
    type: CurrencyEnum.usdt,
    available: 100,
});

export const currency = writable(getURLParameter('currency', 'usdt'));
export const fiat = writable(getURLParameter('fiat', ''));
export const startBalance = writable(getURLParameter('startBalance', '1000'))
export const sessionId = writable(getURLParameter('sessionId', '1001'))
export const maxWin = writable(getURLParameter('maxWin', '1000'))
export const minBet = writable(getURLParameter('minBet', '0'))
export const maxBet = writable(getURLParameter('maxBet', '100'))

export const gameInProgress = writable(false);
export const autoBetInProgress = writable(false);
export const pastBets = writable<Bet[]>([]);
export const rotateBoxTo = writable(0);
export const angle = writable(0);

export const numberRolled = writable(0);
export const rollOverUnder = writable('50.50');
export const isRollOverOrUnder = writable<DiceRollConditionEnum>(DiceRollConditionEnum.Over);

export const betAmount = writable('0');
export const cashout = writable('2.00');
export const winChance = writable('49.50');

export const initialBetAmount = writable(0);

// export const initialBetAmount = derived(currentWalletState, ($currentWalletState: { type: CurrencyEnum; available: number }) =>
//     decimalCryptoDisplay(0, $currentWalletState.type)
// );

export const onWin = writable('3');
export const onLoss = writable('0');
export const currentProfit = writable(0);
export const profitOnWin = writable('0');

export const inputStopOnProfit = writable(0);
export const inputStopOnLoss = writable(0);

// export const stopOnProfit = derived(
//     [inputStopOnProfit, currentWalletState],
//     ([$inputStopOnProfit, $currentWalletState]) => decimalCryptoDisplay($inputStopOnProfit, $currentWalletState.type)
// )

// export const stopOnLoss = derived(
//     [inputStopOnLoss, currentWalletState],
//     ([$inputStopOnLoss, $currentWalletState]) => decimalCryptoDisplay($inputStopOnLoss, $currentWalletState.type)
// );

export const stopOnProfit = derived(
    [inputStopOnProfit, currentWalletState],
    ([$inputStopOnProfit, $currentWalletState]: [number, { type: CurrencyEnum; available: number }]) =>
        decimalCryptoDisplay($inputStopOnProfit, $currentWalletState.type)
);

export const stopOnLoss = derived(
    [inputStopOnLoss, currentWalletState],
    ([$inputStopOnLoss, $currentWalletState]: [number, { type: CurrencyEnum; available: number }]) =>
        decimalCryptoDisplay($inputStopOnLoss, $currentWalletState.type)
);

export const numOfBets = writable('0');
export const betsFinished = writable(0);
export const selectedOnWin = writable(OnWin.AUTO);
export const selectedOnLoss = writable(OnLoss.AUTO);

// This is for the sound
// export const playBetSound = () => {
//     const betSound = new Audio(diceBetSound);
//     betSound.play();
// };
// export const playDiceRollSound = () => {
//     const rollSound = new Audio(diceRollSound);
//     rollSound.play();
// };
// export const playDiceWinSound = () => {
//     const winSound = new Audio(diceWinSound);
//     winSound.play();
// };

export const selectedFiatCurrency = derived(fiat, ($fiat: string) =>
    $fiat && FiatArr.includes($fiat.toLowerCase()) ? $fiat : null
);

export const coinPriceData = writable({
    Fiat: 'USD',
    btc: 30180,
    dai: 1,
    doge: 0.070666,
    eth: 1909.54,
    ltc: 92.92,
    matic: 0.767363,
    usdc: 1,
    usdt: 1,
    updatedAt: 1689835170652
});

fiat.subscribe($fiat => {
    coinPriceData.update(data => {
        return { ...data, Fiat: $fiat || 'USD' };
    });
});

export const isSound = writable(true);
export const lang = writable(LanguageEnum.En);
export const maxPayoutData = writable(maxWin);
export const loading = writable(false);
export const curBalance = writable<number>(0);
export const needToStopNextTime = writable(false);

export const balanceList = writable<BalanceItem[]>(JSON.parse(localStorage.getItem('balance') || '[]'));

balanceList.subscribe(($balanceList) => {
    localStorage.setItem('balance', JSON.stringify($balanceList));
});
