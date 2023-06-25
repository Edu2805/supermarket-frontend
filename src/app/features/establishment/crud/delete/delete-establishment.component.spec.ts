import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEstablishmentComponent } from './delete-establishment.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { EstablishmentService } from '../../../services/establishment.service';
import { ActivatedRoute } from '@angular/router';
import { CnpjPipe, CpfPipe } from 'src/app/utils/pipe/document';
import { CellPhonePipe, PhonePipe } from 'src/app/utils/pipe/phone';

describe('DeleteEstablishmentComponent', () => {
  let component: DeleteEstablishmentComponent;
  let fixture: ComponentFixture<DeleteEstablishmentComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DeleteEstablishmentComponent,
        CpfPipe,
        CnpjPipe,
        CellPhonePipe,
        PhonePipe 
      ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        EstablishmentService,
        HttpClient, 
        HttpHandler,
        TranslateService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(), 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
