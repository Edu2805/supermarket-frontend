import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-goods-issue',
  templateUrl: './create-goods-issue.component.html',
  styleUrls: ['./create-goods-issue.component.scss']
})
export class CreateGoodsIssueComponent extends FormBaseComponent implements OnInit {

  @ViewChild('paymentModal') paymentModal!: TemplateRef<any>;
  @ViewChild('confirmCancelModal') confirmCancelModal!: TemplateRef<any>;
  @ViewChild('changeModal') changeModal!: TemplateRef<any>;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  goodsIssueForm: FormGroup;
  goodsIssue: GoodsIssue = {} as GoodsIssue;
  localStorageUtils = new LocalStorageUtils();
  searchResults: ProductData[] = [];
  selectedProducts: ProductData[] = [];
  productData: ProductData;
  newInventory: number;
  totalAllProducts: number = 0;
  establismentName: string;
  cnpjStablishment: string;
  employeeCode: string;
  isNactiveButtonRegister: boolean;
  isNactiveButtonEfectivePayment: boolean;
  paymentOptions: string[] = [];
  getPurchaseNumber: number;
  totalReceivedNumeric: number;
  totalChange: number = 0;
  user: any;
  userName: string;
  attatchment: Attachment = {
    id: '',
    name: '',
    type: '',
    imageData: ''
  };

  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';
  images: string = environment.imagesUrl;

  constructor(private fb: FormBuilder,
    private goodsIssueService: GoodsissueService,
    private productDataService: ProductDataService,
    private router: Router,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) {

      super(toastr, translateService);
      this.validationMessages = {
        invoice: {
          required: this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_INVOICE_KEY_REQUIRED_MESSAGE'),
        },
        searchProduct: {
          required: this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_ERROR_FORM_PRODUCT_DATA_REQUIRED_MESSAGE'),
        },
        inventory: {
          required: this.translateService.instant('br_com_supermarket_GOODS_RECEIPT_ERROR_FORM_PRODUCT_DATA_REQUIRED_MESSAGE'),
        },
        totalReceived: {
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
      inventory: ['1', Validators.required],
      price: { value: '', disabled: true },
      totalReceived: { value: '', disabled: true },
      paymentOptionsType: ['', Validators.required],
      productDataList: this.fb.array([]),
    });

    this.goodsIssueForm.get('inventory').valueChanges.subscribe(() => {
      this.checkFieldsNotEmpty();
    });
    this.goodsIssueForm.get('price').valueChanges.subscribe(() => {
      this.checkFieldsNotEmpty();
    });

    this.goodsIssueForm.get('totalReceived').valueChanges.subscribe(() => {
      this.checkTotalReceivedNotEmpty();
    });
  
    this.goodsIssueForm.get('description').valueChanges.subscribe(() => {
      this.checkFieldsNotEmpty();
    });

    this.getAllPaymentOptionsSelect();
    this.getSaleInformation();
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
    const inventory = this.goodsIssueForm.get('inventory').value;
    const price = this.goodsIssueForm.get('price').value;
    const description = this.goodsIssueForm.get('description').value;
    this.isNactiveButtonRegister = !(price && description && inventory);
  }

  checkTotalReceivedNotEmpty() {
    if (this.goodsIssueForm.get('paymentOptionsType').value === 'Dinheiro') {
      const totalReceived = this.goodsIssueForm.get('totalReceived').value;
      this.isNactiveButtonEfectivePayment = !totalReceived;
    }
  }

  addSelectedProductsToGoodsIssue(newInventory: any) {
    this.productData.inventory = newInventory;
    this.selectedProducts.push(this.productData);
    this.goodsIssue.productDataList = this.selectedProducts;
    this.getSaleNumber();
  }

  verifyDefaultValues() {
    const valorCampo = (event.target as HTMLInputElement).value;
    const regex = /^[0-9]*$/;

    if (!regex.test(valorCampo)) {
      (event.target as HTMLInputElement).value = '';
    }
  }

  getAllPaymentOptionsSelect() {
    this.goodsIssueService.getAllPaymentOptions().subscribe((response) => {
      this.paymentOptions = response.names;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_GOODS_ISSUE_AN_ERROR_OCCURRED_WHILE_GET_PAYMENT_OPTIONS'));
    });
  }

  getSaleInformation() {
    this.spinner.show();
    this.user = this.localStorageUtils.getUser();
    if (this.user && this.user.login){
      this.userName = this.user.login;
    }
    this.goodsIssueService.getSaleInformation(this.userName).subscribe((response) => {
      this.establismentName = response.establismentName;
      this.cnpjStablishment = response.establishmentCnpj;
      this.employeeCode = response.employeeCode;
      this.attatchment = response.establishmentLogo;
      this.spinner.hide();
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_GOODS_ISSUE_AN_ERROR_OCCURRED_WHILE_GET_SALE_INFORMATION'));
      this.spinner.hide();
    });
  }

  getSaleNumber() {
    this.goodsIssueService.getSaleNumber().subscribe((response) => {
      this.getPurchaseNumber = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_GOODS_ISSUE_AN_ERROR_OCCURRED_WHILE_GET_SALE_INFORMATION'));
    });
  }
  
  addGoodsIssue() {
    this.registerProduct();
    if (this.goodsIssueForm.dirty && this.goodsIssueForm.valid) {
      if(this.selectedProducts.length !== 0) {
        this.spinner.show();
        this.goodsIssue.totalReceived = this.totalReceivedNumeric;
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
        this.modalService.dismissAll(this.paymentModal);
        this.goodsIssueForm.reset();
        this.goodsIssueForm.setControl('productDataList', this.fb.array([]));
        this.selectedProducts = [];
        this.totalAllProducts = 0;
        this.getPurchaseNumber = null;
        this.showChange(response);
      });
    }
  }

  showChange(response: any) {
    if (response.change !== 0 && response.paymentOptionsType === 'MONEY') {
      this.totalChange = response.change;
      this.modalService.open(this.changeModal);
    }
  }

  onCloseChangeModal() {
    this.modalService.dismissAll(this.changeModal);
    this.totalChange = 0;
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

        this.addSelectedProductsToGoodsIssue(this.newInventory);

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

  openPaymentModal() {
    this.modalService.open(this.paymentModal);
  }

  isPaymentButtonDisabled(): boolean {
    const paymentOptionsTypeControl = this.goodsIssueForm.get('paymentOptionsType');
    const totalReceived = this.goodsIssueForm.get('totalReceived');
    return !paymentOptionsTypeControl || !paymentOptionsTypeControl.value 
      || !totalReceived || !totalReceived.value;
  }

  checkTotalReceivedValidity(event: any) {
    const enteredValue = event.target.value;
    const numericValue = parseFloat(enteredValue.replace(/[^\d,.]/g, '').replace(',', '.'));

    if (!Number.isNaN(numericValue)) {
      this.totalReceivedNumeric = numericValue;
      
      this.goodsIssueForm.get('totalReceived').markAsTouched();
    } else {
      this.goodsIssueForm.get('totalReceived').setValue(null);
      this.goodsIssueForm.get('totalReceived').setValidators(Validators.required);
    }
  }
  
  checkPaymentOptionsValidity(event) {
    this.goodsIssueForm.get('paymentOptionsType').setValue(event.target.value);
    const paymentOption = this.goodsIssueForm.get('paymentOptionsType').value;
    this.goodsIssue.paymentOptionsType = paymentOption;
    const paymentOptionsTypeControl = this.goodsIssueForm.get('paymentOptionsType');
    paymentOptionsTypeControl.markAsTouched();
    const isMoney = paymentOption === 'Dinheiro' || paymentOption === 'Dinero' || paymentOption === 'Money' ? true : false;
    if (!isMoney) {
      this.totalReceivedNumeric = this.totalAllProducts;
      this.goodsIssue.totalReceived = this.totalReceivedNumeric;
      this.goodsIssueForm.get('totalReceived').setValue(this.totalAllProducts);
      this.goodsIssueForm.get('totalReceived').disable();
      this.goodsIssueForm.get('totalReceived').clearValidators();
    } else {
      this.totalReceivedNumeric = 0;
      this.goodsIssueForm.get('totalReceived').setValue(null);
      this.goodsIssueForm.get('totalReceived').enable();
      this.goodsIssueForm.get('totalReceived').setValidators(Validators.required);
      this.goodsIssueForm.get('totalReceived').updateValueAndValidity();
    }
  }

  cancelPurchase() {
    this.goodsIssueForm.reset();
    this.goodsIssueForm.setControl('productDataList', this.fb.array([]));
    this.selectedProducts = [];
    this.totalAllProducts = 0;
    this.getPurchaseNumber = null;
  }

  openConfirmCancelModal() {
    this.modalService.open(this.confirmCancelModal);
  }

  confirmCancel() {
    this.cancelPurchase();
    this.modalService.dismissAll();
  }

  handleCancelClick() {
    this.openConfirmCancelModal();
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
