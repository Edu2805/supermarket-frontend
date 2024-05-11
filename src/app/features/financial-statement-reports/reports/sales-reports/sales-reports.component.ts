import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';

@Component({
  selector: 'app-sales-reports',
  templateUrl: './sales-reports.component.html',
  styleUrls: ['./sales-reports.component.scss']
})
export class SalesReportsComponent extends FormBaseComponent implements OnInit {

  constructor(

    protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {

      super(toastr, translateService)
    }

  ngOnInit(): void {
    console.log("Carregou");
    
  }

}
