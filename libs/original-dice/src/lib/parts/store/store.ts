import { CurrencyEnum, DiceRollConditionEnum, LanguageEnum } from '$lib/utils/cc.js';
import { decimalCryptoDisplay, generateRandomHex } from '$lib/utils/helper.js';
import { derived, get, writable } from 'svelte/store';

import diceBetSound from '$lib/assets/sounds/bet-button-press.mp3';
import diceRollSound from '$lib/assets/sounds/dice-roll-sound.mp3';
import diceWinSound from '$lib/assets/sounds/dice-win.mp3';

interface Bet {
    id: string;
    numberRolled: string;
    win: boolean;
}

export enum BettingVariants {
    MANUAL = 'MANUAL',
    AUTO = 'AUTO'
}

export enum OnWin {
    AUTO = 'AUTO',
    INCREASE = 'INCREASE'
}

export enum OnLoss {
    AUTO = 'AUTO',
    INCREASE = 'INCREASE'
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

const currency = writable(getURLParameter('currency', 'usdt'));
const fiat = writable(getURLParameter('fiat', ''));
const startBalance = writable(getURLParameter('startBalance', '100'))
const sessionId = writable(getURLParameter('sessionId', '1001'))
const maxWin = writable(getURLParameter('maxWin', '1000'))
const minBet = writable(getURLParameter('minBet', '0'))
const maxBet1 = writable(getURLParameter('maxBet', '100'))

export const gameInProgress = writable(false);
export const autoBetInProgress = writable(false);
export const pastBets = writable<Bet[]>([]);
export const rotateBoxTo = writable(0);
export const angle = writable(0);

export const numberRolled = writable(0);
export const rollOverUnder = writable('50.50');
export const isRollOverOrUnder = writable('Over');

export const betAmount = writable('0.00');
export const cashout = writable('2.0000');
export const winChance = writable('49.50');

export const currentWalletState = writable<{ type: CurrencyEnum; available: number }>({
    type: CurrencyEnum.btc,
    available: 100,
});

export const initialBetAmount = derived(currentWalletState, ($currentWalletState) =>
    decimalCryptoDisplay(0, $currentWalletState.type)
);

export const onWin = writable('0.00');
export const onLoss = writable('0.00');
export const currentProfit = writable(0);

export const profitOnWin = derived(currentWalletState, ($currentWalletState) =>
    decimalCryptoDisplay(0, $currentWalletState.type)
);

export const numOfBets = writable('0');
export const betsFinished = writable(0);
export const selectedOnWin = writable(OnWin.AUTO);
export const selectedOnLoss = writable(OnLoss.AUTO);

// This is for the sound
export const playBetSound = () => {
    const betSound = new Audio(diceBetSound);
    betSound.play();
};
export const playDiceRollSound = () => {
    const rollSound = new Audio(diceRollSound);
    rollSound.play();
};
export const playDiceWinSound = () => {
    const winSound = new Audio(diceWinSound);
    winSound.play();
};

export const selectedFiatCurrency = derived(fiat, $fiat =>
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
export const curBalance = writable(0);
export const needToStopNextTime = writable(false);

export const balanceList = writable(JSON.parse(localStorage.getItem('balance') || '[]'));
// Subscribe to balanceList to update localStorage when it changes
balanceList.subscribe(($balanceList) => {
    localStorage.setItem('balance', JSON.stringify($balanceList));
});

export const handleManualBet = () => {
    handleOnePlay(false);
};

export const handleAutoBet = () => {
    autoBetInProgress.set(true);
    handleOnePlay(true);
};

export const handleOnePlay = async (isAutoBet: boolean) => {
    gameInProgress.set(true);
    updateBalance(parseFloat(get(betAmount)));
    loading.set(true);

    if (isSound) {
        playBetSound();
    }

    const randomNum =
        Math.floor(Math.random() * (100 * 100 - 1 * 100) + 1 * 100) / (1 * 100)

    const handleGetResult = async () => {
        return randomNum
    }

    const result = await handleGetResult(); // Replace this later with actual API call 
    numberRolled.set(result);

    if (isSound) {
        playDiceRollSound();
    }

    const isWin = checkWinOrLose(result, parseFloat(get(rollOverUnder)), get(isRollOverOrUnder));
    updatePastBets(generateRandomHex(10), result, isWin);


    let newProfit = get(currentProfit);

    if (isWin) {
        setTimeout(() => {
            playDiceWinSound();
        }, 500);
        updateBetAmountOnWin();
        newProfit += parseFloat(get(profitOnWin));
        currentProfit.set(newProfit);
    }


    loading.set(false);
    gameInProgress.set(false);
};

export function checkWinOrLose(
    result: number,
    rolledNumber: number,
    isRollOverOrUnder: DiceRollConditionEnum
): boolean {
    if (isRollOverOrUnder === DiceRollConditionEnum.Over) {
        return result >= rolledNumber;
    } else {
        return result <= rolledNumber;
    }
}

// Will do this later 
export function updateBetAmountOnWin() {
    const randomNum =
        Math.floor(Math.random() * (100 * 100 - 1 * 100) + 1 * 100) / (1 * 100)
    console.log(randomNum)
}


export function updatePastBets(id: string, result: number, isWin: boolean): void {
    pastBets.update((bets) => {
        const newBet: Bet = {
            id,
            numberRolled: result.toFixed(2),
            win: isWin
        };

        // Keep only the latest 6 bets and add the new bet at the beginning
        const newBetsArray = [newBet, ...bets.slice(0, 6)];

        return newBetsArray;
    });
}

export function updateBalance(amount: number, profit = 0) {
    let balance: 0;

    const currentBalanceValue = get(curBalance);

    if (profit === 0) {
        balance = currentBalanceValue - amount;
    } else {
        balance = currentBalanceValue + profit;
    }

    curBalance.set(balance);

    currentWalletState.update(state => ({
        ...state,
        available: balance
    }));

    if (get(sessionId)) {
        updateStorageBalance(get(sessionId), balance);
    }
}

export function updateStorageBalance(sessionIdToUpdate: number | string, newBalance: number): void {
    balanceList.update((list) => {
        const updatedList = [...list];
        const indexToUpdate = updatedList.findIndex(
            (item) => item.sessionId === sessionIdToUpdate
        );

        if (indexToUpdate !== -1) {
            updatedList[indexToUpdate].balance = newBalance;
        } else {
            updatedList.push({ sessionId: sessionIdToUpdate, balance: newBalance });
        }

        return updatedList;
    });
}

export function resetBoard(isAuto: boolean) {
    if (!isAuto) {
        numberRolled.set(0);
        angle.set(180);
        rollOverUnder.set('50.50');
        winChance.set('49.50');
        cashout.set('2.0000');
        rotateBoxTo.set(180);
    }
    autoBetInProgress.set(false);
    gameInProgress.set(false);
    needToStopNextTime.set(false);
    currentProfit.set(0);
    betsFinished.set(0);
}