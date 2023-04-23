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
    
  }

  ngOnInit() {
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.translate.use(this.language);
  }

}
