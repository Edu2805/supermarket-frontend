import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGoodsreceiptComponent } from './delete-goodsreceipt.component';

describe('DeleteGoodsreceiptComponent', () => {
  let component: DeleteGoodsreceiptComponent;
  let fixture: ComponentFixture<DeleteGoodsreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGoodsreceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
