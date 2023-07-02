import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMainsectionComponent } from './update-mainsection.component';

describe('UpdateMainsectionComponent', () => {
  let component: UpdateMainsectionComponent;
  let fixture: ComponentFixture<UpdateMainsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMainsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
