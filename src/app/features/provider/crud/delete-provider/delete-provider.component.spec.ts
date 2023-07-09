import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProviderComponent } from './delete-provider.component';
import { ProviderService } from '../../services/provider.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CpfPipe, CnpjPipe } from 'src/app/utils/pipe/document';
import { CellPhonePipe, PhonePipe } from 'src/app/utils/pipe/phone';

describe('DeleteProviderComponent', () => {
  let component: DeleteProviderComponent;
  let fixture: ComponentFixture<DeleteProviderComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DeleteProviderComponent,
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
        ProviderService,
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

    fixture = TestBed.createComponent(DeleteProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
