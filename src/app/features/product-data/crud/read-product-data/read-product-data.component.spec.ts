import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProductDataComponent } from './read-product-data.component';

describe('ReadProductDataComponent', () => {
  let component: ReadProductDataComponent;
  let fixture: ComponentFixture<ReadProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadProductDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
