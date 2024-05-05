import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Establishment } from '../../model/establishment';
import { EstablishmentService } from '../../services/establishment.service';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { CpfCnpjValidators } from 'src/app/utils/document-validators-form';
import { Observable, fromEvent, merge } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-establishment',
  templateUrl: './update-establishment.component.html',
  styleUrls: ['./update-establishment.component.scss']
})
export class UpdateEstablishmentComponent  extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  establishmentForm: FormGroup;
  establishment: Establishment;
  localStorageUtils = new LocalStorageUtils();
  vaidateDocument: any;
  formResult: string= '';
  attatchment: Attachment = {
    id: null,
    name: null,
    type: null,
    imageData: null
  };
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';
  
  
  constructor(private fb: FormBuilder,
    private establishmentService: EstablishmentService,
    private router: Router,
    private route: ActivatedRoute,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private spinner: NgxSpinnerService) {

    super(toastr, translateService);
    
    this.validationMessages = {
      name: {
        required: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_NAME_REQUIRED_MESSAGE'),
        minLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_NAME_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_NAME_MAX_LENGTH_MESSAGE'),
      },
      cnpj: {
        required: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_DOCUMENT_REQUIRED_MESSAGE'),
        cnpjInvalido: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_DOCUMENT_INVALID_CNPJ_MESSAGE'),
      },
      stateRegistration: {
        required: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_STATE_REGISTRATION_REQUIRED_MESSAGE'),
        minLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_STATE_REGISTRATION_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_STATE_REGISTRATION_MAX_LENGTH_MESSAGE'),
      },
      municipalRegistration: {
        minLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_MUNICIPAL_REGISTRATION_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_MUNICIPAL_REGISTRATION_MAX_LENGTH_MESSAGE'),
      },
      address: {
        required: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_ADDRESS_REQUIRED_MESSAGE'),
        minLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_ADDRESS_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_ADDRESS_MAX_LENGTH_MESSAGE'),
      },
      phone: {
        required: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_PHONE_REQUIRED_MESSAGE'),
        minLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_PHONE_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_PHONE_MAX_LENGTH_MESSAGE'),
      },
      manager: {
        required: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_MANAGER_REQUIRED_MESSAGE'),
        minLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_MANAGER_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_ESTABLISHMENT_ERROR_FORM_MANAGER_MAX_LENGTH_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);

    this.establishment = this.route.snapshot.data['establishment'];
  }

  ngOnInit() {
    this.spinner.show();
    this.establishmentForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      cnpj: ['', Validators.compose([Validators.required, CpfCnpjValidators.cnpj])],
      stateRegistration: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      municipalRegistration: [null , Validators.compose([Validators.minLength(2), Validators.maxLength(20)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(60)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      manager: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      establismentLogo: [null]
    });
    this.fillForm();
  }

  fillForm() {
    this.establishmentForm.patchValue({
      id: this.establishment?.id,
      name: this.establishment?.name,
      cnpj: this.establishment?.cnpj,
      stateRegistration: this.establishment?.stateRegistration,
      municipalRegistration: this.establishment?.municipalRegistration,
      address: this.establishment?.address,
      phone: this.establishment?.phone,
      manager: this.establishment?.manager,
      establismentLogo: this.establishment?.establismentLogo,
    });
    this.spinner.hide();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.establishmentForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.establishmentForm);
  }

  editEstablishment() {
    if (this.establishmentForm.dirty && this.establishmentForm.valid) {
      this.spinner.show();
      this.establishment = Object.assign({}, this.establishment, this.establishmentForm.value);
      this.setImage(this.imageName, this.imageType, this.croppedImageData);
      this.establishmentService.updateEstablishment(this.establishment)
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
      this.establishment.establismentLogo = this.attatchment;
    }
  }

  processSuccess(response: any) {
    this.establishmentForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_ESTABLISHMENT_EDIT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/establishment/getAll'])
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
