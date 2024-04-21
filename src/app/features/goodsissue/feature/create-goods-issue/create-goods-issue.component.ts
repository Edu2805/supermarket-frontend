import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { ProductDataService } from 'src/app/features/product-data/services/product-data.service';
import { GoodsIssue } from '../../model/Goodsissue';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ProductData } from 'src/app/features/product-data/model/product-data';
import { Observable, fromEvent, merge } from 'rxjs';
import { GoodsissueService } from '../../services/goodsissue.service';

@Component({
  selector: 'app-create-goods-issue',
  templateUrl: './create-goods-issue.component.html',
  styleUrls: ['./create-goods-issue.component.scss']
})
export class CreateGoodsIssueComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  goodsIssueForm: FormGroup;
  goodsIssue: GoodsIssue = {} as GoodsIssue;
  localStorageUtils = new LocalStorageUtils();
  searchResults: ProductData[] = [];
  selectedProducts: ProductData[] = [];
  productData: ProductData;
  newInventory: number;
  totalAllProducts: number = 0;
  nomeMercado: string = "Supermercado XYZ";
  cnpjMercado: string = "00.000.000/0000-00";
  codigoOperador: string = "001";
  isNactiveButtonRegister: boolean;

  constructor(private fb: FormBuilder,
    private goodsIssueService: GoodsissueService,
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

  ngOnInit(): void {
    this.isNactiveButtonRegister = true;
    this.goodsIssueForm = this.fb.group({
      saleNumber: [''],
      searchProduct: [''],
      description: { value: '', disabled: true },
      inventory: { value: '1', disabled: false },
      price: { value: '', disabled: true },
      productDataList: this.fb.array([]),
    });
    this.goodsIssueForm.get('price').valueChanges.subscribe(() => {
      this.checkFieldsNotEmpty();
    });
  
    this.goodsIssueForm.get('description').valueChanges.subscribe(() => {
      this.checkFieldsNotEmpty();
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
    if (term.trim() === '') {
      this.searchResults = [];
      return;
    }
    
    this.productDataService.searchProducts(term).subscribe((products) => {
      this.searchResults = products;
    });
  }

  selectProduct(product: ProductData) {
    this.goodsIssueForm.patchValue({
        inventory: '1',
        description: product.name,
        price: product.salePrice
    });
    this.productData = product;
    this.searchResults = [];
  }

  checkFieldsNotEmpty() {
    const price = this.goodsIssueForm.get('price').value;
    const description = this.goodsIssueForm.get('description').value;
    this.isNactiveButtonRegister = !(price && description);
  }

  addSelectedProductsToGoodsReceipt(newInventory: any) {
    this.productData.inventory = newInventory;
    this.selectedProducts.push(this.productData);
    this.goodsIssue.productDataList = this.selectedProducts;
  }

  verifyDefaultValues() {
    const valorCampo = (event.target as HTMLInputElement).value;
    const regex = /^[0-9]*$/;

    if (!regex.test(valorCampo)) {
      (event.target as HTMLInputElement).value = '';
    }
  }
  
  addGoodsIssue() {
    this.registerProduct();
    if (this.goodsIssueForm.dirty && this.goodsIssueForm.valid) {
      if(this.selectedProducts.length !== 0) {
        this.spinner.show();
        this.goodsIssue.totalReceived = 23.99;
        this.goodsIssue.paymentOptionsType = "OPENED";
        this.goodsIssueService.newGoodsIssue(this.goodsIssue)
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
    this.goodsIssueForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        //this.router.navigate(['/goods-issue/getAll'])
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

  registerProduct() {
    if (this.goodsIssueForm.get('description').value.trim() !== '') {
        this.newInventory = this.goodsIssueForm.get('inventory').value,

        this.addSelectedProductsToGoodsReceipt(this.newInventory);

        this.goodsIssueForm.patchValue({
            searchProduct: '',
            description: '',
            price: '',
            inventory: '1'
        });
        
        this.updateTotals();
    }
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

  cancelPurchase() {
    // Implementar lógica de cancelamento da compra
    this.selectedProducts = [];
    this.totalAllProducts = 0;
  }

  processPayment() {
    // Implementar lógica de processamento do pagamento
  }

  updateTotals() {
    let totalAllProducts = 0;
  
    this.selectedProducts.forEach(product => {
      product.total = product.salePrice * product.inventory;
      totalAllProducts += product.total;
    });
  
    this.totalAllProducts = totalAllProducts;
  }

}
