import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSubsectionComponent } from './read-subsection.component';

describe('ReadSubsectionComponent', () => {
  let component: ReadSubsectionComponent;
  let fixture: ComponentFixture<ReadSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSubsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
