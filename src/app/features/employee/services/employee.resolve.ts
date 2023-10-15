import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Employee } from "../model/employee";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeResolve implements Resolve<Employee> {

    constructor(private employeeService: EmployeeService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.employeeService.findEmployeeById(route.params['id']);
    }
    
}