import { Component } from '@angular/core';
import { ProductData } from '../../model/product-data';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ProductDataService } from '../../services/product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product-data',
  templateUrl: './delete-product-data.component.html',
  styleUrls: ['./delete-product-data.component.scss']
})
export class DeleteProductDataComponent {

  productData: ProductData;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();
  id: any = '';
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';

  constructor(
    private productService: ProductDataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

      this.productData = this.route.snapshot.data['product'];
      this.spinner.hide();
  }

  deleteProduct() {
    this.spinner.show();
    this.productService.deleteProduct(this.productData.id)
      .subscribe(
        event => { this.successExclusion(event)},
        error => { this.failDelete(error) }
      );
  }

  successExclusion(event: any) {
    const toast = this.toastr.success(
      this.translateService.instant('br_com_supermarket_PRODUCT_DELETE_SUCCESS'), 
      this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS')
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/product-data/getAll']);
        this.spinner.hide()
      });
    }
  }

  failDelete(fail) {
    if (fail.error !== null && fail.error !== undefined) {
      this.errors = fail.error.errors;
    } else {
      if (fail.status === 403) {
        this.errors = [this.translateService.instant('br_com_supermarket_LOGIN_AN_ERROR_OCCURRED_EXPIRED_LOGIN')];
        this.localStorageUtils.clearUserLocationData();
        this.router.navigate(['/account/login']);
      } else {
        this.errors = fail.message;
      }
    }
    this.toastr.error(this.errors.toString(), this.translateService.instant('br_com_supermarket_MSG_ERROR'));
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
