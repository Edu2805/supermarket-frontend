import { Component } from '@angular/core';
import { Employee } from '../../model/employee';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.scss']
})
export class DetailsEmployeeComponent {

  employee: Employee;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();
  id: any = '';

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

      this.employee = this.route.snapshot.data['employee'];
      this.spinner.hide();
  }

  accordion(id: any) {
    if (this.id == id) {
      this.id = '';
    } else {
      this.id = id;
    }
  }

  fillTitleEmployeeDetails(): string {
    return this.employee.fullName;
  }

}
