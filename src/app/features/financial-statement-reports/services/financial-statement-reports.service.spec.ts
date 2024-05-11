import { TestBed } from '@angular/core/testing';

import { FinancialStatementReportsService } from './financial-statement-reports.service';

describe('FinancialStatementReportsService', () => {
  let service: FinancialStatementReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialStatementReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
