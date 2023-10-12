import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadJobpositionComponent } from './read-jobposition.component';

describe('ReadJobpositionComponent', () => {
  let component: ReadJobpositionComponent;
  let fixture: ComponentFixture<ReadJobpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadJobpositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadJobpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
