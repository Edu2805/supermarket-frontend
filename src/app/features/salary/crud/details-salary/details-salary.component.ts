import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Salary } from '../../model/salary';

@Component({
  selector: 'app-details-salary',
  templateUrl: './details-salary.component.html',
  styleUrls: ['./details-salary.component.scss']
})
export class DetailsSalaryComponent {

  salary: Salary;
  errors: any[] = [];
  id: any = '';

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,) {

      this.salary = this.route.snapshot.data['salary'];
      this.spinner.hide();
  }

  accordion(id: any) {
    if (this.id == id) {
      this.id = '';
    } else {
      this.id = id;
    }
  }
}
