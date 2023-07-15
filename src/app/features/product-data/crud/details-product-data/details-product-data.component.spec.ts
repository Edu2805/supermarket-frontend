import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProductDataComponent } from './details-product-data.component';

describe('DetailsProductDataComponent', () => {
  let component: DetailsProductDataComponent;
  let fixture: ComponentFixture<DetailsProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProductDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
