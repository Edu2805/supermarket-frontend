import { TestBed } from '@angular/core/testing';

import { JobPositionService } from './jobposition.service';

describe('JobpositionService', () => {
  let service: JobPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
