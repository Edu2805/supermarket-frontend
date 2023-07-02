import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainsectionComponent } from './create-mainsection.component';

describe('CreateMainsectionComponent', () => {
  let component: CreateMainsectionComponent;
  let fixture: ComponentFixture<CreateMainsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMainsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
