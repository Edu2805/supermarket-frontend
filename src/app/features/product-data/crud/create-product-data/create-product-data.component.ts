import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { ProductData } from '../../model/product-data';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Router } from '@angular/router';
import { ProductDataService } from '../../services/product-data.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { SubSection } from 'src/app/features/subsection/model/subsection';
import { Provider } from 'src/app/features/provider/model/provider';
import { SubsectionService } from 'src/app/features/subsection/services/subsection.service';
import { ProviderService } from 'src/app/features/provider/services/provider.service';
import { AttachmentService } from 'src/app/features/attachment/services/attachment.service';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { Constants } from 'src/app/utils/constants/constants';

@Component({
  selector: 'app-create-product-data',
  templateUrl: './create-product-data.component.html',
  styleUrls: ['./create-product-data.component.scss']
})
export class CreateProductDataComponent extends FormBaseComponent implements OnInit {

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

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.productForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.productForm);
  }

  addProduct() {
    
    if (this.productForm.dirty && this.productForm.valid) {

      this.spinner.show();
      this.product = Object.assign({}, this.product, this.productForm.value);
      this.attatchment.name = this.imageName;
      this.attatchment.type = this.imageType;
      this.attatchment.imageData = this.croppedImageData;

      this.product.productPhoto = this.attatchment;
      
      this.productService.newProduct(this.product)
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
        this.translateService.instant('br_com_supermarket_PRODUCT_NEW_SUCCESS'), 
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
    if (event.currentTarget.files[0].size > Constants.ATTACHMENT_MAXIMUM_SIZE_FILE) {
      this.toastr.warning(this.errors.toString(), this.translateService.instant('br_com_supermarket_ATTACHMENT_FILE_EXCEEDS_MAXIMUM_SIZE'));
      return;
    }
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
