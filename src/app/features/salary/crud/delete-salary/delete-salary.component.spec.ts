import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalaryComponent } from './delete-salary.component';

describe('DeleteSalaryComponent', () => {
  let component: DeleteSalaryComponent;
  let fixture: ComponentFixture<DeleteSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
