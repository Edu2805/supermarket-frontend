import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { Person } from '../../model/person';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { UserData } from 'src/app/features/account/models/user-data';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { PersonService } from '../../services/person.service';
import { AccountService } from 'src/app/features/account/services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AttachmentService } from 'src/app/features/attachment/services/attachment.service';
import { CpfCnpjValidators } from 'src/app/utils/document-validators-form';
import { DateValidationForm } from 'src/app/utils/date-validation-form';
import { EmailValidationForm } from 'src/app/utils/email-validation-form';
import { Observable, fromEvent, merge } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScholarityType } from '../../model/scholarity-type';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  personForm: FormGroup;
  person: Person;
  localStorageUtils = new LocalStorageUtils();
  validateDocument: any;
  formResult: string= '';
  usersData: UserData[];
  educations: ScholarityType[];
  attatchment: Attachment = {
    id: null,
    name: null,
    type: null,
    imageData: null
  };
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';
  
  constructor(private fb: FormBuilder,
    private personService: PersonService,
    private accountService: AccountService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private attatchmentService: AttachmentService) {

    super(toastr, translateService);

    this.validationMessages = {
      firstName: {
        required: this.translateService.instant('br_com_supermarket_PERSON_FIRST_NAME_REQUIRED_PLACEHOLDER'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FIRST_NAME_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FIRST_NAME_MAX_LENGTH_MESSAGE')}`,
      },
      middleName: {
        rangeLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_MIDDLE_NAME_MAX_LENGTH_MESSAGE'),
      },
      lastName: {
        required: this.translateService.instant('br_com_supermarket_PERSON_LAST_NAME_REQUIRED_PLACEHOLDER'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_LAST_NAME_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FLAST_NAME_MAX_LENGTH_MESSAGE')}`,
      },
      cpf: {
        required: this.translateService.instant('br_com_supermarket_PERSON_CPF_REQUIRED_PLACEHOLDER'),
        cpfInvalido: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_INVALID_CPF_MESSAGE'),
      },
      nationality: {
        rangeLength: `${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATIONNALITY_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATIONNALITY_MAX_LENGTH_MESSAGE')}`,
      },
      naturalness: {
        rangeLength: `${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATURALNESS_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATURALNESS_MAX_LENGTH_MESSAGE')}`,
      },
      birthDate: {
        required: this.translateService.instant('br_com_supermarket_PERSON_BIRTH_DATE_REQUIRED_PLACEHOLDER'),
        invalidDate: this.translateService.instant('br_com_supermarket_PERSON_INVALID_BIRTH_DATE'),
      },
      motherName: {
        required: this.translateService.instant('br_com_supermarket_PERSON_MOTHER_NAME_REQUIRED_PLACEHOLDER'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_MOTHER_NAME_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_MOTHER_NAME_MAX_LENGTH_MESSAGE')}`,
      },
      fatherName: {
        rangeLength: `${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FATHER_NAME_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FATHER_NAME_MAX_LENGTH_MESSAGE')}`,
      },
      email: {
        required: this.translateService.instant('br_com_supermarket_PERSON_EMAIL_REQUIRED_PLACEHOLDER'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_EMAIL_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_EMAIL_MAX_LENGTH_MESSAGE')}`,
        invalidEmail: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_INVALID_EMAIL'),
      },
      id: {
        required: this.translateService.instant('br_com_supermarket_PERSON_USER_OPTIONAL_PLACEHOLDER'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
    this.person = this.route.snapshot.data['person'];
  }

  ngOnInit() {
    this.getUsers();
    this.getAllEducationsSelect();

    this.personForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 30])])],
      middleName: ['', Validators.compose([CustomValidators.rangeLength([0, 30])])],
      lastName: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 30])])],
      cpf: ['', Validators.compose([Validators.required, CpfCnpjValidators.cpf])],
      rg: [null],
      nationality: ['', Validators.compose([CustomValidators.rangeLength([2, 30])])],
      naturalness: ['', Validators.compose([CustomValidators.rangeLength([2, 30])])],
      birthDate: ['', Validators.compose([Validators.required, DateValidationForm.date])],
      scholarity: [''],
      dependents: [''],
      fatherName: ['', Validators.compose([CustomValidators.rangeLength([2, 50])])],
      motherName: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 50])])],
      email: ['', Validators.compose([Validators.required, EmailValidationForm.email])],
      userData: this.fb.group({
        id: ['', Validators.required]
      }),
      personPhoto: [null]
    });
    this.fillForm();
  }

  fillForm() {
    this.personForm.patchValue({
      firstName: this.person?.firstName,
      middleName: this.person?.middleName,
      lastName: this.person?.lastName,
      cpf: this.person?.cpf,
      rg: this.person?.rg,
      nationality: this.person?.nationality,
      naturalness: this.person?.naturalness,
      birthDate: this.convertDateBackend(this.person?.birthDate),
      scholarity: this.person?.scholarity,
      dependents: this.person?.dependents,
      fatherName: this.person?.fatherName,
      motherName: this.person?.motherName,
      email: this.person?.email,
      userData: this.person?.userData,
      personPhoto: this.person?.personPhoto,
    });
  }

  getUsers() {
    this.accountService.getAllUsersIsNotEmployee().subscribe((response) => {
      this.usersData = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_PERSON_AN_ERROR_OCCURRED_WHILE_GET_USER_IS_NOT_EMPLOYEE'));
    });
  }

  getAllEducationsSelect() {
    this.personService.getAllEducations().subscribe((response) => {
      this.educations = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_PERSON_AN_ERROR_OCCURRED_WHILE_GET_EDUCATIONS'));
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.personForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.personForm);
  }

  updatePerson() {
    super.normalizeFieldType(this.personForm, 'scholarity', this.educations);
    if (!this.detectChangesFieldsControlWithImage(this.personForm)) {

      this.spinner.show();
      this.person = Object.assign({}, this.person, this.personForm.value);
      this.setImage(this.imageName, this.imageType, this.croppedImageData);
      this.person.birthDate = this.convertDateFrontend(this.personForm.get('birthDate').value);

      this.personService.updatePerson(this.person)
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
      this.person.personPhoto = this.attatchment;
    }
  }

  processSuccess(response: any) {
    this.personForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_PERSON_EDIT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/person/getAll'])
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

  convertDateFrontend(date: string): string {
    const day = date?.substr(0, 2);
    const month = date?.substr(2, 2);
    const year = date?.substr(4, 4);
    return `${year}-${month}-${day}`;
  }

  convertDateBackend(date: string): string {
    const dateOnlyNumber = date?.replace(/[^0-9]/g, '');
    const year = dateOnlyNumber?.substr(0, 4);
    const month = dateOnlyNumber?.substr(4, 2);
    const day = dateOnlyNumber?.substr(6, 2);
    return `${day}${month}${year}`;
  }
}
