import { Injectable } from "@angular/core";
import { GoodsReceipt } from "../model/goodsreceipt";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { GoodsreceiptService } from "./goodsreceipt.service";

@Injectable()
export class GoodsReceiptResolve implements Resolve<GoodsReceipt> {

    constructor(private goodsReceiptService: GoodsreceiptService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.goodsReceiptService.findGoodsReceipById(route.params['id']);
    }
    
}