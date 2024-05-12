import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-financial-statement-home',
  templateUrl: './financial-statement-home.component.html',
  styleUrls: ['./financial-statement-home.component.scss']
})
export class FinancialStatementHomeComponent {

  constructor(private translateService: TranslateService,) { }

}
