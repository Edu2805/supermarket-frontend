import { TestBed } from '@angular/core/testing';

import { EstablishmentService } from './establishment.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DEFAULT_LANGUAGE, MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateParser, TranslateService, TranslateStore, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE } from '@ngx-translate/core';

describe('EstablishmentService', () => {
  let service: EstablishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        EstablishmentService,
        HttpClient,
        HttpHandler,
        TranslateService,
        TranslateStore,
        TranslateLoader,
        TranslateCompiler,
        TranslateParser,
        MissingTranslationHandler 
      ]
    });
    service = TestBed.inject(EstablishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
