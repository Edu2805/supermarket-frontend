import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Establishment } from '../../model/establishment';
import { EstablishmentService } from '../../services/establishment.service';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { CpfCnpjValidators } from 'src/app/utils/document-validators-form';
import { Observable, fromEvent, merge } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-create-establishment',
  templateUrl: './create-establishment.component.html',
  styleUrls: ['./create-establishment.component.scss']
})
export class CreateEstablishmentComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  establishmentForm: FormGroup;
  establishment: Establishment;
  localStorageUtils = new LocalStorageUtils();

  vaidateDocument: any;

  formResult: string= '';
  
  constructor(private fb: FormBuilder,
    private establishmentService: EstablishmentService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

    super();
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
  }

  ngOnInit() {
    this.establishmentForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      cnpj: ['', Validators.compose([Validators.required, CpfCnpjValidators.cnpj])],
      stateRegistration: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      municipalRegistration: [null , Validators.compose([Validators.minLength(2), Validators.maxLength(20)])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(60)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(11)])],
      manager: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.establishmentForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.establishmentForm);
  }

  addEstablishment() {
    
    if (this.establishmentForm.dirty && this.establishmentForm.valid) {
      this.spinner.show();
      this.establishment = Object.assign({}, this.establishment, this.establishmentForm.value);

      this.establishmentService.newEstablishment(this.establishment)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.establishmentForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_ESTABLISHMENT_NEW_SUCCESS'), 
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
