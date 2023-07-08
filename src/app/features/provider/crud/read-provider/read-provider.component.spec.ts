import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProviderComponent } from './read-provider.component';

describe('ReadProviderComponent', () => {
  let component: ReadProviderComponent;
  let fixture: ComponentFixture<ReadProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
