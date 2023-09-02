import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Salary } from "../model/salary";
import { SalaryService } from "./salary.service";
import { Injectable } from "@angular/core";

@Injectable()
export class SalaryResolve implements Resolve<Salary> {

    constructor(private salaryService: SalaryService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.salaryService.findSalaryById(route.params['id']);
    }
    
}