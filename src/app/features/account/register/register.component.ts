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

  unsaveChanges: boolean;

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, private router: Router, 
    private toastr: ToastrService,
    private translateService: TranslateService,
    private spinner: NgxSpinnerService) { 

      this.validationMessages = {
        login: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_USER'),
          login: this.translateService.instant('br_com_supermarket_INVALID_USER'),
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
    this.getAllRolesSelect();
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 8])]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password), CustomValidators.rangeLength([6, 8])]);

    this.registerForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
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
            this.authenticate(this.user);
          },
          fail => {this.processFail(fail)}
        );
        this.unsaveChanges = false;
    }
  }

  authenticate(user: UserData) {
    this.auth.login = user.login;
    this.auth.password = user.password;
    this.auth.role = user.role;
    this.accountService.login(this.auth)
      .subscribe(
        success => {
          this.processSuccessAuth(success, user.login, user.role);
        },
        fail => {this.processFail(fail)}
      )
  }

  processSuccessAccount(response: any) {
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataUser(response);

  }

  processSuccessAuth(response: any, user: any, role: any) {
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataToken(response);
    this.registerForm.reset();

    let toast = this.toastr.success(this.translateService.instant('br_com_supermarket_REGISTER_SUCCESSFUL'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/home']);
      })
    }
    
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
