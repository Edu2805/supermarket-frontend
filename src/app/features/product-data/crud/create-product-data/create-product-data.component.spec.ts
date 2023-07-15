import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductDataComponent } from './create-product-data.component';

describe('CreateProductDataComponent', () => {
  let component: CreateProductDataComponent;
  let fixture: ComponentFixture<CreateProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
