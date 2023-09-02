import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDiscountComponent } from './other-discount.component';

describe('OtherDiscountComponent', () => {
  let component: OtherDiscountComponent;
  let fixture: ComponentFixture<OtherDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
