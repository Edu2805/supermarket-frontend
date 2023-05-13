import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEstablishmentComponent } from './delete-establishment.component';

describe('DeleteEstablishmentComponent', () => {
  let component: DeleteEstablishmentComponent;
  let fixture: ComponentFixture<DeleteEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteEstablishmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
