import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dateHour' })
export class DateHourPipe implements PipeTransform {
    transform(value: string): string {
        //2023-06-27T20:43:20.665+00:00

        let day = value?.slice(8,10);
        let month = value?.slice(5,7);
        let year = value?.slice(0,4);
        let hour = value?.slice(11,16);

        return `${day}/${month}/${year} ${hour}`;
    }
}

@Pipe({ name: 'singleDate' })
export class SingleDatePipe implements PipeTransform {
    transform(value: string): string {
        //2023-06-27

        let day = value?.slice(8,10);
        let month = value?.slice(5,7);
        let year = value?.slice(0,4);

        return `${day}/${month}/${year}`;
    }
}