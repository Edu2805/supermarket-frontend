import { Component } from '@angular/core';
import { Provider } from '../../model/provider';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-provider',
  templateUrl: './delete-provider.component.html',
  styleUrls: ['./delete-provider.component.scss']
})
export class DeleteProviderComponent {

  provider: Provider;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();

  constructor(
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

      this.provider = this.route.snapshot.data['provider'];
      this.spinner.hide();
  }

  deleteProvider() {
    this.spinner.show();
    this.providerService.deleteProvider(this.provider.id)
      .subscribe(
        event => { this.successExclusion(event)},
        error => { this.failDelete(error) }
      );
  }

  successExclusion(event: any) {
    const toast = this.toastr.success(
      this.translateService.instant('br_com_supermarket_ESTABLISHMENT_DELETE_SUCCESS'), 
      this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS')
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/provider/getAll']);
        this.spinner.hide()
      });
    }
  }

  failDelete(fail) {
    if (fail.error !== null && fail.error !== undefined) {
      this.errors = fail.error.errors;
    } else {
      if (fail.status === 403) {
        this.errors = [this.translateService.instant('br_com_supermarket_LOGIN_AN_ERROR_OCCURRED_EXPIRED_LOGIN')];
        this.localStorageUtils.clearUserLocationData();
        this.router.navigate(['/account/login']);
      } else {
        this.errors = fail.message;
      }
    }
    this.toastr.error(this.errors.toString(), this.translateService.instant('br_com_supermarket_MSG_ERROR'));
    this.spinner.hide();
  }

}
