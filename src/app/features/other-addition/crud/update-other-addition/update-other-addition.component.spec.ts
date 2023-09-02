import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOtherAdditionComponent } from './update-other-addition.component';

describe('UpdateOtherAdditionComponent', () => {
  let component: UpdateOtherAdditionComponent;
  let fixture: ComponentFixture<UpdateOtherAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOtherAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOtherAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
