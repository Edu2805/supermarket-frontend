import { TestBed } from '@angular/core/testing';

import { FinancialStatementReportsService } from './financial-statement-reports.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';

describe('FinancialStatementReportsService', () => {
  let service: FinancialStatementReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
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
    service = TestBed.inject(FinancialStatementReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
