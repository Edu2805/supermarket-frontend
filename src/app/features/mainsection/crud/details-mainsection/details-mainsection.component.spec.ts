import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMainsectionComponent } from './details-mainsection.component';

describe('DetailsMainsectionComponent', () => {
  let component: DetailsMainsectionComponent;
  let fixture: ComponentFixture<DetailsMainsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMainsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
