import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../models/user-data';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { CustomValidators } from '@narik/custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth-user';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { EmailValidationForm } from 'src/app/utils/email-validation-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];
  registerForm: FormGroup;
  user: UserData;
  auth: AuthUser = {
    login: '',
    password: '',
    role: ''
  };
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  roles: string[];
  localStorageUtils = new LocalStorageUtils();

  unsaveChanges: boolean;

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, private router: Router, 
    private toastr: ToastrService,
    private translateService: TranslateService,
    private spinner: NgxSpinnerService) { 

      this.validationMessages = {
        login: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_USER'),
          invalidEmail: this.translateService.instant('br_com_supermarket_INVALID_USER'),
        },
        password: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_PASSWORD'),
          rangeLength: this.translateService.instant('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8')
        },
        confirmPassword: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_PASSWORD_AGAIN'),
          rangeLength: this.translateService.instant('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8'),
          equalTo: this.translateService.instant('br_com_supermarket_PASSWORD_DONOT_MATCH')
        },
        role: {
          required: this.translateService.instant('br_com_supermarket_ENTER_USE_ROLE')
        }
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
     }

  ngOnInit() {
    this.localStorageUtils = new LocalStorageUtils();
    this.getAllRolesSelect();
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 8])]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password), CustomValidators.rangeLength([6, 8])]);

    this.registerForm = this.fb.group({
      login: ['', Validators.compose([Validators.required, EmailValidationForm.email])],
      password: password,
      confirmPassword: confirmPassword,
      role: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.proccessMenssage(this.registerForm);
      this.unsaveChanges = true;
    })

  }

  addAccount() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.spinner.show();
      this.user = Object.assign({}, this.user, this.registerForm.value);

      this.accountService.registerUser(this.user)
        .subscribe(
          success => {
            this.processSuccessAccount(success);
          },
          fail => {this.processFail(fail)}
        );
        this.unsaveChanges = false;
    }
  }

  processSuccessAccount(response: any) {
    this.errors = [];
    this.registerForm.reset();
    this.toastr.success(this.translateService.instant('br_com_supermarket_REGISTER_SUCCESSFUL'), 
      '', {timeOut: 0, extendedTimeOut: 0, closeButton: true, tapToDismiss: false});
    this.spinner.hide();
    this.router.navigate(['/account/login']);
  }

  processFail(fail: any) {
    this.spinner.hide();
    if (fail && fail.error && fail.error.errors) {
      fail.error.errors.forEach(error => {
        this.toastr.error(this.translateService.instant(error));
      });
      return;
    }
    this.toastr.error(this.translateService.instant('br_com_supermarket_AN_ERROR_OCCURRED_WHILE_REGISTERING'));
  }

  getAllRolesSelect() {
    this.accountService.getAllRoles().subscribe((response) => {
      this.roles = response.names;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_AN_ERROR_OCCURRED_WHILE_GET_ROLES'));
    });
  }

}
