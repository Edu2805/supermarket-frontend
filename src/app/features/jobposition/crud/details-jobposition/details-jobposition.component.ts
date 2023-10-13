import { Component } from '@angular/core';
import { JobPosition } from '../../model/jobposition';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-jobposition',
  templateUrl: './details-jobposition.component.html',
  styleUrls: ['./details-jobposition.component.scss']
})
export class DetailsJobpositionComponent {

  jobPosition: JobPosition;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.jobPosition = this.route.snapshot.data['jobposition'];
      this.spinner.hide();
  }
}
