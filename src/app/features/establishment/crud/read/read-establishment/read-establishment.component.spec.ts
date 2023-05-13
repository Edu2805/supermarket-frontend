import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEstablishmentComponent } from './read-establishment.component';

describe('ReadEstablishmentComponent', () => {
  let component: ReadEstablishmentComponent;
  let fixture: ComponentFixture<ReadEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEstablishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
