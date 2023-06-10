import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'cellPhone' })
export class CellPhonePipe implements PipeTransform {
    transform(value: string|number): string {
        let formatValue = value + '';

        formatValue = formatValue
            .padStart(11, '0')
            .substr(0, 11)
            .replace(/[^0-9]/, '')
            .replace(
                /(\d{2})(\d{5})(\d{4})/,
                '($1) $2-$3'
            );

        return formatValue;
    }
}

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
    transform(value: string|number): string {
        let formatValue = value + '';

        formatValue = formatValue
            .padStart(10, '0')
            .substr(0, 10)
            .replace(/[^0-9]/, '')
            .replace(
                /(\d{2})(\d{4})(\d{4})/,
                '($1) $2-$3'
            );

        return formatValue;
    }
}