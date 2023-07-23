import { Component } from '@angular/core';
import { ProductData } from '../../model/product-data';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

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
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';

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
