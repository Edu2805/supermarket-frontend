import { TestBed } from '@angular/core/testing';

import { GoodsissueService } from './goodsissue.service';

describe('GoodsissueService', () => {
  let service: GoodsissueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsissueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
