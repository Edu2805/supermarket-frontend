import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoodsIssueComponent } from './create-goods-issue.component';

describe('CreateGoodsIssueComponent', () => {
  let component: CreateGoodsIssueComponent;
  let fixture: ComponentFixture<CreateGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGoodsIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
