import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGoodsreceiptComponent } from './details-goodsreceipt.component';

describe('DetailsGoodsreceiptComponent', () => {
  let component: DetailsGoodsreceiptComponent;
  let fixture: ComponentFixture<DetailsGoodsreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGoodsreceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
