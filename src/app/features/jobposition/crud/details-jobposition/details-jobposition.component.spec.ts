import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsJobpositionComponent } from './details-jobposition.component';

describe('DetailsJobpositionComponent', () => {
  let component: DetailsJobpositionComponent;
  let fixture: ComponentFixture<DetailsJobpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsJobpositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsJobpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
