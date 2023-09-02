import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOtherDiscountComponent } from './update-other-discount.component';

describe('UpdateOtherDiscountComponent', () => {
  let component: UpdateOtherDiscountComponent;
  let fixture: ComponentFixture<UpdateOtherDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOtherDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOtherDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
