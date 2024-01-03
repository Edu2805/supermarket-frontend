import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { GoodsIssue } from "../model/Goodsissue";
import { GoodsissueService } from "./goodsissue.service";

@Injectable()
export class GoodsIssueResolve implements Resolve<GoodsIssue> {

    constructor(private goodsIssueService: GoodsissueService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.goodsIssueService.findGoodsIssueById(route.params['id']);
    }
    
}