import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubsectionComponent } from './details-subsection.component';

describe('DetailsSubsectionComponent', () => {
  let component: DetailsSubsectionComponent;
  let fixture: ComponentFixture<DetailsSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSubsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
