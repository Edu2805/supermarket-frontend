import { Component, Input } from "@angular/core";
import { Department } from "../../department/model/department";

@Component({
    selector: 'department-list',
    templateUrl: './department-list.component.html'
})
export class DepartmentListComponent {

    @Input()
    department: Department;
    errors: any[] = [];
}