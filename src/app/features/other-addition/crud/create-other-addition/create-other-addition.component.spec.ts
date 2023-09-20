import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherAdditionComponent } from './create-other-addition.component';
import { DEFAULT_LANGUAGE, MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser, TranslateService, TranslateStore, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE } from '@ngx-translate/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SharedDataService } from 'src/app/features/salary/services/shared-data.service';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('CreateOtherAdditionComponent', () => {
  let component: CreateOtherAdditionComponent;
  let fixture: ComponentFixture<CreateOtherAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOtherAdditionComponent],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        SharedDataService,
        HttpClient, 
        HttpHandler,
        TranslateService,
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOtherAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
