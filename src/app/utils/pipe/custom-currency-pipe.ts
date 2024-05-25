import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'BRL', display: string = 'symbol', digitsInfo: string = '1.2-2', locale: string = 'pt-BR'): string {
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    const formattedValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(absValue);

    if (isNegative) {
      return `(${formattedValue})`;
    }
    return formattedValue;
  }
}
