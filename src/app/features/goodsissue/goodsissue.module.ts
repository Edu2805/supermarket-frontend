import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { GoodsissueComponent } from "./goodsissue.component";
import { GoodsissueRoutingModule } from "./goodsissue.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateGoodsIssueComponent } from './feature/create-goods-issue/create-goods-issue.component';
import { ReadGoodsIssueComponent } from './feature/read-goods-issue/read-goods-issue.component';
import { UpdateGoodsIssueComponent } from './feature/update-goods-issue/update-goods-issue.component';
import { DeleteGoodsIssueComponent } from './feature/delete-goods-issue/delete-goods-issue.component';
import { DetailsGoodsIssueComponent } from './feature/details-goods-issue/details-goods-issue.component';
import { GoodsIssueGuardService } from "./services/goodsissue.guard";
import { GoodsIssueResolve } from "./services/goodsissue.resolve";
import { GoodsissueService } from "./services/goodsissue.service";

@NgModule({
    declarations:[
        GoodsissueComponent,
        CreateGoodsIssueComponent,
        ReadGoodsIssueComponent,
        UpdateGoodsIssueComponent,
        DeleteGoodsIssueComponent,
        DetailsGoodsIssueComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        GoodsissueService,
        GoodsIssueResolve,
        GoodsIssueGuardService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    imports:[
        CommonModule,
        GoodsissueRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class GoodsissueModule{}