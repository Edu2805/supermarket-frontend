import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { CustomValidators } from '@narik/custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth-user';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserNameData } from '../models/username-data';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  auth: AuthUser = {
    login: '',
    password: '',
    role: ''
  };
  userName: UserNameData = {
    userName: ''
  }
  roles: string[];
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, private router: Router, 
    private toastr: ToastrService,
    private translateService: TranslateService) { 

      this.validationMessages = {
        login: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_USER'),
          userName: this.translateService.instant('br_com_supermarket_INVALID_USER'),
        },
        password: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_PASSWORD'),
          rangeLength: this.translateService.instant('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8')
        },
        role: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_ROLE'),
        }
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
     }

  ngOnInit() {
    this.getAllRolesSelect();
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 8])]],
      role: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.proccessMenssage(this.loginForm);
    })

  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.auth = Object.assign({}, this.auth, this.loginForm.value);

      this.userName.userName = this.auth.login;
      this.accountService.login(this.auth)
        .subscribe(
          success => {
            console.log(success);
            
            this.processSuccessLogin(success);
            this.getUserRole(this.userName);
          },
          fail => {this.processFail(fail)}
        );
    }
  }

  processSuccessLogin(response: any) {
    this.loginForm.reset();
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataUser(response);
    this.accountService.LocalStorage.saveLocalDataToken(response);

    let toast = this.toastr.success(this.translateService.instant('br_com_supermarket_LOGIN_SUCCESSFUL'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      })
    }
  }

  getUserRole(user: UserNameData) {
    this.accountService.getUserRole(user).subscribe(response => {
      this.accountService.LocalStorage.addRole(response.role)
    }, (error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_LOGIN_AN_ERROR_OCCURRED_WHILE_LOGGING_IN'));
    });
  }

  getAllRolesSelect() {
    this.accountService.getAllRoles().subscribe((response) => {
      this.roles = response.names;
      console.log(this.roles);
      
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_AN_ERROR_OCCURRED_WHILE_GET_ROLES'));
    });
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error(this.translateService.instant('br_com_supermarket_LOGIN_AN_ERROR_OCCURRED_WHILE_LOGGING_IN'));
  }

}
