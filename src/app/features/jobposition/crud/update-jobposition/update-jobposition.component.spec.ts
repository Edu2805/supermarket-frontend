import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobpositionComponent } from './update-jobposition.component';

describe('UpdateJobpositionComponent', () => {
  let component: UpdateJobpositionComponent;
  let fixture: ComponentFixture<UpdateJobpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateJobpositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateJobpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
