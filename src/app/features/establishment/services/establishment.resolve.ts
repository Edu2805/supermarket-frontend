import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Establishment } from "../model/establishment";
import { Injectable } from "@angular/core";
import { EstablishmentService } from "./establishment.service";

@Injectable()
export class EstablishmentResolve implements Resolve<Establishment> {

    constructor(private establishmentService: EstablishmentService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.establishmentService.findEstablishmentById(route.params['id']);
    }
    
}