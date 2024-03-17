import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { GoodsReceipt } from '../../model/goodsreceipt';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { GoodsreceiptService } from '../../services/goodsreceipt.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, fromEvent, merge } from 'rxjs';
import { ProductDataService } from 'src/app/features/product-data/services/product-data.service';
import { ProductData } from 'src/app/features/product-data/model/product-data';

@Component({
  selector: 'app-create-goodsreceipt',
  templateUrl: './create-goodsreceipt.component.html',
  styleUrls: ['./create-goodsreceipt.component.scss']
})
export class CreateGoodsreceiptComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  goodsReceiptForm: FormGroup;
  goodsReceipt: GoodsReceipt;
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
    this.validationMessages = {
      invoice: {
        required: this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_INVOICE_KEY_REQUIRED_MESSAGE'),
      },
      searchProduct: {
        required: this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_ERROR_FORM_PRODUCT_DATA_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
  }

  ngOnInit() {
    this.goodsReceiptForm = this.fb.group({
      invoice: ['', Validators.required],
      searchProduct: [''],
      productDataList: this.fb.array([])
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.goodsReceiptForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.goodsReceiptForm);
  }

  searchProducts(term: string) {
    if (term.trim() === '') {
      this.searchResults = [];
      return;
    }
    
    this.productDataService.searchProducts(term).subscribe((products) => {
      this.searchResults = products;
    });
  }

  selectProduct(product: ProductData) {
    const productCopy = { ...product, newTotalQuantity: product.inventory };
    this.selectedProducts.push(productCopy);
    this.searchResults = [];
  }

  addSelectedProductsToGoodsReceipt() {
    this.selectedProducts.forEach((product) => {
      if(product.newPurchasePrice !== undefined) {
        product.purchasePrice = product.newPurchasePrice;
      }
      if(product.newInventory !== undefined) {
        product.inventory = product.newInventory;
      }
      this.goodsReceipt.productDataList.push(product);
    });
  }
  
  addGoodsReceipt() {
    if (this.goodsReceiptForm.dirty && this.goodsReceiptForm.valid) {
      if(this.selectedProducts.length !== 0) {
        this.spinner.show();
        this.goodsReceipt = Object.assign({}, this.goodsReceipt, this.goodsReceiptForm.value);
        this.addSelectedProductsToGoodsReceipt();
        this.goodsReceiptService.newGoodsReceipt(this.goodsReceipt)
          .subscribe(
            success => { this.processSuccess(success) },
            fail => { this.processFail(fail) }
          );
      } else {
        this.toastr.warning(
          this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_ADD_AT_LEAST_ONE_PRODUCT_MESSAGE'), 
          this.translateService.instant('br_com_supermarket_MSG_GENERIC_WARNING'));
      }
    }
  }

  processSuccess(response: any) {
    this.goodsReceiptForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/goods-receipt/getAll'])
      });
    }
  }

  processFail(fail: any) {
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

  onQuantityChange(index: number, newQuantity: string) {
    const parsedQuantity = this.formatNumberInventory(newQuantity);
    const numberFormated = parseFloat((Number(parsedQuantity)).toFixed(2));
    if (!isNaN(numberFormated)) {
        this.selectedProducts[index].newTotalQuantity = numberFormated;
        this.selectedProducts[index].newInventory = numberFormated + this.selectedProducts[index].inventory;
        this.updateTotals();
    }
  }

  onPurchasePriceChange(index: number, newPurchse: string) {
    const parsedPurchasePrice = this.formatNumberPurchasePrice(newPurchse);
    const numberFormated = parseFloat((Number(parsedPurchasePrice) / 100).toFixed(2));
    if (!isNaN(numberFormated)) {
        this.selectedProducts[index].newPurchasePrice = numberFormated;
        this.updateTotals();
    }
  }

  formatNumberPurchasePrice(input) {
    const cleanedInput = input.replace(/[^\d]/g, '');
    const numberFormated = Number(cleanedInput).toFixed(2);
    return numberFormated;
  }

  formatNumberInventory(input) {
    const cleanedInput = input.replace(/[^\d]/g, '');
    if(cleanedInput !== "") {
      const numberFormated = Number(cleanedInput).toFixed(2);
      return numberFormated;
    }
    return "0";
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
    this.updateTotalInventory();
    this.updateTotals();
  }
  
  updateInventory(index: number) {
    const product = this.selectedProducts[index];
    this.newInventory = product.newTotalQuantity + product.inventory;
  }  

  updateTotalInventory() {
    this.newInventory = this.selectedProducts.reduce((total, product) => total + product.newTotalQuantity, 0);
  }  

  updateTotals() {
    let totalAllProducts = 0;
  
    this.selectedProducts.forEach(product => {
      product.total = product.newPurchasePrice * product.newTotalQuantity;
      totalAllProducts += product.total;
    });
  
    this.totalAllProducts = totalAllProducts;
  }
  
}
