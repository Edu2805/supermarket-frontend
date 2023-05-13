import { NgModule } from "@angular/core";
import { ProviderComponent } from "./provider.component";
import { CommonModule } from "@angular/common";
import { ProviderRoutingModule } from "./provider.route";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations:[
        ProviderComponent
    ],
    imports:[
        CommonModule,
        ProviderRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class ProviderModule{}