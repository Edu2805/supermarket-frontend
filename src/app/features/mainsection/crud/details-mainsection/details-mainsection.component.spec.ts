import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMainsectionComponent } from './details-mainsection.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

describe('DetailsMainsectionComponent', () => {
  let component: DetailsMainsectionComponent;
  let fixture: ComponentFixture<DetailsMainsectionComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DetailsMainsectionComponent 
      ],
      providers: [ 
        HttpClient, 
        HttpHandler,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(), 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
