import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Provider } from "../model/provider";
import { ProviderService } from "./provider.service";

@Injectable()
export class ProviderResolve implements Resolve<Provider> {

    constructor(private providerService: ProviderService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.providerService.findProviderById(route.params['id']);
    }
    
}