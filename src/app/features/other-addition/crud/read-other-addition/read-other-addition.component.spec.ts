import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOtherAdditionComponent } from './read-other-addition.component';

describe('ReadOtherAdditionComponent', () => {
  let component: ReadOtherAdditionComponent;
  let fixture: ComponentFixture<ReadOtherAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadOtherAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadOtherAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
