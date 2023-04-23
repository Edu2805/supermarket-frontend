import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PersonComponent } from "./person.component";
import { PersonRoutingModule } from "./person.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        PersonComponent
    ],
    imports:[
        CommonModule,
        PersonRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class PersonModule{}