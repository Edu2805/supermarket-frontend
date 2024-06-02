import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MenuLoginComponent } from "./menu-login/menu-login.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { NavigationGuard } from "./services/navigation.guard";
import { NavigationRoutingModule } from "./navigation.route";
import { AccountService } from "../features/account/services/account.service";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@NgModule({
    declarations: [
        MenuComponent,
        MenuLoginComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        TranslateModule,
        NavigationRoutingModule,
        NgxSpinnerModule,
    ],
    exports: [
        MenuComponent,
        MenuLoginComponent,
        HomeComponent,
        FooterComponent,
        NotFoundComponent
    ],
    providers: [
        NavigationGuard,
        AccountService,
        TranslateService,
        ToastrService,
        NgxSpinnerService,

    ]
})
export class NavigationModule {  }