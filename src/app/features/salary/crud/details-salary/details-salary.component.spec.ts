import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSalaryComponent } from './details-salary.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { SingleDatePipe } from 'src/app/utils/pipe/date-pipe';

describe('DetailsSalaryComponent', () => {
  let component: DetailsSalaryComponent;
  let fixture: ComponentFixture<DetailsSalaryComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DetailsSalaryComponent,
        SingleDatePipe
      ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        HttpClient, 
        HttpHandler,
        TranslateService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
