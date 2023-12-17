import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalGoodsReceiptComponent } from './historical-goods-receipt.component';

describe('HistoricalGoodsReceiptComponent', () => {
  let component: HistoricalGoodsReceiptComponent;
  let fixture: ComponentFixture<HistoricalGoodsReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalGoodsReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalGoodsReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
