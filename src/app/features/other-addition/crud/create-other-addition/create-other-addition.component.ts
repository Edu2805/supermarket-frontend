import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { OtherAddition } from '../../model/other-addition';
import { SharedDataService } from 'src/app/features/salary/services/shared-data.service';
import { Constants } from 'src/app/utils/constants/constants';

@Component({
  selector: 'app-create-other-addition',
  templateUrl: './create-other-addition.component.html',
  styleUrls: ['./create-other-addition.component.scss']
})
export class CreateOtherAdditionComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @Output() formOtherAdditionSubmitted = new EventEmitter<OtherAddition>();

  otherAdditionForm: FormGroup;
  otherAddition: OtherAddition;
  otherAdditions: OtherAddition[] = [];
  localStorageUtils = new LocalStorageUtils();
  vaidateDocument: any;
  formResult: string= '';
  editValues: any;
  actionType: any;
  action: any;
  
  constructor(private fb: FormBuilder,
    private sharedDataService: SharedDataService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService) {

    super(toastr, translateService);
    this.validationMessages = {
      additionName: {
        required: this.translateService.instant('br_com_supermarket_OTHER_ADDITION_ERROR_FORM_ADDITION_NAME_REQUIRED_MESSAGE'),
        rangeLength: this.translateService.instant('br_com_supermarket_OTHER_ADDITION_ERROR_FORM_ADDITION_NAME_MIN_MAX_LENGTH_MESSAGE'),
      },
      additionValue: {
        required: this.translateService.instant('br_com_supermarket_OTHER_ADDITION_ERROR_FORM_ADDITION_VALUE_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
  }

  ngOnInit() {
    this.otherAdditionForm = this.fb.group({
      additionName: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 30])])],
      additionValue: ['', Validators.required],
    });

    this.sharedDataService.otherAdditionData$.subscribe((data: any) => {
      this.editValues = data;
      this.action = this.sharedDataService.actionType;
      this.fillValuesOtherAdditions(this.editValues);
    });
  }

  fillValuesOtherAdditions(editValues: any) {
    if(this.editValues) {
      this.otherAdditionForm.patchValue(editValues);
    }
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.otherAdditionForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.otherAdditionForm);
  }

  addOtherAdditon() {
    if(this.sharedDataService.actionType === Constants.ACTION_UPDATE) {
      this.update(this.sharedDataService.index);
    } else {
      this.save();
    }
  }

  save() {
    if (this.otherAdditionForm.dirty && this.otherAdditionForm.valid) {
      this.otherAddition = Object.assign({}, this.otherAddition, this.otherAdditionForm.value);

      this.otherAddition.actionType = Constants.ACTION_INSERT;
      this.formOtherAdditionSubmitted.emit(this.otherAddition);
      this.otherAdditions.push(this.otherAddition);
      this.otherAddition = { additionName: '', additionValue: 0 };
      this.otherAdditionForm.reset();
    }
  }

  update(index: any) {    
    if (this.otherAdditionForm.dirty && this.otherAdditionForm.valid) {
      this.otherAddition = Object.assign({}, this.otherAddition, this.otherAdditionForm.value);

      this.otherAddition.actionType = Constants.ACTION_UPDATE;
      this.otherAddition.index = index;
      this.formOtherAdditionSubmitted.emit(this.otherAddition);
      this.otherAdditions.splice(index, 1, this.otherAddition);
      this.otherAdditionForm.reset();
      this.action = Constants.ACTION_INSERT;
      this.sharedDataService.actionType = Constants.ACTION_INSERT;
    } else {
      this.otherAdditionForm.reset();
      this.action = Constants.ACTION_INSERT;
      this.sharedDataService.actionType = Constants.ACTION_INSERT;
    }
  }
}
