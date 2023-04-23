import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'supermarket-frontend';
  language = window.navigator.language;
  DEFAULT_LANGUAGE = 'en-US';

  constructor(public translate: TranslateService) {
    translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    translate.use(this.language);
    console.log(this.language);
    
  }

}
