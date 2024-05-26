import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-historical-reports',
  templateUrl: './historical-reports.component.html',
  styleUrls: ['./historical-reports.component.scss']
})
export class HistoricalReportsComponent {

  private localStorageUtils = new LocalStorageUtils();

  constructor(private translateService: TranslateService,) { }

  verifyUserAccess(...holes: string[]): boolean {
    let user = this.localStorageUtils.getUser();
    return holes.includes(user?.roleType);
}
}
