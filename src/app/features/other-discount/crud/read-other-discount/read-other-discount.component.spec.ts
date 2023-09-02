import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOtherDiscountComponent } from './read-other-discount.component';

describe('ReadOtherDiscountComponent', () => {
  let component: ReadOtherDiscountComponent;
  let fixture: ComponentFixture<ReadOtherDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOtherDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadOtherDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
