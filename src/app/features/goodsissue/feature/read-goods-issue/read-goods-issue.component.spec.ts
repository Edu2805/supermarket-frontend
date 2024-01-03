import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadGoodsIssueComponent } from './read-goods-issue.component';

describe('ReadGoodsIssueComponent', () => {
  let component: ReadGoodsIssueComponent;
  let fixture: ComponentFixture<ReadGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadGoodsIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
