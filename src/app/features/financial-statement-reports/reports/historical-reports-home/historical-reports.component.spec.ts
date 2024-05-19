import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalReportsComponent } from './historical-reports.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { FinancialStatementReportsGuardService } from '../../services/financial-statement-reports.guard';

describe('HistoricalReportsComponent', () => {
  let component: HistoricalReportsComponent;
  let fixture: ComponentFixture<HistoricalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalReportsComponent ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        FinancialStatementReportsGuardService,
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

    fixture = TestBed.createComponent(HistoricalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
