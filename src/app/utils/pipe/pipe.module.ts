import { NgModule } from "@angular/core";
import { CnpjPipe, CpfPipe } from "./document";
import { CellPhonePipe, PhonePipe } from "./phone";
import { CommonModule } from "@angular/common";
import { DateHourPipe, SingleDatePipe } from "./date-pipe";

@NgModule({
    declarations: [
        CpfPipe,
        CnpjPipe,
        CellPhonePipe,
        PhonePipe,
        DateHourPipe,
        SingleDatePipe
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
        SingleDatePipe
    ]
})
export class PipeModule {  }