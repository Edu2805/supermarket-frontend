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

  unsaveChanges: boolean;

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, private router: Router, 
    private toastr: ToastrService,
    private translateService: TranslateService) { 

      this.validationMessages = {
        userName: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_USER'),
          userName: this.translateService.instant('br_com_supermarket_INVALID_USER'),
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
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 8])]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password), CustomValidators.rangeLength([6, 8])]);

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
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
    this.auth.login = user.userName;
    this.auth.password = user.password;
    this.accountService.login(this.auth)
      .subscribe(
        success => {
          this.processSuccessAuth(success, user.userName, user.role);
        },
        fail => {this.processFail(fail)}
      )
  }

  processSuccessAccount(response: any) {
    this.registerForm.reset();
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataUser(response);
  }

  processSuccessAuth(response: any, user: any, role: any) {
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataToken(response);

    let toast = this.toastr.success(this.translateService.instant('br_com_supermarket_REGISTER_SUCCESSFUL'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      })
    }
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error(this.translateService.instant('br_com_supermarket_AN_ERROR_OCCURRED_WHILE_REGISTERING'));
  }

}
