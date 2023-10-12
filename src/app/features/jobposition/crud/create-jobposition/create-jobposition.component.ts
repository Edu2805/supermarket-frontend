import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';

@Component({
  selector: 'app-create-jobposition',
  templateUrl: './create-jobposition.component.html',
  styleUrls: ['./create-jobposition.component.scss']
})
export class CreateJobpositionComponent extends FormBaseComponent implements OnInit {

  constructor(protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {
      super(toastr, translateService);
    }

  ngOnInit(): void {
    // TODO implements method
  }

}
