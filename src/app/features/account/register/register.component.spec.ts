import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { 
  DEFAULT_LANGUAGE, 
  TranslateModule, 
  TranslateService, 
  USE_DEFAULT_LANG, USE_EXTEND, USE_STORE 
} from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerSpy: jasmine.Spy;
  let loginSpy: jasmine.Spy;
  let accountService: AccountService;

  let toastrService: ToastrService
  let showSuccess: jasmine.Spy;
  let showError: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        FormBuilder, 
        AccountService, 
        HttpClient, 
        HttpHandler,
        ToastrService,
        TranslateService,

      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'account/login', component: DummyComponent }
        ]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    accountService = TestBed.get(AccountService);
    registerSpy = spyOn(accountService, 'registerUser');
    loginSpy = spyOn(accountService, 'login');

    toastrService = TestBed.get(ToastrService);
    showSuccess = spyOn(toastrService, 'success');
    showError = spyOn(toastrService, 'error');
  });

  const REGISTER_USER = {
    login: 'test@teste.com',
    password: '123456',
    confirmPassword: '123456',
    role: 'ADMIN'
  }

  const USER_TOKEN = {
    login: 'test@teste.com',
    token: 'abc123'
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register successfully', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('123456');
    registerForm.get('role').setValue('ADMIN');
    registerForm.markAsDirty();
    registerForm.valid;

    registerSpy.and.callFake((options: any) => {
      expect(options.login).toEqual('test@teste.com');
      expect(options.password).toEqual('123456');
      expect(options.confirmPassword).toEqual('123456');
      expect(options.role).toEqual('ADMIN');
      return of(REGISTER_USER);
    });
    
    fixture.detectChanges();
    component.addAccount();

    expect(registerSpy).toHaveBeenCalled();
    expect(showSuccess).toHaveBeenCalledWith('br_com_supermarket_REGISTER_SUCCESSFUL', '', 
      Object({ timeOut: 0, extendedTimeOut: 0, closeButton: true, tapToDismiss: false }));
  });

  it('should not register user when there is an error in registration', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('123456');
    registerForm.get('role').setValue('ADMIN');
    registerForm.markAsDirty();
    registerForm.valid;

    const errors = {
      error: {
        errors: [
          'Teste'
        ]
      }
    }

    registerSpy.and.returnValue(throwError(errors));
    
    fixture.detectChanges();
    component.addAccount();

    expect(registerSpy).toHaveBeenCalled();
    expect(errors.error.errors).toEqual(['Teste']);
  });

  it('should not authenticate user when there is an error in authentication proccess', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('123456');
    registerForm.get('role').setValue('ADMIN');
    registerForm.markAsDirty();
    registerForm.valid;

    const errors = {
      error: {
        errors: [
          'br_com_supermarket_AN_ERROR_OCCURRED_WHILE_REGISTERING'
        ]
      }
    }

    registerSpy.and.returnValue(throwError(errors));
    
    fixture.detectChanges();
    component.addAccount();

    expect(registerSpy).toHaveBeenCalled();
    expect(errors.error.errors).toEqual(['br_com_supermarket_AN_ERROR_OCCURRED_WHILE_REGISTERING']);
  });

  it('should required user', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('123456');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('login').valid).toEqual(false);
    expect(component.validationMessages.login.required).toEqual('br_com_supermarket_INFORM_THE_USER');
  });

  it('should invalidate the form when login is incorrect', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('/*&!s');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('123456');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('login').valid).toEqual(false);
    expect(component.validationMessages.login.invalidEmail).toEqual('br_com_supermarket_INVALID_USER');
  });

  it('should required password', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('');
    registerForm.get('confirmPassword').setValue('');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('password').valid).toEqual(false);
    expect(component.validationMessages.password.required).toEqual('br_com_supermarket_INFORM_THE_PASSWORD');
  });

  it('should invalidate password when rangeLength is less than 6 characters', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('1');
    registerForm.get('confirmPassword').setValue('1');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('password').valid).toEqual(false);
    expect(component.validationMessages.password.rangeLength).toEqual('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8');
  });

  it('should invalidate password when rangeLength is greater than 8 characters', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456789');
    registerForm.get('confirmPassword').setValue('123456789');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('password').valid).toEqual(false);
    expect(component.validationMessages.password.rangeLength).toEqual('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8');
  });

  it('should required confirmPassword', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('confirmPassword').valid).toEqual(false);
    expect(component.validationMessages.confirmPassword.required).toEqual('br_com_supermarket_INFORM_THE_PASSWORD_AGAIN');
  });

  it('should invalidate confirmPassword when rangeLength is less than 6 characters', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('1');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('confirmPassword').valid).toEqual(false);
    expect(component.validationMessages.confirmPassword.rangeLength).toEqual('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8');
  });

  it('should invalidate confirmPassword when rangeLength is greater than 8 characters', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('123456789');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('confirmPassword').valid).toEqual(false);
    expect(component.validationMessages.confirmPassword.rangeLength).toEqual('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8');
  });

  it('should invalidate when password is different of confirmPassword', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('1234567');
    registerForm.get('role').setValue('ADMIN');
    
    component.ngAfterViewInit();

    expect(registerForm.get('confirmPassword').valid).toEqual(false);
    expect(component.validationMessages.confirmPassword.equalTo).toEqual('br_com_supermarket_PASSWORD_DONOT_MATCH');
  });

  it('should required role', () => {
    const registerForm: FormGroup = component.registerForm;
    registerForm.get('login').setValue('test@teste.com');
    registerForm.get('password').setValue('123456');
    registerForm.get('confirmPassword').setValue('1234567');
    registerForm.get('role').setValue('');
    
    component.ngAfterViewInit();

    expect(registerForm.get('role').valid).toEqual(false);
    expect(component.validationMessages.role.required).toEqual('br_com_supermarket_ENTER_USE_ROLE');
  });
});

@Component({
  template: ''
})
class DummyComponent { }
