import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MainsectionComponent } from "./mainsection.component";
import { MainsectionRoutingModule } from "./mainsection.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        MainsectionComponent
    ],
    imports:[
        CommonModule,
        MainsectionRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class MainsectionModule{}