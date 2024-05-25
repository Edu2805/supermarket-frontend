import { NgModule } from "@angular/core";
import { CnpjPipe, CpfPipe } from "./document";
import { CellPhonePipe, PhonePipe } from "./phone";
import { CommonModule } from "@angular/common";
import { DateHourPipe, SingleDatePipe } from "./date-pipe";
import { CustomCurrencyPipe } from "./custom-currency-pipe";

@NgModule({
    declarations: [
        CpfPipe,
        CnpjPipe,
        CellPhonePipe,
        PhonePipe,
        DateHourPipe,
        SingleDatePipe,
        CustomCurrencyPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CpfPipe,
        CnpjPipe,
        CellPhonePipe,
        PhonePipe,
        DateHourPipe,
        SingleDatePipe,
        CustomCurrencyPipe
    ]
})
export class PipeModule {  }