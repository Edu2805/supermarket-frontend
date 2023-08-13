import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { environment } from 'src/environments/environment';
import { UserData } from '../../models/user-data';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent {

  userData: UserData;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();
  id: any = '';
  images: string = environment.imagesUrl;
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.userData = this.route.snapshot.data['userData'];
      this.spinner.hide();
  }
}
