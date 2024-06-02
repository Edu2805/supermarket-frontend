import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { GenericValidator } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { UserDataService } from '../../services/user-data.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { ApproveUserInput } from '../../model/approve-user-input';
import { ApproveUserDataOutput } from '../../model/approve-user-output';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.scss']
})
export class ApproveUserComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  
  userApprovedForm: FormGroup;
  userData: ApproveUserDataOutput;
  approveUserInput: ApproveUserInput;
  genericValidator: GenericValidator;
  localStorageUtils = new LocalStorageUtils();

  constructor(private fb: FormBuilder, 
    private userDataService: UserDataService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe) {

    super(toastr, translateService);

      this.validationMessages = {
        isApproved: {
          required: this.translateService.instant('br_com_supermarket_USER_IS_APPROVED_REQUIRED'),
        }
      };
      super.messageConfigValidatorBase(this.validationMessages);
      this.userData = this.route.snapshot.data['userApprove'];
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    let formattedDate = this.datePipe.transform(this.userData?.registrationDate, 'dd/MM/yyyy HH:mm');
    this.userApprovedForm = this.fb.group({
      id: [{value: this.userData?.id, disabled: true}],
      userName: [{value: this.userData?.userName, disabled: true}],
      role: [{value: this.userData?.role, disabled: true}],
      registrationDate: [{value: formattedDate, disabled: true}],
      employee: [{value: this.userData?.employee, disabled: true}],
      approved: [this.userData?.approved, [Validators.required]]
    });
    this.spinner.hide();
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.proccessMenssage(this.userApprovedForm);
      this.unsaveChanges = true;
    })
    super.formConfigValidatorsBase(this.formInputElements, this.userApprovedForm);
  }

  approveUser() {
    if (this.userApprovedForm.dirty && this.userApprovedForm.valid) {
      this.spinner.show();
      this.approveUserInput = Object.assign({}, this.approveUserInput, this.userApprovedForm.value);

      this.userDataService.updateUserData(this.userData.id, this.approveUserInput)
        .subscribe(
          () => { this.processSuccess() },
          fail => { this.processFail(fail) }
        );
        this.unsaveChanges = false;
    }
  }

  processSuccess() {
    this.errors = [];
    this.userApprovedForm.reset();

    let toast = this.toastr.success(this.translateService.instant('br_com_supermarket_USER_IS_APPROVED_SUCCESSFUL'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/user-data/getAll']);
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
    this.toastr.error(this.translateService.instant('br_com_supermarket_USER_AN_ERROR_OCCURRED_WHILE_IS_APPROVED_USER'));
  }

}