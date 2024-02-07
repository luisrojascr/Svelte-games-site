import { CurrencyEnum, DiceRollConditionEnum, LanguageEnum } from '$lib/utils/cc.js';
import { decimalCryptoDisplay, decimalDisplayLength, generateRandomHex } from '$lib/utils/helper.js';
import { derived, get, writable } from 'svelte/store';

import diceBetSound from '$lib/assets/sounds/bet-button-press.mp3';
import diceRollSound from '$lib/assets/sounds/dice-roll-sound.mp3';
import diceWinSound from '$lib/assets/sounds/dice-win.mp3';

export interface Bet {
    id: string;
    numberRolled: string;
    win: boolean;
}

export interface BalanceItem {
    sessionId: number | string;
    balance: number;
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

export const currentWalletState = writable<{ type: CurrencyEnum; available: number }>({
    type: CurrencyEnum.btc,
    available: 100,
});

export const initialBetAmount = derived(currentWalletState, ($currentWalletState: { type: CurrencyEnum; available: number }) =>
    decimalCryptoDisplay(0, $currentWalletState.type)
);

export const onWin = writable('0.00');
export const onLoss = writable('0.00');
export const currentProfit = writable(0);
export const profitOnWin = writable('0');

export const stopOnProfit = derived(currentWalletState, ($currentWalletState: { type: CurrencyEnum; available: number }) =>
    decimalCryptoDisplay(0, $currentWalletState.type)
);

export const stopOnLoss = derived(currentWalletState, ($currentWalletState: { type: CurrencyEnum; available: number }) =>
    decimalCryptoDisplay(0, $currentWalletState.type)
);


export const numOfBets = writable('5');
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

export const handleManualBet = () => {
    handleOnePlay(false);
}

export const handleAutoBet = () => {
    handleOnePlay(true);
};

export const handleOnePlay = async (isAutoBet: boolean) => {
    loading.set(true);
    gameInProgress.set(true);

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

    console.log(result)

    if (isSound) {
        playDiceRollSound();
    }

    const parsedRollOverUnder = parseFloat(get(rollOverUnder));
    const currentIsRollOverOrUnder = get(isRollOverOrUnder);

    const isWin = checkWinOrLose(result, parsedRollOverUnder, currentIsRollOverOrUnder);
    updatePastBets(generateRandomHex(10), result, isWin);

    console.log(isWin)

    if (isAutoBet) {
        let newProfit = get(currentProfit);

        if (isWin) {
            setTimeout(() => {
                playDiceWinSound();
            }, 500);
            updateBalance(0, parseFloat(get(profitOnWin)));
        } else {
            updateBalance(parseFloat(get(betAmount)), 0);
        }

        if (checkStopOnLossOrProfit(newProfit, parseFloat(get(stopOnLoss) as string), parseFloat(get(stopOnProfit) as string))) {
            needToStopNextTime.set(true);
        } else {
            setTimeout(() => {
                handleAutoBettingContinuation();
            }, 500);
        }
    }


    if (isWin) {
        setTimeout(() => {
            playDiceWinSound();
        }, 500);
        updateBalance(0, parseFloat(get(profitOnWin)));
    } else {
        updateBalance(parseFloat(get(betAmount)), 0);
    }

    loading.set(false);
    gameInProgress.set(false)

};

export function handleAutoBettingContinuation() {
    if (!get(autoBetInProgress)) {
        resetBoard(true);
        return;
    }

    if (parseFloat(get(numOfBets)) === 0 || get(betsFinished) < parseFloat(get(numOfBets))) {
        handleOnePlay(true);
    } else {
        resetBoard(true);
    }
}

$: {
    if (autoBetInProgress && !gameInProgress) {
        if (needToStopNextTime) {
            resetBoard(true);
        } else {
            if (parseFloat(numOfBets as any) === 0 || betsFinished as any < parseFloat(numOfBets as any)) {
                handleOnePlay(true);
            } else {
                resetBoard(true);
            }
        }
    }
}

export const updateBetAmountOnWin = () => {
    const currentBetAmount = parseFloat(get(betAmount));
    let newBetAmount: string;

    if (get(selectedOnWin) === OnWin.INCREASE) {
        const amountToAdd = (currentBetAmount / 100) * parseFloat(get(onWin));
        newBetAmount = (currentBetAmount + amountToAdd).toFixed(decimalDisplayLength(get(currentWalletState).type));
    } else {
        newBetAmount = get(initialBetAmount) as string;
    }

    if (get(selectedFiatCurrency) && get(coinPriceData)) {
        newBetAmount = Number(newBetAmount).toFixed(2);
    }

    betAmount.set(newBetAmount);
};

export const updateBetAmountOnLoss = () => {
    const currentBetAmount = parseFloat(get(betAmount));
    let newBetAmount: string;

    if (get(selectedOnLoss) === OnLoss.INCREASE) {
        const amountToAdd = (currentBetAmount / 100) * parseFloat(get(onLoss));
        newBetAmount = (currentBetAmount + amountToAdd).toFixed(decimalDisplayLength(get(currentWalletState).type));
    } else {
        newBetAmount = get(initialBetAmount) as string;
    }

    if (get(selectedFiatCurrency) && get(coinPriceData)) {
        newBetAmount = Number(newBetAmount).toFixed(2);
    }

    betAmount.set(newBetAmount);
};

export function updateBalance(bet: number, profit: number = 0): void {
    curBalance.update((balance) => {
        let newBalance = balance;
        if (profit > 0) {
            newBalance += profit;
        } else {
            newBalance -= bet;
        }

        currentWalletState.update((state) => ({ ...state, available: newBalance }));
        updateStorageBalance(get(sessionId), newBalance);
        return newBalance;
    });
}


export function updateStorageBalance(sessionIdToUpdate: string, newBalance: number) {
    balanceList.update(list => {
        const indexToUpdate = list.findIndex(item => item.sessionId === sessionIdToUpdate);
        if (indexToUpdate !== -1) {
            list[indexToUpdate].balance = newBalance;
        } else {
            list.push({ sessionId: sessionIdToUpdate, balance: newBalance });
        }
        localStorage.setItem('balance', JSON.stringify(list));
        return list;
    });
}

derived(balanceList, ($balanceList: Array<{ sessionId: string, balance: number }>) => {
    localStorage.setItem('balance', JSON.stringify($balanceList));
});

$: {
    const session = get(sessionId);
    if (session) {
        const storedBalance = get(balanceList).find(item => item.sessionId === session);
        if (storedBalance) {
            curBalance.set(storedBalance.balance);
            currentWalletState.set({ ...get(currentWalletState), available: storedBalance.balance });
        } else {
            const initialBalance = Number(get(startBalance));
            updateStorageBalance(session, initialBalance);
            curBalance.set(initialBalance);
            currentWalletState.set({ ...get(currentWalletState), available: initialBalance || 100 });
        }
    }
}

export function updatePastBets(id: string, result: number, isWin: boolean): void {
    pastBets.update((bets) => {
        const newBet: Bet = {
            id,
            numberRolled: result.toFixed(2),
            win: isWin
        };

        // Keep only the latest 5 bets and add the new bet at the beginning
        const newBetsArray = [newBet, ...bets.slice(0, 4)];

        return newBetsArray;
    });
}

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

export function checkStopOnLossOrProfit(
    curProfit: number,
    stopOnLoss: number,
    stopOnProfit: number
): boolean {
    if (stopOnProfit > 0 && curProfit >= stopOnProfit) {
        return true;
    }
    if (stopOnLoss > 0 && Math.abs(curProfit) >= stopOnLoss) {
        return true;
    }

    return false;
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