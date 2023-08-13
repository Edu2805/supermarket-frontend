import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.scss']
})
export class DetailsPersonComponent {

  person: Person;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();
  id: any = '';
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.person = this.route.snapshot.data['person'];
      this.spinner.hide();
  }

  accordion(id: any) {
    if (this.id == id) {
      this.id = '';
    } else {
      this.id = id;
    }
  }

  fillTitlePersonDetails(): string {
    if(this.person !== undefined && this.person !== null && 
      this.person?.middleName !== undefined && this.person?.middleName !== null) {

      return `${this.person?.firstName} ${this.person?.middleName} ${this.person?.lastName}`

    } else if(this.person !== undefined && this.person !== null && 
      this.person?.middleName === undefined || this.person?.middleName === null) {

      return `${this.person?.firstName} ${this.person?.lastName}`
      
    }
    return "";
  }
}
