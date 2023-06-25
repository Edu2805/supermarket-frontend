import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstablishmentComponent } from './create-establishment.component';
import { EstablishmentService } from '../../services/establishment.service';
import { DEFAULT_LANGUAGE, TranslateModule, TranslateService, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE } from '@ngx-translate/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('CreateEstablishmentComponent', () => {
  let component: CreateEstablishmentComponent;
  let fixture: ComponentFixture<CreateEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEstablishmentComponent ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        EstablishmentService,
        HttpClient, 
        HttpHandler,
        TranslateService,
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
