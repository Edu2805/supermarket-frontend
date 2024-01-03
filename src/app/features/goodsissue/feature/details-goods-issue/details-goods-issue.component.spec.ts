import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGoodsIssueComponent } from './details-goods-issue.component';

describe('DetailsGoodsIssueComponent', () => {
  let component: DetailsGoodsIssueComponent;
  let fixture: ComponentFixture<DetailsGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGoodsIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
