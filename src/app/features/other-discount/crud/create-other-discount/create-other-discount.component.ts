import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ngx-custom-validators';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, merge } from 'rxjs';
import { FormBaseComponent } from 'src/app/features/base-components/form-base.component';
import { SharedDataService } from 'src/app/features/salary/services/shared-data.service';
import { Constants } from 'src/app/utils/constants/constants';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { OtherDiscount } from '../../model/other-discount';

@Component({
  selector: 'app-create-other-discount',
  templateUrl: './create-other-discount.component.html',
  styleUrls: ['./create-other-discount.component.scss']
})
export class CreateOtherDiscountComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @Output() formOtherDiscountsSubmitted = new EventEmitter<OtherDiscount>();

  otherDiscountForm: FormGroup;
  otherDiscount: OtherDiscount;
  otherDiscounts: OtherDiscount[] = [];
  localStorageUtils = new LocalStorageUtils();
  vaidateDocument: any;
  formResult: string= '';
  editValues: any;
  actionType: any;
  action: any;
  totalDiscounts: number;
  
  constructor(private fb: FormBuilder,
    private sharedDataService: SharedDataService,
    protected override translateService: TranslateService,
    protected override toastr: ToastrService) {

    super(toastr, translateService);
    this.validationMessages = {
      discountName: {
        required: this.translateService.instant('br_com_supermarket_OTHER_DISCOUNT_ERROR_FORM_DISCOUNT_NAME_REQUIRED_MESSAGE'),
        rangeLength: this.translateService.instant('br_com_supermarket_OTHER_DISCOUNT_ERROR_FORM_DISCOUNT_NAME_MIN_MAX_LENGTH_MESSAGE'),
      },
      discountValue: {
        required: this.translateService.instant('br_com_supermarket_OTHER_DISCOUNT_ERROR_FORM_DISCOUNT_VALUE_REQUIRED_MESSAGE'),
      }
    };
    super.messageConfigValidatorBase(this.validationMessages);
  }

  ngOnInit() {
    this.otherDiscountForm = this.fb.group({
      discountName: ['', Validators.compose([Validators.required, CustomValidators.rangeLength([2, 30])])],
      discountValue: ['', Validators.required],
    });

    this.sharedDataService.otherDiscountData$.subscribe((data: any) => {
      this.editValues = data;
      this.action = this.sharedDataService.actionType;
      this.fillValuesOtherDiscounts(this.editValues);
    });
  }

  fillValuesOtherDiscounts(editValues: any) {
    if(this.editValues) {
      this.otherDiscountForm.patchValue(editValues);
    }
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidators.proccessMenssage(this.otherDiscountForm);
    })
    super.formConfigValidatorsBase(this.formInputElements, this.otherDiscountForm);
  }

  addOtherDiscount() {
    if(this.sharedDataService.actionType === Constants.ACTION_UPDATE) {
      this.update(this.sharedDataService.index);
    } else {
      this.save();
    }
  }

  save() {
    if (this.otherDiscountForm.dirty && this.otherDiscountForm.valid) {
      this.otherDiscount = Object.assign({}, this.otherDiscount, this.otherDiscountForm.value);

      this.otherDiscount.actionType = Constants.ACTION_INSERT;
      this.formOtherDiscountsSubmitted.emit(this.otherDiscount);
      this.otherDiscounts.push(this.otherDiscount);
      this.otherDiscount = { discountName: '', discountValue: 0 };
      this.otherDiscountForm.reset();
    }
  }

  update(index: any) {    
    if (this.otherDiscountForm.dirty && this.otherDiscountForm.valid) {
      this.otherDiscount = Object.assign({}, this.otherDiscount, this.otherDiscountForm.value);

      this.otherDiscount.actionType = Constants.ACTION_UPDATE;
      this.otherDiscount.index = index;
      this.formOtherDiscountsSubmitted.emit(this.otherDiscount);
      this.otherDiscounts.splice(index, 1, this.otherDiscount);
      this.otherDiscountForm.reset();
      this.action = Constants.ACTION_INSERT;
      this.sharedDataService.actionType = Constants.ACTION_INSERT;
    } else {
      this.otherDiscountForm.reset();
      this.action = Constants.ACTION_INSERT;
      this.sharedDataService.actionType = Constants.ACTION_INSERT;
    }
  }
}