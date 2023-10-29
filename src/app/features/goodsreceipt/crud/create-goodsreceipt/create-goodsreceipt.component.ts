import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';

@Component({
  selector: 'app-create-goodsreceipt',
  templateUrl: './create-goodsreceipt.component.html',
  styleUrls: ['./create-goodsreceipt.component.scss']
})
export class CreateGoodsreceiptComponent extends FormBaseComponent {

  constructor(protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {

    super(toastr, translateService);
  }
}
