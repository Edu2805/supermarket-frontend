import { Component } from '@angular/core';
import { GoodsReceipt } from '../../model/goodsreceipt';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HistoricalGoodsReceipt } from 'src/app/features/historical-goods-receipt/model/historical-goods-receipt';
import { InvoiceInput } from 'src/app/features/historical-goods-receipt/model/invoice-input';

@Component({
  selector: 'app-details-goodsreceipt',
  templateUrl: './details-goodsreceipt.component.html',
  styleUrls: ['./details-goodsreceipt.component.scss']
})
export class DetailsGoodsreceiptComponent {

  goodsReceipt: GoodsReceipt;
  historicalGoodsReceipt: HistoricalGoodsReceipt;
  historicalsGoodsReceipt: HistoricalGoodsReceipt[];
  invoiceInput: InvoiceInput = {
    invoice: ''
  };
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.goodsReceipt = this.route.snapshot.data['goodsreceipt'];
      this.invoiceInput.invoice = this.goodsReceipt?.invoice;
      this.spinner.hide();
  }
}
