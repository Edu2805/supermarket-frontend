import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.scss']
})
export class DeletePersonComponent {

  person: Person;
  errors: any[] = [];
  localStorageUtils = new LocalStorageUtils();
  defaultId: string = 'cf3f50ba-9d26-46a0-a711-dae2be2a101c';
  images: string = environment.imagesUrl;
  id: any = '';

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private translateService: TranslateService) {

      this.person = this.route.snapshot.data['person'];
      this.spinner.hide();
  }

  deletePerson() {
    this.spinner.show();
    this.personService.deletePerson(this.person.id)
      .subscribe(
        event => { this.successExclusion(event)},
        error => { this.failDelete(error) }
      );
  }

  successExclusion(event: any) {
    const toast = this.toastr.success(
      this.translateService.instant('br_com_supermarket_PERSON_DELETE_SUCCESS'), 
      this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS')
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/person/getAll']);
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

  accordion(id: any) {
    if (this.id == id) {
      this.id = '';
    } else {
      this.id = id;
    }
  }
}
