import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAppComponent } from './department.app.component';

describe('DepartmentComponent', () => {
  let component: DepartmentAppComponent;
  let fixture: ComponentFixture<DepartmentAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
