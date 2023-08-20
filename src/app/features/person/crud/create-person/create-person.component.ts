import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { Person } from '../../model/person';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Attachment } from 'src/app/features/attachment/model/attachment-data';
import { UserData } from 'src/app/features/account/models/user-data';
import { PersonService } from '../../services/person.service';
import { AccountService } from 'src/app/features/account/services/account.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AttachmentService } from 'src/app/features/attachment/services/attachment.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { CpfCnpjValidators } from 'src/app/utils/document-validators-form';
import { EmailValidationForm } from 'src/app/utils/email-validation-form';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  personForm: FormGroup;
  person: Person;
  localStorageUtils = new LocalStorageUtils();
  validateDocument: any;
  formResult: string= '';
  usersData: UserData[];
  educations: string[];
  attatchment: Attachment = {
    id: '',
    name: '',
    type: '',
    imageData: ''
  };
  
  constructor(private fb: FormBuilder,
    private personService: PersonService,
    private accountService: AccountService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private attatchmentService: AttachmentService) {

    super(toastr, translateService);

    this.validationMessages = {
      firstName: {
        required: this.translateService.instant('br_com_supermarket_PERSON_FIRST_NAME_REQUIRED_PLACEHOLDER'),
        minLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FIRST_NAME_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FIRST_NAME_MAX_LENGTH_MESSAGE'),
      },
      middleName: {
        minLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_MIDDLE_NAME_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_MIDDLE_NAME_MAX_LENGTH_MESSAGE'),
      },
      lastName: {
        required: this.translateService.instant('br_com_supermarket_PERSON_LAST_NAME_REQUIRED_PLACEHOLDER'),
        minLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_LAST_NAME_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_FLAST_NAME_MAX_LENGTH_MESSAGE'),
      },
      cpf: {
        required: this.translateService.instant('br_com_supermarket_PERSON_CPF_REQUIRED_PLACEHOLDER'),
        cpfInvalido: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_INVALID_CPF_MESSAGE'),
      },
      nationality: {
        minLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATIONNALITY_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATIONNALITY_MAX_LENGTH_MESSAGE'),
      },
      naturalness: {
        minLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATURALNESS_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_NATURALNESS_MAX_LENGTH_MESSAGE'),
      },
      birthDate: {
        required: this.translateService.instant('br_com_supermarket_PERSON_BIRTH_DATE_REQUIRED_PLACEHOLDER'),
      },
      motherName: {
        required: this.translateService.instant('br_com_supermarket_PERSON_MOTHER_NAME_REQUIRED_PLACEHOLDER'),
        minLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_MOTHER_NAME_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_MOTHER_NAME_MAX_LENGTH_MESSAGE'),
      },
      email: {
        required: this.translateService.instant('br_com_supermarket_PERSON_EMAIL_REQUIRED_PLACEHOLDER'),
        minLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_EMAIL_MIN_LENGTH_MESSAGE'),
        maxLength: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_EMAIL_MAX_LENGTH_MESSAGE'),
        invalidEmail: this.translateService.instant('br_com_supermarket_PERSON_ERROR_FORM_INVALID_EMAIL'),
      },
      id: {
        required: this.translateService.instant('br_com_supermarket_PERSON_USER_OPTIONAL_PLACEHOLDER'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
  }

  ngOnInit() {
    this.getUsers();
    this.getAllEducationsSelect();

    this.personForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      middleName: ['', Validators.maxLength(30)],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
      cpf: ['', Validators.compose([Validators.required, CpfCnpjValidators.cpf])],
      rg: [null],
      nationality: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30)])],
      naturalness: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(30)])],
      birthDate: ['', Validators.required],
      scholarity: [''],
      dependents: [''],
      fatherName: [null],
      motherName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, EmailValidationForm.email])],
      userData: this.fb.group({
        id: ['', Validators.required]
      }),
      productPhoto: [null]
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
      this.educations = response.names;
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

  addPerson() {
    
    if (this.personForm.dirty && this.personForm.valid) {

      this.spinner.show();
      this.person = Object.assign({}, this.person, this.personForm.value);
      this.attatchment.name = this.imageName;
      this.attatchment.type = this.imageType;
      this.attatchment.imageData = this.croppedImageData;

      this.person.birthDate = this.convertDate(this.personForm.get('birthDate').value);
      this.person.personPhoto = this.attatchment;
      
      this.personService.newPerson(this.person)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.personForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_PERSON_NEW_SUCCESS'), 
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

  convertDate(date: string): string {
    const day = date.substr(0, 2);
    const month = date.substr(2, 2);
    const year = date.substr(4, 4);
    return `${year}-${month}-${day}`;
  }
}
