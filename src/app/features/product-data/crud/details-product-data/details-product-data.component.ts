import { Component, OnInit } from '@angular/core';
import { ProductData } from '../../model/product-data';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-product-data',
  templateUrl: './details-product-data.component.html',
  styleUrls: ['./details-product-data.component.scss']
})
export class DetailsProductDataComponent {

  productData: ProductData;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();
  id: any = '';

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.productData = this.route.snapshot.data['product'];
      this.spinner.hide();
  }

  accordion(id: any) {
    if (this.id == id) {
      this.id = '';
    } else {
      this.id = id;
    }
  }
}
