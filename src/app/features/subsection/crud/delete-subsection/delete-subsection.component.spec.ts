import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubsectionComponent } from './delete-subsection.component';

describe('DeleteSubsectionComponent', () => {
  let component: DeleteSubsectionComponent;
  let fixture: ComponentFixture<DeleteSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSubsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
