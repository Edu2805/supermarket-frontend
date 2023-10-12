import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobpositionComponent } from './create-jobposition.component';

describe('CreateJobpositionComponent', () => {
  let component: CreateJobpositionComponent;
  let fixture: ComponentFixture<CreateJobpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobpositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJobpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
