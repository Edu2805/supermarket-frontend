import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { MainSection } from '../../model/mainsection';
import { Department } from 'src/app/features/department/model/department';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { MainsectionService } from '../../services/mainsection.service';
import { DepartmentService } from 'src/app/features/department/services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-update-mainsection',
  templateUrl: './update-mainsection.component.html',
  styleUrls: ['./update-mainsection.component.scss']
})
export class UpdateMainsectionComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  mainsectionForm: FormGroup;
  mainsection: MainSection;
  departments: Department[];
  localStorageUtils = new LocalStorageUtils();

  vaidateDocument: any;

  formResult: string= '';
  
  constructor(private fb: FormBuilder,
    private mainsectionService: MainsectionService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {

    super(toastr, translateService);
    this.validationMessages = {
      name: {
        required: this.translateService.instant('br_com_supermarket_MAIN_SECTION_ERROR_FORM_NAME_REQUIRED_MESSAGE'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_DEPARTMENT_ERROR_FORM_NAME_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_DEPARTMENT_ERROR_FORM_NAME_MAX_LENGTH_MESSAGE')}`,
      },
      id: {
        required: this.translateService.instant('br_com_supermarket_MAIN_SECTION_ERROR_FORM_DEPARTMENT_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);

    this.mainsection = this.route.snapshot.data['mainsection'];
  }

  ngOnInit() {
    this.getDepartments();
    this.spinner.show();
    this.mainsectionForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 50])])],
      department: this.fb.group({
        id: ['', Validators.required]
      })
    });
    this.fillForm();
  }

  fillForm() {
    this.mainsectionForm.patchValue({
      id: this.mainsection?.id,
      name: this.mainsection?.name,
      department: {
        id: this.mainsection?.department.id
      }
    });
    this.spinner.hide();
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.mainsectionForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.mainsectionForm);
  }

  getDepartments() {
    this.departmentService.getAllDepartments().subscribe((response) => {
      this.departments = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_MAIN_SECTION_AN_ERROR_OCCURRED_WHILE_GET_DEPARTMENTS'));
    });
  }

  editMainsection() {
    if (this.mainsectionForm.dirty && this.mainsectionForm.valid) {
      this.spinner.show();
      this.mainsection = Object.assign({}, this.mainsection, this.mainsectionForm.value);

      this.mainsectionService.updateMainsection(this.mainsection)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.mainsectionForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_MAIN_SECTION_EDIT_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/main-section/getAll'])
      });
    }
  }

  processFail(fail: any) {
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
