import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalGoodsIssueComponent } from './historical-goods-issue.component';

describe('HistoricalGoodsIssueComponent', () => {
  let component: HistoricalGoodsIssueComponent;
  let fixture: ComponentFixture<HistoricalGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalGoodsIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
