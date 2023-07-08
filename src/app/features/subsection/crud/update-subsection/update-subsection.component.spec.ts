import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubsectionComponent } from './update-subsection.component';

describe('UpdateSubsectionComponent', () => {
  let component: UpdateSubsectionComponent;
  let fixture: ComponentFixture<UpdateSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
