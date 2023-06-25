import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { Establishment } from '../../model/establishment';

@Component({
  selector: 'app-details-establishment',
  templateUrl: './details-establishment.component.html',
  styleUrls: ['./details-establishment.component.scss']
})
export class DetailsEstablishmentComponent {
  
  establishment: Establishment;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.establishment = this.route.snapshot.data['establishment'];
      this.spinner.hide();
  }
}
