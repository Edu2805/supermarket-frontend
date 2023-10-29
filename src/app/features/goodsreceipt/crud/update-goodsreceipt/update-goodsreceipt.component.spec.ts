import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGoodsreceiptComponent } from './update-goodsreceipt.component';

describe('UpdateGoodsreceiptComponent', () => {
  let component: UpdateGoodsreceiptComponent;
  let fixture: ComponentFixture<UpdateGoodsreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGoodsreceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
