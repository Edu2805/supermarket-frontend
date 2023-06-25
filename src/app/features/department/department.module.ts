import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DepartmentComponent } from "./department.component";
import { DepartmentRoutingModule } from "./department.route";
import { TranslateModule } from "@ngx-translate/core";
import { CreateDepartmentComponent } from './crud/create/create-department.component';
import { DeleteDepartmentComponent } from './crud/delete/delete-department.component';
import { DetailsDepartmentComponent } from './crud/details/details-department.component';
import { ReadDepartmentComponent } from './crud/read/read-department.component';
import { UpdateDepartmentComponent } from './crud/update/update-department.component';
import { DepartmentService } from "./services/department.service";

@NgModule({
    declarations:[
        DepartmentComponent,
        CreateDepartmentComponent,
        DeleteDepartmentComponent,
        DetailsDepartmentComponent,
        ReadDepartmentComponent,
        UpdateDepartmentComponent
    ],
    providers: [
        DepartmentService
    ],
    imports:[
        CommonModule,
        DepartmentRoutingModule,
        TranslateModule
    ],
    exports:[]
})
export class DepartmentModule{}