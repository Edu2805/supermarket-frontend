import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDepartmentComponent } from './details-department.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

describe('DetailsDepartmentComponent', () => {
  let component: DetailsDepartmentComponent;
  let fixture: ComponentFixture<DetailsDepartmentComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DetailsDepartmentComponent 
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

    fixture = TestBed.createComponent(DetailsDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
