import { Component, Input, OnInit } from "@angular/core";
import { HistoricalGoodsReceipt } from "../../historical-goods-receipt/model/historical-goods-receipt";
import { HistoricalGoodsReceiptService } from "../../historical-goods-receipt/services/historical-goods-receipt.service";
import { InvoiceInput } from "../../historical-goods-receipt/model/invoice-input";

@Component({
    selector: 'goods-receipt-product-list',
    templateUrl: './goods-receipt-product-list.component.html'
})
export class GoodsReceiptProductListComponent implements OnInit {

    @Input() invoice: string;
    invoiceInput: InvoiceInput = {
        invoice: ""
    }
    historicalsGoodsReceipt: HistoricalGoodsReceipt[];
    errors: any[] = [];

    constructor(private historicalGoodsReceiptService: HistoricalGoodsReceiptService) {
        
    }
    
    ngOnInit(): void {
        this.invoiceInput.invoice = this.invoice;
        this.fillHistoricalGoodsReceipt();
    }

    fillHistoricalGoodsReceipt() {
        this.historicalGoodsReceiptService.findHistoricalGoodsReceipByInvoice(this.invoiceInput)
            .subscribe(historical => {
                this.historicalsGoodsReceipt = historical;
        })
    }
}