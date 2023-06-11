import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEstablishmentComponent } from './details-establishment.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CpfPipe, CnpjPipe } from 'src/app/utils/pipe/document';
import { CellPhonePipe, PhonePipe } from 'src/app/utils/pipe/phone';

describe('DetailsEstablishmentComponent', () => {
  let component: DetailsEstablishmentComponent;
  let fixture: ComponentFixture<DetailsEstablishmentComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DetailsEstablishmentComponent,
        CpfPipe,
        CnpjPipe,
        CellPhonePipe,
        PhonePipe 
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

    fixture = TestBed.createComponent(DetailsEstablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
