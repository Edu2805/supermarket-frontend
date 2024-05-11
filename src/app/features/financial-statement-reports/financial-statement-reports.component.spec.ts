import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementReportsComponent } from './financial-statement-reports.component';

describe('FinancialStatementReportsComponent', () => {
  let component: FinancialStatementReportsComponent;
  let fixture: ComponentFixture<FinancialStatementReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialStatementReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialStatementReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
