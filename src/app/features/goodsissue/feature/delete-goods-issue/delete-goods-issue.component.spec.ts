import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGoodsIssueComponent } from './delete-goods-issue.component';

describe('DeleteGoodsIssueComponent', () => {
  let component: DeleteGoodsIssueComponent;
  let fixture: ComponentFixture<DeleteGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGoodsIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
