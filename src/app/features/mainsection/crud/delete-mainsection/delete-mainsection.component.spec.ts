import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMainsectionComponent } from './delete-mainsection.component';

describe('DeleteMainsectionComponent', () => {
  let component: DeleteMainsectionComponent;
  let fixture: ComponentFixture<DeleteMainsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMainsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
