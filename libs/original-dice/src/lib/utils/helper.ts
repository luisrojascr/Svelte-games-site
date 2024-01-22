import Big from 'big.js';

export function round(value: number, decimalPlaces: number = 0): string {
  return new Big(value).round(decimalPlaces, Big.roundHalfUp).toFixed(decimalPlaces);
}
