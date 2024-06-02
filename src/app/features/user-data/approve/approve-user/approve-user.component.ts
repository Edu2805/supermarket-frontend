import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';

@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.scss']
})
export class ApproveUserComponent extends FormBaseComponent implements OnInit {
  
  constructor(protected override toastr: ToastrService, protected override translateService: TranslateService) {
    super(toastr, translateService);
  }

  ngOnInit(): void {
  }
}