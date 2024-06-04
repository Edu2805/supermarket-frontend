import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomValidators } from 'ngx-custom-validators';
import { Observable, fromEvent, merge } from 'rxjs';
import { ChangePassword } from '../../models/change-password';
import { UserDataDetailsOutput } from '../../models/user-data-details-output';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  errors: any[] = [];
  changePasswordForm: FormGroup;
  changePassword: ChangePassword;
  userData: UserDataDetailsOutput;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  localStorageUtils = new LocalStorageUtils();

  unsaveChanges: boolean;

  constructor(private fb: FormBuilder, 
    private accountService: AccountService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private spinner: NgxSpinnerService) { 

      this.validationMessages = {
        oldPassword: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_OLD_PASSWORD'),
          rangeLength: this.translateService.instant('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8')
        },
        newPassword: {
          required: this.translateService.instant('br_com_supermarket_INFORM_THE_NEW_PASSWORD'),
          rangeLength: this.translateService.instant('br_com_supermarket_PASSWORD_CANNOT_BE_LESS_THAN_6_AND_GREATER_THAN_8'),
          notEqualTo: this.translateService.instant('br_com_supermarket_NEW_PASSWORD_IS_NOT_THE_SAME_TO_OLD')
        }
      };

      this.userData = this.route.snapshot.data['userData'];

      this.genericValidator = new GenericValidator(this.validationMessages);
     }

  ngOnInit() {
    let oldPassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 8])]);
    let newPassword = new FormControl('', [Validators.required, CustomValidators.notEqualTo(oldPassword), CustomValidators.rangeLength([6, 8])]);

    this.changePasswordForm = this.fb.group({
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.proccessMenssage(this.changePasswordForm);
      this.unsaveChanges = true;
    })

  }

  updatePassword() {
    if (this.changePasswordForm.dirty && this.changePasswordForm.valid) {
      this.spinner.show();
      this.changePassword = Object.assign({}, this.changePassword, this.changePasswordForm.value);

      this.accountService.updatePassword(this.changePassword, this.userData)
        .subscribe(
          success => { this.processSuccessAuth() },
          fail => { this.processFail(fail) }
        );
        this.unsaveChanges = false;
    }
  }

  processSuccessAuth() {
    this.errors = [];
    this.changePasswordForm.reset();
    this.localStorageUtils.clearUserLocationData();

    let toast = this.toastr.success(this.translateService.instant('br_com_supermarket_NEW_PASSWORD_REGISTER_SUCCESSFUL'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/account/login']);
      })
    }
    
  }

  processFail(fail: any) {
    this.spinner.hide();
    if (fail && fail.error && fail.error.errors) {
      fail.error.errors.forEach(error => {
        this.toastr.error(this.translateService.instant(error));
      });
      return;
    }
    if (fail && fail.error && fail.error.message) {
      this.toastr.error(this.translateService.instant(fail.error.message));
      return;
    }
    this.toastr.error(this.translateService.instant('br_com_supermarket_AN_ERROR_OCCURRED_WHILE_REGISTER_THE_NEW_PASSWORD'));
  }

}
