import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AccountService } from '../services/account.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { 
  DEFAULT_LANGUAGE, 
  TranslateModule, 
  TranslateService, 
  USE_DEFAULT_LANG, 
  USE_EXTEND, 
  USE_STORE 
} from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let postSpy: jasmine.Spy;
  let accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        AccountService,
        HttpClient, 
        HttpHandler,
        ToastrService,
        TranslateService,
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    accountService = TestBed.get(AccountService);
    postSpy = spyOn(accountService, 'login');
  });

  const USER_TOKEN = {
    login: 'test@teste.com',
    token: 'abc123'
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully when login is correct', async() => {
    const loginForm: FormGroup = component.loginForm;
    loginForm.get('login').setValue('test@teste.com');
    loginForm.get('password').setValue('123456');
    loginForm.markAsDirty();
    loginForm.valid;

    postSpy.and.callFake((options: any) => {
      expect(options.login).toEqual('test@teste.com');
      expect(options.password).toEqual('123456');
      return of(USER_TOKEN);
    });
    
    const toastrService = TestBed.get(ToastrService);

    const showSuccess = spyOn(toastrService, 'success').and.callFake((message: string, title: string) => {
      expect(message).toBe('br_com_supermarket_LOGIN_SUCCESSFUL');
    })

    fixture.detectChanges();
    component.login();

    expect(postSpy).toHaveBeenCalled();
    expect(showSuccess).toHaveBeenCalled();
  });

  it('should not login successfully when login is not correct', () => {
    const loginForm: FormGroup = component.loginForm;
    loginForm.get('login').setValue('test@teste.com');
    loginForm.get('password').setValue('123456');
    loginForm.markAsDirty();
    loginForm.valid;

    const errors = {
      error: {
        errors: [
          'Teste'
        ]
      }
    }

    postSpy.and.returnValue(throwError(errors));

    const toastrService = TestBed.get(ToastrService);

    const showError = spyOn(toastrService, 'error').and.callFake((message: string, title: string) => {
      expect(message).toBe('br_com_supermarket_LOGIN_AN_ERROR_OCCURRED_WHILE_LOGGING_IN');
    })
    component.login();
    fixture.detectChanges();

    expect(postSpy).toHaveBeenCalled();
    expect(showError).toHaveBeenCalled();
  });
});
