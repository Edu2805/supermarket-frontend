import { Component } from '@angular/core';
import { SubSection } from '../../model/subsection';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-subsection',
  templateUrl: './details-subsection.component.html',
  styleUrls: ['./details-subsection.component.scss']
})
export class DetailsSubsectionComponent {

  subsection: SubSection;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.subsection = this.route.snapshot.data['subsection'];
      this.spinner.hide();
  }
}
