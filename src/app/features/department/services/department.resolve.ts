import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Department } from "../model/department";
import { DepartmentService } from "./department.service";

@Injectable()
export class DepartmentResolve implements Resolve<Department> {

    constructor(private departmentService: DepartmentService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.departmentService.findDepartmentById(route.params['id']);
    }
    
}