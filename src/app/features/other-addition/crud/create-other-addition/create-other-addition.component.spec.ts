import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherAdditionComponent } from './create-other-addition.component';

describe('CreateOtherAdditionComponent', () => {
  let component: CreateOtherAdditionComponent;
  let fixture: ComponentFixture<CreateOtherAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtherAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOtherAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
