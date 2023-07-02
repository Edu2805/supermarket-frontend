import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMainsectionComponent } from './read-mainsection.component';

describe('ReadMainsectionComponent', () => {
  let component: ReadMainsectionComponent;
  let fixture: ComponentFixture<ReadMainsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadMainsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
