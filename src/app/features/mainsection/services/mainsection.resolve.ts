import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { MainSection } from "../model/mainsection";
import { MainsectionService } from "./mainsection.service";

@Injectable()
export class MainSectionResolve implements Resolve<MainSection> {

    constructor(private mainsectionService: MainsectionService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.mainsectionService.findMainsectionById(route.params['id']);
    }
    
}