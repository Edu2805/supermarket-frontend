import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { 
  DEFAULT_LANGUAGE, 
  MissingTranslationHandler, 
  TranslateCompiler, 
  TranslateLoader, 
  TranslateModule, 
  TranslateParser, 
  TranslateService, 
  TranslateStore, 
  USE_DEFAULT_LANG, USE_EXTEND, USE_STORE 
} from '@ngx-translate/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
