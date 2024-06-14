import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Provider } from '../../model/provider';
import { ProviderService } from '../../services/provider.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CpfCnpjValidators } from 'src/app/utils/document-validators-form';
import { SubscriptionType } from '../../model/subscription-type';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.scss']
})
export class UpdateProviderComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  providerForm: FormGroup;
  provider: Provider;
  localStorageUtils = new LocalStorageUtils();
  validateDocument: any;
  formResult: string= '';
  subscriptionTypes: SubscriptionType[];
  
  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {

    super(toastr, translateService);

    this.validationMessages = {
      name: {
        required: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_NAME_REQUIRED_MESSAGE'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_NAME_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_NAME_MAX_LENGTH_MESSAGE')}`,
      },
      subscriptionNumber: {
        required: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_SUBSCRIPTION_NUMBER_REQUIRED_MESSAGE'),
        cnpjInvalido: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_SUBSCRIPTION_NUMBER_CNPJ_INVALID_MESSAGE'),
        cpfInvalido: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_SUBSCRIPTION_NUMBER_CPF_INVALID_MESSAGE'),
      },
      stateRegistration: {
        required: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_STATE_REGISTRATION_REQUIRED_MESSAGE'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_STATE_REGISTRATION_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_STATE_REGISTRATION_MAX_LENGTH_MESSAGE')}`,
      },
      municipalRegistration: {
        rangeLength: `${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_MUNICIPAL_REGISTRATION_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_MUNICIPAL_REGISTRATION_MAX_LENGTH_MESSAGE')}`,
      },
      address: {
        required: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_ADDRESS_REQUIRED_MESSAGE'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_ADDRESS_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_ADDRESS_MAX_LENGTH_MESSAGE')}`,
      },
      phone: {
        required: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_PHONE_REQUIRED_MESSAGE'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_PHONE_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_PHONE_MAX_LENGTH_MESSAGE')}`,
      },
      responsible: {
        required: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_MANAGER_REQUIRED_MESSAGE'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_MANAGER_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_MANAGER_MAX_LENGTH_MESSAGE')}`,
      },
      subscriptionType: {
        required: this.translateService.instant('br_com_supermarket_PROVIDER_ERROR_FORM_SUBSCRIPTION_TYPE_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);

    this.provider = this.route.snapshot.data['provider'];
  }

  ngOnInit() {
    this.getAllSubscriptionTypesForSelect();
    this.providerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 50])])],
      subscriptionNumber: ['', Validators.compose([Validators.required, CpfCnpjValidators.cnpj])],
      stateRegistration: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 20])])],
      municipalRegistration: [null , Validators.compose([CustomValidators.rangeLength([2, 20])])],
      address: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 60])])],
      phone: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([8, 11])])],
      responsible: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 50])])],
      subscriptionType: [Validators.required]
    });
    this.fillForm();
  }

  ngAfterViewInit(): void {
    this.providerSubscriptionTypeForm().valueChanges.subscribe(() => {
      this.changeProviderSubscriptionTypeValidators();
      super.formConfigValidatorsBase(this.formInputElements, this.providerForm);
      super.validateForm(this.providerForm);
    });
    super.formConfigValidatorsBase(this.formInputElements, this.providerForm);
  }

  getAllSubscriptionTypesForSelect() {
    this.providerService.getAllSubscriptionTypes().subscribe((response) => {
      this.subscriptionTypes = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_PERSON_AN_ERROR_OCCURRED_WHILE_GET_EDUCATIONS'));
    });
  }

  fillForm() {
    this.providerForm.patchValue({
      id: this.provider?.id,
      name: this.provider?.name,
      subscriptionNumber: this.provider?.subscriptionNumber,
      stateRegistration: this.provider?.stateRegistration,
      municipalRegistration: this.provider?.municipalRegistration,
      address: this.provider?.address,
      phone: this.provider?.phone,
      responsible: this.provider?.responsible,
      subscriptionType: this.provider?.subscriptionType,
    });
    this.spinner.hide();
  }

  changeProviderSubscriptionTypeValidators() {
    if(this.providerSubscriptionTypeForm().value === 'CNPJ') {
      this.providerSubscriptionNumberForm().clearValidators();
      this.providerSubscriptionNumberForm().setValidators([Validators.required, CpfCnpjValidators.cnpj]);
    } else {
      this.providerSubscriptionNumberForm().clearValidators();
      this.providerSubscriptionNumberForm().setValidators([Validators.required, CpfCnpjValidators.cpf]);
    }
  }

  providerSubscriptionTypeForm(): AbstractControl {
    return this.providerForm.get('subscriptionType');
  }

  providerSubscriptionNumberForm(): AbstractControl {
    return this.providerForm.get('subscriptionNumber');
  }

  updateProvider() {
    super.normalizeFieldType(this.providerForm, 'subscriptionType', this.subscriptionTypes);
    if (this.providerForm.dirty && this.providerForm.valid) {
      this.spinner.show();
      this.provider = Object.assign({}, this.provider, this.providerForm.value);

      this.providerService.updateProvider(this.provider)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.providerForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_PROVIDER_UPDATE_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/provider/getAll'])
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

  documentMask(): string {
    if (this.providerForm.get('subscriptionType').value == "CPF") {
      return "000.000.000-00";
    } else if (this.providerForm.get('subscriptionType').value == "CNPJ") {
      return "00.000.000/0000-00";
    }
    return "";
  }
}
