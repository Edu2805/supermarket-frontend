import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGoodsIssueComponent } from './create-goods-issue.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { USE_DEFAULT_LANG, USE_STORE, USE_EXTEND, DEFAULT_LANGUAGE, TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { GoodsIssueGuardService } from '../../services/goodsissue.guard';

describe('CreateGoodsIssueComponent', () => {
  let component: CreateGoodsIssueComponent;
  let fixture: ComponentFixture<CreateGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CreateGoodsIssueComponent 
      ],
      providers: [ 
        { provide: USE_DEFAULT_LANG, useValue: undefined },
        { provide: USE_STORE, useValue: undefined },
        { provide: USE_EXTEND, useValue: undefined },
        { provide: DEFAULT_LANGUAGE, useValue: undefined },
        GoodsIssueGuardService,
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

    fixture = TestBed.createComponent(CreateGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
