import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadGoodsreceiptComponent } from './read-goodsreceipt.component';

describe('ReadGoodsreceiptComponent', () => {
  let component: ReadGoodsreceiptComponent;
  let fixture: ComponentFixture<ReadGoodsreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadGoodsreceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadGoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
