import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsReportsComponent } from './results-reports.component';

describe('ResultsReportsComponent', () => {
  let component: ResultsReportsComponent;
  let fixture: ComponentFixture<ResultsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
