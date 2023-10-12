import { Injectable } from "@angular/core";
import { JobPosition } from "../model/jobposition";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { JobPositionService } from "./jobposition.service";

@Injectable()
export class JobPositionResolve implements Resolve<JobPosition> {

    constructor(private jobpositionService: JobPositionService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.jobpositionService.findJobPositionById(route.params['id']);
    }
    
}