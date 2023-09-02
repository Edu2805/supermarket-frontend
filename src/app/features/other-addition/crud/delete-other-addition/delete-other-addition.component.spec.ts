import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOtherAdditionComponent } from './delete-other-addition.component';

describe('DeleteOtherAdditionComponent', () => {
  let component: DeleteOtherAdditionComponent;
  let fixture: ComponentFixture<DeleteOtherAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOtherAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOtherAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
