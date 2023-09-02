import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SalaryComponent } from "./salary.component";
import { SalaryRoutingModule } from "./salary.route";
import { TranslateModule } from "@ngx-translate/core";
import { SalaryService } from "./services/salary.service";
import { CreateSalaryComponent } from './crud/create-salary/create-salary.component';
import { UpdateSalaryComponent } from './crud/update-salary/update-salary.component';
import { ReadSalaryComponent } from './crud/read-salary/read-salary.component';
import { DetailsSalaryComponent } from './crud/details-salary/details-salary.component';
import { DeleteSalaryComponent } from './crud/delete-salary/delete-salary.component';
import { SalaryGuardService } from "./services/salary.guard";
import { SalaryResolve } from "./services/salary.resolve";

@NgModule({
    declarations:[
        SalaryComponent,
        CreateSalaryComponent,
        UpdateSalaryComponent,
        ReadSalaryComponent,
        DetailsSalaryComponent,
        DeleteSalaryComponent
    ],
    providers: [
        SalaryService,
        SalaryGuardService,
        SalaryResolve
    ],
    imports:[
        CommonModule,
        SalaryRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class SalaryModule{}