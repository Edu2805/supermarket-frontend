import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentAppComponent } from './establishment.app.component';

describe('EstablishmentComponent', () => {
  let component: EstablishmentAppComponent;
  let fixture: ComponentFixture<EstablishmentAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstablishmentAppComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
