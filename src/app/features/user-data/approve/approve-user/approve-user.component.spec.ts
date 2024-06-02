import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveUserComponent } from './approve-user.component';
import { UserDataService } from '../../services/user-data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

describe('ApproveUserComponent', () => {
  let component: ApproveUserComponent;
  let fixture: ComponentFixture<ApproveUserComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ApproveUserComponent  
      ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        UserDataService,
        HttpClient, 
        HttpHandler,
        TranslateService,
        DatePipe
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(), 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
