import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSubsectionComponent } from './read-subsection.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { SubsectionService } from '../../services/subsection.service';

describe('ReadSubsectionComponent', () => {
  let component: ReadSubsectionComponent;
  let fixture: ComponentFixture<ReadSubsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ReadSubsectionComponent 
      ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        SubsectionService,
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

    fixture = TestBed.createComponent(ReadSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
