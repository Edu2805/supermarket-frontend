import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-historical-reports',
  templateUrl: './historical-reports.component.html',
  styleUrls: ['./historical-reports.component.scss']
})
export class HistoricalReportsComponent {
  constructor(private translateService: TranslateService,) { }
}
