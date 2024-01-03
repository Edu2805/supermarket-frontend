import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGoodsreceiptComponent } from './details-goodsreceipt.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { SingleDatePipe } from 'src/app/utils/pipe/date-pipe';

describe('DetailsGoodsreceiptComponent', () => {
  let component: DetailsGoodsreceiptComponent;
  let fixture: ComponentFixture<DetailsGoodsreceiptComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DetailsGoodsreceiptComponent,
        SingleDatePipe 
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

    fixture = TestBed.createComponent(DetailsGoodsreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
