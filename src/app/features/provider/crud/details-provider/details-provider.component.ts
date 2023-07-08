import { Component } from '@angular/core';
import { Provider } from '../../model/provider';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-provider',
  templateUrl: './details-provider.component.html',
  styleUrls: ['./details-provider.component.scss']
})
export class DetailsProviderComponent {

  provider: Provider;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.provider = this.route.snapshot.data['provider'];
      this.spinner.hide();
  }

}
