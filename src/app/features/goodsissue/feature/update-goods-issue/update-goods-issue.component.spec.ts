import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGoodsIssueComponent } from './update-goods-issue.component';

describe('UpdateGoodsIssueComponent', () => {
  let component: UpdateGoodsIssueComponent;
  let fixture: ComponentFixture<UpdateGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGoodsIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
