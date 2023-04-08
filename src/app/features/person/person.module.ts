import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PersonComponent } from "./person.component";
import { PersonRoutingModule } from "./person.route";

@NgModule({
    declarations:[
        PersonComponent
    ],
    imports:[
        CommonModule,
        PersonRoutingModule
    ],
    exports:[]
})
export class PersonModule{}