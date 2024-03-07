import type {
    TileState,
} from '$lib/parts/store/mines-types';
import { TileStateEnum } from '$lib/parts/store/mines-types';
import { CurrencyEnum, LanguageEnum, OnLoss, OnWin } from '$lib/utils/cc';
import { decimalCryptoDisplay, decimalDisplayLength, randomIntFromInterval, timeout } from '$lib/utils/helper.js';
import { derived, get, writable } from 'svelte/store';

import diamondOpen from '$lib/assets/sounds/diamondOpen.mp3';
import mineOpen from '$lib/assets/sounds/mineOpen.mp3';

// Initial array of numbers
const nums: number[] = Array.from({ length: 25 }, (_, index) => index);

export interface Bet {
    id: string;
    numberRolled: string;
    win: boolean;
}

export interface BalanceItem {
    sessionId: number | string;
    balance: number;
}


export function initMineField(): TileState[] {
    return Array.from({ length: 25 }, (_, index) => ({
        id: index,
        index: index,
        isMine: undefined,
        state: TileStateEnum.Hidden
    }));
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

export const selectedOnWin = writable(OnWin.AUTO);
export const selectedOnLoss = writable(OnLoss.AUTO);

export const inputStopOnProfit = writable(0);
export const inputStopOnLoss = writable(0);


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

export const currency = writable(getURLParameter('currency', 'usdt'));
export const fiat = writable(getURLParameter('fiat', ''));
export const startBalance = writable(getURLParameter('startBalance', '1000'))
export const sessionId = writable(getURLParameter('sessionId', '1001'))
export const maxWin = writable(getURLParameter('maxWin', '1000'))
export const minBet = writable(getURLParameter('minBet', '0'))
export const maxBet = writable(getURLParameter('maxBet', '100'))

export const gameInProgress = writable(false);
export const numOfMines = writable(3);
export const minePositions = writable<number[]>([]);
export const autoBetInProgress = writable(false);
export const cardStatus = writable<Array<TileState>>(initMineField());

export const nextMultiplier = writable(0);
export const totalMultiplier = writable(0);
export const leftGems = writable(0);

export const mineSubsData = writable('');
export const limitBet = writable(0);
export const numOfBets = writable(0);

export const betAmount = writable('0');
export const profitOnWin = writable('0')
// export const cashout = writable('2.00');
// export const winChance = writable('49.50');

export const initialBetAmount = writable(0);

export const onWin = writable('0');
export const onLoss = writable('0');
export const currentProfit = writable(0);

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

// This is for the sound
export const playOpenDiamond = () => {
    const diamondSound = new Audio(diamondOpen);
    diamondSound.play();
};
export const playOpenMine = () => {
    const mineSound = new Audio(mineOpen);
    mineSound.play();
};

export const isSound = writable(true);
export const lang = writable(LanguageEnum.En);
export const maxPayoutData = writable(maxWin);
export const loading = writable(false);
export const curBalance = writable<number>(0);
export const needToStopNextTime = writable(false);

export const balanceList = writable<BalanceItem[]>(JSON.parse(localStorage.getItem('balance') || '[]'));

const totalProfit = derived(
    [totalMultiplier, betAmount, currentWalletState],
    //@ts-ignore
    ([$totalMultiplier, $betAmount, $currentWalletState]) => {
        if ($totalMultiplier == 1) {
            return '0.0';
        } else {
            return ($betAmount * $totalMultiplier).toFixed(
                decimalDisplayLength($currentWalletState.type)
            );
        }
    }
);

export const displayProfit = derived(
    [totalProfit, selectedFiatCurrency, coinPriceData, betAmount],
    //@ts-ignore
    ([$totalProfit, $selectedFiatCurrency, $coinPriceData, $betAmount]) => {
        const profit = parseFloat($totalProfit);
        if (profit) {
            const deduction = profit - parseFloat($betAmount);
            if ($selectedFiatCurrency && $coinPriceData) {
                return deduction.toFixed(2);
            } else {
                //@ts-ignore
                return deduction.toFixed(decimalDisplayLength(currentWalletState.type));
            }
        } else {
            if ($selectedFiatCurrency && $coinPriceData) {
                return Number($totalProfit).toFixed(2);
            } else {
                //@ts-ignore
                return Number($totalProfit).toFixed(decimalDisplayLength(currentWalletState.type));
            }
        }
    }
);

balanceList.subscribe(($balanceList) => {
    localStorage.setItem('balance', JSON.stringify($balanceList));
});

// Function to generate an array of unique random numbers
const generateRandomArr = (): number[] => {
    const minesCount: number = get(numOfMines); // Accessing the value of numOfMines store
    if (minesCount > 0) {
        const newList: number[] = [];
        for (let i = 0; i < minesCount; i++) {
            let randomIndex: number;
            let randomElement: number;
            do {
                randomIndex = Math.floor(Math.random() * nums.length);
                randomElement = nums[randomIndex];
            } while (newList.includes(randomElement));
            newList.push(randomElement);
        }
        return newList;
    }
    return [];
};

export const handleRandomClick = (): void => {
    const allTiles: TileState[] = get(cardStatus);
    const hiddenTiles: TileState[] = allTiles.filter(
        (tile: TileState) => tile.state === TileStateEnum.Hidden
    );

    if (hiddenTiles.length > 0) {
        const randomTileIndex: number = randomIntFromInterval(0, hiddenTiles.length - 1);
        const randomTileID: number = hiddenTiles[randomTileIndex].id;
        handleTileClick(randomTileID);
    }
};

export const handleTileClick = async (index: number): Promise<void> => {
    const currentCardStatus: TileState[] = get(cardStatus);
    const currentLeftGems: number = get(leftGems);
    const isAuto = get(autoBetInProgress);

    if (currentCardStatus[index].state === TileStateEnum.Hidden) {
        const isMine = checkIfMine(index);

        if (isMine) {
            playOpenMine();
            const newCardStatus = currentCardStatus.map((tile) =>
                tile.id === index
                    ? { ...tile, state: TileStateEnum.UserRevealed, isMine: true }
                    : checkIfMine(tile.id)
                        ? { ...tile, state: TileStateEnum.Revealed, isMine: true }
                        : tile
            );

            if (isAuto) {
                resetGameForNextBet();
            }

            cardStatus.set(newCardStatus);
            gameInProgress.set(false);
            nextMultiplier.set(0);
            totalMultiplier.set(0);
            leftGems.set(0);
            await timeout(300);

            const nextCardStatus = newCardStatus.map((tile) =>
                tile.state === TileStateEnum.Hidden
                    ? { ...tile, state: TileStateEnum.Revealed }
                    : tile
            );

            cardStatus.set(nextCardStatus);
        } else {
            playOpenDiamond();
            const newCardStatus = currentCardStatus.map((tile) =>
                tile.id === index
                    ? { ...tile, state: TileStateEnum.UserRevealed }
                    : tile
            );

            cardStatus.set(newCardStatus);
            calculateNextMultiplier();
            leftGems.set(currentLeftGems - 1);
        }
    }
};

const checkIfMine = (index: number): boolean => {
    const currentMinePositions: number[] = get(minePositions);
    return currentMinePositions.includes(index);
};

const calculateNextMultiplier = (): void => {
    const currentNumOfMines: number = get(numOfMines);
    const currentLeftGems: number = get(leftGems);
    let total = Number(
        (
            1 + Math.pow(1 + currentNumOfMines / 25, 25 - currentLeftGems - currentNumOfMines + 1)
        ).toFixed(2)
    );
    totalMultiplier.set(total);
};

//MANUAL BET
export const handleBet = (): void => {
    const currentNumOfMines: number = get(numOfMines);
    const currentCurBalance: number = get(curBalance);
    const currentBetAmount: number = parseFloat(get(betAmount));

    gameInProgress.set(true);
    cardStatus.set(initMineField());
    minePositions.set(generateRandomArr());
    leftGems.set(25 - currentNumOfMines);
    curBalance.set(currentCurBalance - currentBetAmount);
    totalMultiplier.set(1);

    const currentSessionId: string = get(sessionId);

    if (sessionId) {
        const newBalance = currentCurBalance + currentBetAmount;
        updateStorageBalance(currentSessionId, newBalance);
    }
};

function resetGameForNextBet() {
    // autoBetInProgress.set(false)
    cardStatus.set(initMineField());
    minePositions.set(generateRandomArr());
    leftGems.set(25 - get(numOfMines));
    totalMultiplier.set(1);

    setTimeout(() => handleAutoBet(), 1000);
}

// Function to update both numOfBets and initialNumOfBets when the user sets a new value
export function updateUserNumOfBets(newNumOfBets: number) {
    numOfBets.set(newNumOfBets);
    limitBet.set(newNumOfBets); // Also set the initial number of bets
}

export function handleCashout() {
    gameInProgress.set(false);
    autoBetInProgress.set(false)
    currentProfit.set(0)

    const updatedCardStatus = get(cardStatus).map((tile) => {
        if (tile.state === TileStateEnum.Hidden) {
            return {
                ...tile,
                state: TileStateEnum.Revealed,
                isMine: checkIfMine(tile.id),
            };
        }
        return tile;
    });
    cardStatus.set(updatedCardStatus);

    const currentBalance = get(curBalance);
    const multiplier = get(totalMultiplier);
    let betAmountNumber = parseFloat(get(betAmount));
    const newBalance = currentBalance + betAmountNumber * multiplier;
    const sessionIdValue = get(sessionId);

    updateStorageBalance(sessionIdValue, newBalance);
    curBalance.set(newBalance);

    currentWalletState.update((wallet) => {
        return { ...wallet, available: newBalance };
    });
}

//AUTO BET
export const handleAutoBet = (): void => {
    limitBet.set(get(numOfBets));
    autoBetInProgress.set(true);

    // Deduct the betAmount from currentProfit at the start of a new auto-bet session
    let betAmountNumber = parseFloat(get(betAmount));
    // currentProfit.update(curProfit => curProfit - betAmountNumber);
    console.log(get(currentProfit))

    setTimeout(() => {
        handleBet();

        const executeBet = () => {
            const currentGameInProgress = get(autoBetInProgress);
            const hiddenTiles = get(cardStatus).filter(tile => tile.state === TileStateEnum.Hidden);


            if (!currentGameInProgress || hiddenTiles.length === 0 || get(needToStopNextTime)) {
                clearInterval(autoBet);
                // autoBetInProgress.set(false);
                console.log("Auto-bet stopped.");
                return;
            }

            handleRandomClick();

            updateBetAmountOnWin();

            updateBetAmountOnLoss()

            const currentDisplayProfit: any = get(displayProfit);
            const curProfitNumber = parseFloat(currentDisplayProfit);
            currentProfit.update((curProfit) => curProfit + curProfitNumber);
            const updatedProfit = get(currentProfit);
            console.log('real profit', updatedProfit)

            // Check stop conditions after updating currentProfit
            //@ts-ignore
            if (checkStopOnLossOrProfit(updatedProfit, get(stopOnLoss), get(stopOnProfit))) {
                handleCashout();
                console.log("Stopping auto-bet due to reaching stop-on-loss or stop-on-profit condition.");
            }


            if (get(limitBet) > 0) {
                limitBet.update(n => n - 1);
                if (get(limitBet) === 0) {
                    handleAutoCashOut();
                }
            }
        };
        const autoBet = setInterval(executeBet, 500);
    }, 1000)

};

export function handleAutoCashOut() {
    const updatedCardStatus = get(cardStatus).map((tile) => {
        if (tile.state === TileStateEnum.Hidden) {
            return {
                ...tile,
                state: TileStateEnum.Revealed,
                isMine: checkIfMine(tile.id),
            };
        }
        return tile;
    });
    cardStatus.set(updatedCardStatus);

    let betAmountNumber = parseFloat(get(betAmount));
    const currentBalance = get(curBalance);
    const multiplier = get(totalMultiplier);
    const newBalance = currentBalance + betAmountNumber * multiplier;
    const sessionIdValue = get(sessionId);

    updateStorageBalance(sessionIdValue, newBalance);
    curBalance.set(newBalance);

    currentWalletState.update((wallet) => {
        return { ...wallet, available: newBalance };
    });


    const currentDisplayProfit: any = get(displayProfit);
    const curProfitNumber = parseFloat(currentDisplayProfit);
    currentProfit.update((curProfit) => curProfit + curProfitNumber);
    const updatedProfit = get(currentProfit);
    console.log('real profit', updatedProfit)

    // Check stop conditions after updating currentProfit
    //@ts-ignore
    if (checkStopOnLossOrProfit(updatedProfit, get(stopOnLoss), get(stopOnProfit))) {
        handleCashout();
        console.log("Stopping auto-bet due to reaching stop-on-loss or stop-on-profit condition.");

    } else if (get(autoBetInProgress)) {
        // If conditions are not met, continue with auto-betting
        setTimeout(() => {
            handleAutoBet(); // Restart auto-betting
        }, 1000);
    }
}

export const updateBetAmountOnWin = () => {
    const currentBetAmount = parseFloat(get(betAmount));
    let newBetAmount: string;

    if (get(selectedOnWin) === OnWin.INCREASE) {
        const amountToAdd = (currentBetAmount / 100) * parseFloat(get(onWin));
        newBetAmount = (currentBetAmount + amountToAdd).toFixed(decimalDisplayLength(get(currentWalletState).type));
    } else {
        newBetAmount = get(betAmount) as string;
    }

    if (get(selectedFiatCurrency) && get(coinPriceData)) {
        newBetAmount = Number(newBetAmount).toFixed(2);
    }

    betAmount.set(newBetAmount);
    console.log("test:", newBetAmount)
};

export const updateBetAmountOnLoss = () => {
    const currentBetAmount = parseFloat(get(betAmount));
    let newBetAmount: string;

    if (get(selectedOnLoss) === OnLoss.INCREASE) {
        const amountToAdd = (currentBetAmount / 100) * parseFloat(get(onLoss));
        newBetAmount = (currentBetAmount + amountToAdd).toFixed(decimalDisplayLength(get(currentWalletState).type));
    } else {
        newBetAmount = get(betAmount) as string;
    }

    if (get(selectedFiatCurrency) && get(coinPriceData)) {
        newBetAmount = Number(newBetAmount).toFixed(2);
    }

    betAmount.set(newBetAmount);
    console.log("test:", newBetAmount)
};

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

// @ts-ignore
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
    console.log("current:", curProfit, "stoploss:", stopOnLoss, "stopwin:", stopOnProfit)
    return false;
}


export function resetBoard() {
    autoBetInProgress.set(false);
    gameInProgress.set(false);
    needToStopNextTime.set(false);
    currentProfit.set(0);
}

// export function endGame() {
//     gameInProgress.set(false);
//     nextMultiplier.set(0);
//     totalMultiplier.set(0);
//     leftGems.set(0);
// }