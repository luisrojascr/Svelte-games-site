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

export const initialBetAmount = derived(currentWalletState, ($currentWalletState) =>
    decimalCryptoDisplay(0, $currentWalletState.type)
);

export const onWin = writable('0.00');
export const onLoss = writable('0.00');
export const currentProfit = writable(0);
export const profitOnWin = writable('0');

export const stopOnProfit = derived(currentWalletState, ($currentWalletState) =>
    decimalCryptoDisplay(0, $currentWalletState.type)
);

export const stopOnLoss = derived(currentWalletState, ($currentWalletState) =>
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
    autoBetInProgress.set(true);
    handleOnePlay(true);
};

export const handleOnePlay = async (isAutoBet: boolean) => {
    loading.set(true);
    gameInProgress.set(true);
    updateBalance(parseFloat(get(betAmount)));

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
            updateBetAmountOnWin();
            newProfit = get(currentProfit) + parseFloat(get(profitOnWin));
        } else {
            updateBetAmountOnLoss();
            newProfit = get(currentProfit) - parseFloat(get(betAmount));
        }
        currentProfit.set(newProfit);

        if (checkStopOnLossOrProfit(newProfit, parseFloat(get(stopOnLoss)), parseFloat(get(stopOnProfit)))) {
            needToStopNextTime.set(true);
        } else {
            if (parseInt(get(numOfBets)) !== 0) {
                if (parseInt(get(numOfBets)) === get(betsFinished)) {
                    needToStopNextTime.set(true);
                } else {
                    betsFinished.update(n => n + 1);
                }
            }
        }
    } else {
        currentProfit.set(0);
    }

    if (isWin) {
        setTimeout(() => {
            playDiceWinSound();
        }, 500);
        updateBalance(0, parseFloat(get(profitOnWin)));
        currentProfit.update(n => n + parseFloat(get(betAmount)));
    } else {
        updateBalance(parseFloat(get(betAmount)));
        currentProfit.update(n => n - parseFloat(get(betAmount)));
    }

    loading.set(false);
    gameInProgress.set(false)

};

export const updateBetAmountOnWin = () => {
    const currentBetAmount = parseFloat(get(betAmount));
    let newBetAmount: string;

    if (get(selectedOnWin) === OnWin.INCREASE) {
        const amountToAdd = (currentBetAmount / 100) * parseFloat(get(onWin));
        newBetAmount = (currentBetAmount + amountToAdd).toFixed(decimalDisplayLength(get(currentWalletState).type));
    } else {
        newBetAmount = get(initialBetAmount);
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
        newBetAmount = get(initialBetAmount);
    }

    if (get(selectedFiatCurrency) && get(coinPriceData)) {
        newBetAmount = Number(newBetAmount).toFixed(2);
    }

    betAmount.set(newBetAmount);
};


export function updateBalance(amount: number, profit = 0): void {
    curBalance.update((balance) => {
        const newBalance = profit === 0 ? balance - amount : balance + profit;
        currentWalletState.update((state) => ({ ...state, available: newBalance }));
        const currentSessionId = get(sessionId);
        if (currentSessionId) {
            updateStorageBalance(currentSessionId, newBalance);
        }
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

derived(balanceList, $balanceList => {
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

// WILL ARRANGE LATER
if (get(autoBetInProgress)) {
    if (get(needToStopNextTime)) {
        resetBoard(true);
    } else {
        if (!get(gameInProgress)) {
            if (parseFloat(get(numOfBets)) === 0) {
                handleOnePlay(true);
            } else if (get(betsFinished) < parseFloat(get(numOfBets))) {
                handleOnePlay(true);
            } else {
                resetBoard(true);
            }
        }
    }
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