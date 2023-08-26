import { Component, ElementRef, OnInit, Provider, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { ProviderService } from 'src/app/features/provider/services/provider.service';
import { SubSection } from 'src/app/features/subsection/model/subsection';
import { SubsectionService } from 'src/app/features/subsection/services/subsection.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ProductData } from '../../model/product-data';
import { ProductDataService } from '../../services/product-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product-data',
  templateUrl: './update-product-data.component.html',
  styleUrls: ['./update-product-data.component.scss']
})
export class UpdateProductDataComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  productForm: FormGroup;
  product: ProductData;
  localStorageUtils = new LocalStorageUtils();
  validateDocument: any;
  formResult: string= '';
  subsections: SubSection[];
  providers: Provider[];
  unities: string[];
  attatchment: Attachment = {
    id: '',
    name: '',
    type: '',
    imageData: ''
  };

  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';
  
  constructor(private fb: FormBuilder,
    private productService: ProductDataService,
    private subsectionService: SubsectionService,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService) {

    super(toastr, translateService);

    this.validationMessages = {
      name: {
        required: this.translateService.instant('br_com_supermarket_PRODUCT_NAME_REQUIRED_PLACEHOLDER'),
        minLength: this.translateService.instant('br_com_supermarket_PRODUCT_ERROR_FORM_NAME_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PRODUCT_ERROR_FORM_NAME_MAX_LENGTH_MESSAGE'),
      },
      unity: {
        required: this.translateService.instant('br_com_supermarket_PRODUCT_UNITY_TYPE_REQUIRED_PLACEHOLDER'),
      },
      purchasePrice: {
        required: this.translateService.instant('br_com_supermarket_PRODUCT_PURCHASE_PRICE_REQUIRED_PLACEHOLDER'),
      },
      salePrice: {
        required: this.translateService.instant('br_com_supermarket_PRODUCT_SALE_PRICE_REQUIRED_PLACEHOLDER'),
      },
      inventory: {
        required: this.translateService.instant('br_com_supermarket_PRODUCT_ERROR_FORM_INVENTORY_MESSAGE'),
      },
      id: {
        required: this.translateService.instant('br_com_supermarket_PRODUCT_FIELD_REQUIRED_PLACEHOLDER'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
    this.product = this.route.snapshot.data['product'];
  }

  ngOnInit() {
    this.getSubsections();
    this.getProviders();
    this.getAllUnitiesSelect();

    this.productForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      unity: ['', Validators.required],
      purchasePrice: [null , Validators.required],
      salePrice: ['', Validators.required],
      ean13: [null],
      dun14: [null],
      inventory: ['', Validators.required],
      subSection: this.fb.group({
        id: ['', Validators.required]
      }),
      providerProduct: this.fb.group({
        id: ['', Validators.required]
      }),
      productPhoto: [null]
    });

    this.fillForm();
  }

  getSubsections() {
    this.subsectionService.getAllSubsections().subscribe((response) => {
      this.subsections = response['content'];
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_PRODUCT_AN_ERROR_OCCURRED_WHILE_GET_SUB_SECTIONS'));
    });
  }

  getProviders() {
    this.providerService.getAllProviders().subscribe((response) => {
      this.providers = response['content'];
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_PRODUCT_AN_ERROR_OCCURRED_WHILE_GET_PROVIDERS'));
    });
  }

  getAllUnitiesSelect() {
    this.productService.getAllUnities().subscribe((response) => {
      this.unities = response.names;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_PRODUCT_AN_ERROR_OCCURRED_WHILE_GET_UNITIES'));
    });
  }

  fillForm() {
    this.productForm.patchValue({
      id: this.product?.id,
      name: this.product?.name,
      unity: this.product?.unity,
      purchasePrice: this.product?.purchasePrice,
      salePrice: this.product?.salePrice,
      ean13: this.product?.ean13,
      dun14: this.product?.dun14,
      inventory: this.product?.inventory,
      subSection: this.product?.subSection,
      providerProduct: this.product?.providerProduct,
      productPhoto: this.product?.productPhoto,
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.productForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.productForm);
  }

  updateProduct() {
    
    if (this.productForm.valid) {

      this.spinner.show();
      this.product = Object.assign({}, this.product, this.productForm.value);
      this.setImage(this.imageName, this.imageType, this.croppedImageData);
      
      this.productService.updateProduct(this.product)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  setImage(imageName: string, imageType: string, croppedImageData: any) {
    if (imageName != null && imageType != null && croppedImageData != null) {
      this.attatchment.name = imageName;
      this.attatchment.type = imageType;
      this.attatchment.imageData = croppedImageData;
      this.product.productPhoto = this.attatchment;
    }
  }

  processSuccess(response: any) {
    this.productForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_PRODUCT_EDIT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/product-data/getAll'])
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
}
