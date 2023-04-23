import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../models/user-data';
import { AccountService } from '../services/account.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { CustomValidators } from '@narik/custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth-user';

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
    password: ''
  };
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, private router: Router) { 

      this.validationMessages = {
        userName: {
          required: 'Informe o usuário',
          userName: 'Usuário inválido'
        },
        password: {
          required: 'Informe a senha',
          rangeLength: 'A senha deve possuir entre 6 e 8 caracteres'
        },
        confirmPassword: {
          required: 'Informe novamente a senha',
          rangeLength: 'A senha deve possuir entre 6 e 8 caracteres',
          equalTo: 'As senhas não conferem'
        },
        role: {
          required: 'Informe o papel do usuário'
        }
      };

      this.genericValidator = new GenericValidator(this.validationMessages);
     }

  ngOnInit() {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 8])]);
    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 8])]);

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
    }
  }

  authenticate(user: UserData) {
    this.auth.login = user.userName;
    this.auth.password = user.password;
    this.accountService.login(this.auth)
      .subscribe(
        success => {
          this.processSuccessAuth(success);
        },
        fail => {this.processFail(fail)}
      )
  }

  processSuccessAccount(response: any) {
    this.registerForm.reset();
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataUser(response);
  }

  processSuccessAuth(response: any) {
    this.errors = [];
    this.accountService.LocalStorage.saveLocalDataToken(response);
    this.router.navigate(['/home']);
  }

  processFail(fail: any) {
    this.errors = fail.error.errors;
  }

}
