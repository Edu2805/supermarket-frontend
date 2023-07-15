import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductDataComponent } from './delete-product-data.component';

describe('DeleteProductDataComponent', () => {
  let component: DeleteProductDataComponent;
  let fixture: ComponentFixture<DeleteProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
