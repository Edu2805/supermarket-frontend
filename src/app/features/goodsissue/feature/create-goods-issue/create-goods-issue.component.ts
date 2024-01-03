import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';

@Component({
  selector: 'app-create-goods-issue',
  templateUrl: './create-goods-issue.component.html',
  styleUrls: ['./create-goods-issue.component.scss']
})
export class CreateGoodsIssueComponent extends FormBaseComponent {

  constructor(protected override translateService: TranslateService,
    protected override toastr: ToastrService) {

      super(toastr, translateService);
    }

}
