import { Component } from '@angular/core';
import { Department } from '../../model/department';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-department',
  templateUrl: './details-department.component.html',
  styleUrls: ['./details-department.component.scss']
})
export class DetailsDepartmentComponent {
  department: Department;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.department = this.route.snapshot.data['department'];
      this.spinner.hide();
  }
}
