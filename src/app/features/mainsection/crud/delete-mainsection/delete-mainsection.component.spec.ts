import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMainsectionComponent } from './delete-mainsection.component';
import { MainsectionService } from '../../services/mainsection.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

describe('DeleteMainsectionComponent', () => {
  let component: DeleteMainsectionComponent;
  let fixture: ComponentFixture<DeleteMainsectionComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DeleteMainsectionComponent 
      ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        MainsectionService,
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

    fixture = TestBed.createComponent(DeleteMainsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
