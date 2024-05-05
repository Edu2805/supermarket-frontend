import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Establishment } from '../../model/establishment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-establishment',
  templateUrl: './details-establishment.component.html',
  styleUrls: ['./details-establishment.component.scss']
})
export class DetailsEstablishmentComponent {
  
  establishment: Establishment;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.establishment = this.route.snapshot.data['establishment'];
      this.spinner.hide();
  }
}
