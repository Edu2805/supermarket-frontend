import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEstablishmentComponent } from './read-establishment.component';
import { EstablishmentService } from '../../services/establishment.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DEFAULT_LANGUAGE, TranslateModule, TranslateService, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

describe('ReadEstablishmentComponent', () => {
  let component: ReadEstablishmentComponent;
  let fixture: ComponentFixture<ReadEstablishmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEstablishmentComponent ],
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

    fixture = TestBed.createComponent(ReadEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
