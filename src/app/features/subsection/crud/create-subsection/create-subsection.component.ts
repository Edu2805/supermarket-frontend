import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { SubSection } from '../../model/subsection';
import { MainSection } from 'src/app/features/mainsection/model/mainsection';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { SubsectionService } from '../../services/subsection.service';
import { MainsectionService } from 'src/app/features/mainsection/services/mainsection.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-create-subsection',
  templateUrl: './create-subsection.component.html',
  styleUrls: ['./create-subsection.component.scss']
})
export class CreateSubsectionComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  subsectionForm: FormGroup;
  subsection: SubSection;
  mainsections: MainSection[];
  localStorageUtils = new LocalStorageUtils();

  vaidateDocument: any;

  formResult: string= '';
  
  constructor(private fb: FormBuilder,
    private subsectionService: SubsectionService,
    private mainsectionService: MainsectionService,
    private router: Router,
    private spinner: NgxSpinnerService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService,) {

    super(toastr, translateService);
    
    this.validationMessages = {
      name: {
        required: this.translateService.instant('br_com_supermarket_SUB_SECTION_ERROR_FORM_NAME_REQUIRED_MESSAGE'),
        rangeLength: `${this.translateService.instant('br_com_supermarket_SUB_SECTION_ERROR_FORM_NAME_MIN_LENGTH_MESSAGE')} 
          ${this.translateService.instant('br_com_supermarket_SUB_SECTION_ERROR_FORM_NAME_MAX_LENGTH_MESSAGE')}`,
      },
      id: {
        required: this.translateService.instant('br_com_supermarket_SUB_SECTION_ERROR_FORM_MAIN_SECTION_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
  }

  ngOnInit() {
    this.getMainsections();
    this.subsectionForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 50])])],
      mainSection: this.fb.group({
        id: ['', Validators.required]
      })
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.subsectionForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.subsectionForm);
  }

  getMainsections() {
    this.mainsectionService.getAllMainsections().subscribe((response) => {
      this.mainsections = response;
    },(error: any) => {
      if (error && error.errors) {
        this.toastr.error(this.translateService.instant(error.errors));
      }
      this.toastr.error(this.translateService.instant('br_com_supermarket_SUB_SECTION_AN_ERROR_OCCURRED_WHILE_GET_MAIN_SECTIONS'));
    });
  }

  addSubsection() {
    
    if (this.subsectionForm.dirty && this.subsectionForm.valid) {
      this.spinner.show();
      this.subsection = Object.assign({}, this.subsection, this.subsectionForm.value);
      this.subsectionService.newSubsection(this.subsection)
        .subscribe(
          success => { this.processSuccess(success) },
          fail => { this.processFail(fail) }
        );
    }
  }

  processSuccess(response: any) {
    this.subsectionForm.reset();
    this.errors = [];
    this.unsaveChanges = false;

    let toast = this.toastr.success(
        this.translateService.instant('br_com_supermarket_SUB_SECTION_NEW_SUCCESS'), 
        this.translateService.instant('br_com_supermarket_MSG_GENERIC_SUCCESS'));
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.spinner.hide();
        this.router.navigate(['/sub-section/getAll'])
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