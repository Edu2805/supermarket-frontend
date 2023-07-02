import { Component } from '@angular/core';
import { MainSection } from '../../model/mainsection';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-mainsection',
  templateUrl: './details-mainsection.component.html',
  styleUrls: ['./details-mainsection.component.scss']
})
export class DetailsMainsectionComponent {

  mainsection: MainSection;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.mainsection = this.route.snapshot.data['mainsection'];
      this.spinner.hide();
  }
}
