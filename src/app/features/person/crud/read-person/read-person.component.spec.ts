import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPersonComponent } from './read-person.component';

describe('ReadPersonComponent', () => {
  let component: ReadPersonComponent;
  let fixture: ComponentFixture<ReadPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
