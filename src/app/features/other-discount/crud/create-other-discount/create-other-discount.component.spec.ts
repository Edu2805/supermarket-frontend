import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherDiscountComponent } from './create-other-discount.component';

describe('CreateOtherDiscountComponent', () => {
  let component: CreateOtherDiscountComponent;
  let fixture: ComponentFixture<CreateOtherDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtherDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOtherDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
