import { Component, ElementRef, OnInit, Provider, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ImageTransform, ImageCroppedEvent, Dimensions } from 'ngx-image-cropper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { AttachmentService } from 'src/app/features/attachment/services/attachment.service';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { ProviderService } from 'src/app/features/provider/services/provider.service';
import { SubSection } from 'src/app/features/subsection/model/subsection';
import { SubsectionService } from 'src/app/features/subsection/services/subsection.service';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ProductData } from '../../model/product-data';
import { ProductDataService } from '../../services/product-data.service';

@Component({
  selector: 'app-update-product-data',
  templateUrl: './update-product-data.component.html',
  styleUrls: ['./update-product-data.component.scss']
})
export class UpdateProductDataComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  productForm: FormGroup;
  product: ProductData;
  localStorageUtils = new LocalStorageUtils();
  validateDocument: any;
  formResult: string= '';
  subsections: SubSection[];
  providers: Provider[];
  attatchment: Attachment = {
    id: '',
    name: '',
    type: '',
    imageData: ''
  };

  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImageData: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imageName: string;
  imageType: string;
  
  constructor(private fb: FormBuilder,
    private productService: ProductDataService,
    private subsectionService: SubsectionService,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService,
    private attatchmentService: AttachmentService) {

    super();
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
    
    if (this.productForm.dirty && this.productForm.valid) {

      this.spinner.show();
      this.product = Object.assign({}, this.product, this.productForm.value);
      this.attatchment.name = this.imageName;
      this.attatchment.type = this.imageType;
      this.attatchment.imageData = this.croppedImageData;

      this.product.productPhoto = this.attatchment;
      
      this.productService.updateProduct(this.product)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageName = event.currentTarget.files[0].name;
    this.imageType = event.currentTarget.files[0].type;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageData = this.croppedImage.split(',')[1];
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imageName + ' não é aceito');
  }
}
