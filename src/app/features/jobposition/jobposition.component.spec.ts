import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpositionComponent } from './jobposition.component';

describe('JobpositionComponent', () => {
  let component: JobpositionComponent;
  let fixture: ComponentFixture<JobpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobpositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
