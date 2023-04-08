import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MainsectionComponent } from "./mainsection.component";
import { MainsectionRoutingModule } from "./mainsection.route";

@NgModule({
    declarations:[
        MainsectionComponent
    ],
    imports:[
        CommonModule,
        MainsectionRoutingModule
    ],
    exports:[]
})
export class MainsectionModule{}