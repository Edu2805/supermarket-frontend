import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProviderComponent } from './details-provider.component';

describe('DetailsProviderComponent', () => {
  let component: DetailsProviderComponent;
  let fixture: ComponentFixture<DetailsProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
