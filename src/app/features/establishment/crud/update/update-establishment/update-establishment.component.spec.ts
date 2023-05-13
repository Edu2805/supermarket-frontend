import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEstablishmentComponent } from './update-establishment.component';

describe('UpdateEstablishmentComponent', () => {
  let component: UpdateEstablishmentComponent;
  let fixture: ComponentFixture<UpdateEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEstablishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
