import { Component, Input } from "@angular/core";
import { Salary } from "../../salary/model/salary";

@Component({
    selector: 'salary-list',
    templateUrl: './salary-list.component.html'
})
export class SalaryListComponent {

    @Input()
    salary: Salary;
    errors: any[] = [];
}