import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { ProductData } from "../model/product-data";
import { ProductDataService } from "./product-data.service";

@Injectable()
export class ProductDataResolve implements Resolve<ProductData> {

    constructor(private productDataService: ProductDataService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.productDataService.findProductById(route.params['id']);
    }
    
}