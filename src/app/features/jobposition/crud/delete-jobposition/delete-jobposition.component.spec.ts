import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJobpositionComponent } from './delete-jobposition.component';

describe('DeleteJobpositionComponent', () => {
  let component: DeleteJobpositionComponent;
  let fixture: ComponentFixture<DeleteJobpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteJobpositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteJobpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
