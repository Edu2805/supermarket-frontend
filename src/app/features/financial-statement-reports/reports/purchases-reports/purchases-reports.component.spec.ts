import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesReportsComponent } from './purchases-reports.component';

describe('PurchasesReportsComponent', () => {
  let component: PurchasesReportsComponent;
  let fixture: ComponentFixture<PurchasesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
