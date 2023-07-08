import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProviderComponent } from './details-provider.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CpfPipe, CnpjPipe } from 'src/app/utils/pipe/document';
import { CellPhonePipe, PhonePipe } from 'src/app/utils/pipe/phone';

describe('DetailsProviderComponent', () => {
  let component: DetailsProviderComponent;
  let fixture: ComponentFixture<DetailsProviderComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DetailsProviderComponent,
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

    fixture = TestBed.createComponent(DetailsProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
