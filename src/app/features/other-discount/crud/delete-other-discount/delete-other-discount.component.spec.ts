import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOtherDiscountComponent } from './delete-other-discount.component';

describe('DeleteOtherDiscountComponent', () => {
  let component: DeleteOtherDiscountComponent;
  let fixture: ComponentFixture<DeleteOtherDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOtherDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOtherDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
