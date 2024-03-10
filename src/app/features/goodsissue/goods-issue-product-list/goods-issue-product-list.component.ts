import { Component, Input, OnInit } from "@angular/core";
import { HistoricalGoodsIssueService } from "../../historical-goods-issue/services/historical-goods-issue.service";
import { SaleNumberInput } from "../../historical-goods-issue/model/salenumber-input";
import { HistoricalGoodsIssue } from "../../historical-goods-issue/model/historical-goods-issue";

@Component({
    selector: 'goods-issue-product-list',
    templateUrl: './goods-issue-product-list.component.html'
})
export class GoodsIssueProductListComponent implements OnInit {

    @Input() saleNumber: number;
    saleNumberInput: SaleNumberInput = {
        saleNumber: 0,
    }
    historicalsGoodsIssue: HistoricalGoodsIssue[];
    errors: any[] = [];

    constructor(private historicalGoodsIssueService: HistoricalGoodsIssueService) {
        
    }
    
    ngOnInit(): void {
        this.saleNumberInput.saleNumber = this.saleNumber;
        this.fillHistoricalGoodsIssue();
    }

    fillHistoricalGoodsIssue() {
        this.historicalGoodsIssueService.findHistoricalGoodsIssueBySaleNumber(this.saleNumberInput)
            .subscribe(historical => {
                this.historicalsGoodsIssue = historical;
        })
    }
}