import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";
import { EmployeeDetailsOutput } from "../model/employee-details-output";

@Injectable()
export class EmployeeDetailsResolve implements Resolve<EmployeeDetailsOutput> {

    constructor(private employeeService: EmployeeService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.employeeService.findEmployeeDetailsOutputById(route.params['id']);
    }
    
}