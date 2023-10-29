import { TestBed } from '@angular/core/testing';

import { GoodsreceiptService } from './goodsreceipt.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler } from '@ngx-translate/core';

describe('GoodsreceiptService', () => {
  let service: GoodsreceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        GoodsreceiptService,
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
    service = TestBed.inject(GoodsreceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
