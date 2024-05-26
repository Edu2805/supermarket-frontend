import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-financial-statement-home',
  templateUrl: './financial-statement-home.component.html',
  styleUrls: ['./financial-statement-home.component.scss']
})
export class FinancialStatementHomeComponent {

  private localStorageUtils = new LocalStorageUtils();

  constructor(private translateService: TranslateService,) { }

  verifyUserAccess(...holes: string[]): boolean {
      let user = this.localStorageUtils.getUser();
      return holes.includes(user.roleType);
  }
}
