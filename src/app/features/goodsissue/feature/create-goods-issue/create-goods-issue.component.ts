import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { GoodsreceiptService } from 'src/app/features/goodsreceipt/services/goodsreceipt.service';
import { ProductDataService } from 'src/app/features/product-data/services/product-data.service';
import { GoodsIssue } from '../../model/Goodsissue';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ProductData } from 'src/app/features/product-data/model/product-data';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-create-goods-issue',
  templateUrl: './create-goods-issue.component.html',
  styleUrls: ['./create-goods-issue.component.scss']
})
export class CreateGoodsIssueComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  goodsIssueForm: FormGroup;
  goodsIssue: GoodsIssue;
  localStorageUtils = new LocalStorageUtils();
  searchResults: ProductData[] = [];
  selectedProducts: ProductData[] = [];
  newInventory: number;
  totalAllProducts: number = 0;

  constructor(private fb: FormBuilder,
    private goodsReceiptService: GoodsreceiptService,
    private productDataService: ProductDataService,
    private router: Router,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private spinner: NgxSpinnerService) {

      super(toastr, translateService);
    }

  ngOnInit(): void {
    this.goodsIssueForm = this.fb.group({
      saleNumber: [''],
      productsTotal: [''],
      subtotal: [''],
      totalReceived: ['', Validators.required],
      change: [''],
      paymentOptionsType: ['', Validators.required],
      registrationDate: [''],
      searchProduct: [''],
      productDataList: this.fb.array([])
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.goodsIssueForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.goodsIssueForm);
  }

  searchProducts(term: string) {
    this.productDataService.searchProducts(term).subscribe((products) => {
      this.searchResults = products;
    });
  }

  selectProduct(product: ProductData) {
    const productCopy = { ...product, newTotalQuantity: product.inventory };
    this.selectedProducts.push(productCopy);
    this.searchResults = [];
  }

}
