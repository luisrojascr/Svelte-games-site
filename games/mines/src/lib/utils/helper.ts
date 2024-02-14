import { CurrencyEnum } from '$lib/utils/cc.js';
import Big from 'big.js';

interface CryptoCurrency {
    currency: CurrencyEnum;
    decimalDisplayLength: number;
    decimalRepLength: number;
}

const cryptoCurrencies: CryptoCurrency[] = [
    { currency: CurrencyEnum.btc, decimalDisplayLength: 8, decimalRepLength: 8 },
    { currency: CurrencyEnum.eth, decimalDisplayLength: 18, decimalRepLength: 18 },
];

export function round(value: number, decimalPlaces: number | undefined = 0): number {
    return Number(
        `${Math.round(parseFloat(`${value}e${decimalPlaces}`))}e-${decimalPlaces}`
    )
}

// Round off to 2 decimal places
export function roundOff2(val: number): string {
    if (isNaN(val)) return '0.00';
    return Big(Math.floor(val * 100)).div(100).toFixed(2) || '0.00';
}

// Round off to 8 decimal places
export function roundOff(val: number): string {
    return Big(Math.floor(val * 1e8)).div(1e8).toFixed(2) || '0.00';
}

// Cache disallowed keys outside of function scope to avoid recreation
const disallowedKeys = ['e', '*', '+', '-', '/', '.', '=', 'Enter', 'NumpadEnter'];
export const numberOnly = (e: KeyboardEvent): void => {
    if (disallowedKeys.includes(e.key)) {
        e.preventDefault();
    }
};

export const decimalDisplayLength = (currency: CurrencyEnum): number => {
    const crypto = cryptoCurrencies.find(crypto => crypto.currency === currency);
    return crypto?.decimalDisplayLength ?? crypto?.decimalRepLength ?? 2; // Default to 2 if not found
};

export const decimalCryptoDisplay = (
    decimalRep: string | number | Big,
    cryptocurrency: CurrencyEnum,
    roundingMode: Big.RoundingMode = Big.roundDown
): string => {
    const displayLength = decimalDisplayLength(cryptocurrency);
    return new Big(decimalRep).round(displayLength, roundingMode).toFixed(displayLength);
};

export function getNextDecimal(str: string): string {
    const number = Number(str);
    if (!isNaN(number)) {
        const nextNumber = number + 1 / Math.pow(10, str.length - str.indexOf('.') - 1);
        return nextNumber.toString();
    } else {
        throw new Error(`Unable to convert "${str}" to a number.`);
    }
}

export const generateRandomHex = (length: number): string => {
    const characters = 'abcdef0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
    }

    return result
}

export const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay))
}

export function randomIntFromInterval(start: number, end: number): number {
    const rand = Math.random();

    return start + Math.round((end - start) * rand);
}