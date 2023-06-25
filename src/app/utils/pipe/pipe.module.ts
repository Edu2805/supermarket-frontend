import { NgModule } from "@angular/core";
import { CnpjPipe, CpfPipe } from "./document";
import { CellPhonePipe, PhonePipe } from "./phone";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        CpfPipe,
        CnpjPipe,
        CellPhonePipe,
        PhonePipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        CpfPipe,
        CnpjPipe,
        CellPhonePipe,
        PhonePipe
    ]
})
export class PipeModule {  }