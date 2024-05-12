import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementHomeComponent } from './financial-statement-home.component';
import { DEFAULT_LANGUAGE, TranslateModule, TranslateService, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE } from '@ngx-translate/core';

describe('FinancialStatementHomeComponent', () => {
  let component: FinancialStatementHomeComponent;
  let fixture: ComponentFixture<FinancialStatementHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialStatementHomeComponent ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        TranslateService 
      ],
      imports: [ 
        TranslateModule.forRoot(), 
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialStatementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
