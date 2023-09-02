import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAdditionComponent } from './other-addition.component';

describe('OtherAdditionComponent', () => {
  let component: OtherAdditionComponent;
  let fixture: ComponentFixture<OtherAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
