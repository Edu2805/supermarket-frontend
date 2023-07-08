import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { SubSection } from "../model/subsection";
import { SubsectionService } from "./subsection.service";

@Injectable()
export class SubSectionResolve implements Resolve<SubSection> {

    constructor(private subsectionService: SubsectionService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.subsectionService.findSubsectionById(route.params['id']);
    }
    
}