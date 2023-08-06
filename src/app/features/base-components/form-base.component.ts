import { ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Dimensions, ImageCroppedEvent, ImageTransform } from "ngx-image-cropper";
import { ToastrService } from "ngx-toastr";
import { fromEvent, merge, Observable } from "rxjs";
import { Constants } from "src/app/utils/constants/constants";
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';

export abstract class FormBaseComponent {

    errors: any[] = [];
    displayMessage: DisplayMessage = {};
    genericValidators: GenericValidator;
    validationMessages: ValidationMessages;
    activeButton: boolean = true;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    croppedImageData: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    transform: ImageTransform = {};
    imageURL: string;
    imageName: string;
    imageType: string;

    unsaveChanges: boolean;

    constructor(protected toastr: ToastrService, protected translateService: TranslateService){}

    protected messageConfigValidatorBase(validationMessages: ValidationMessages) {
        this.genericValidators = new GenericValidator(validationMessages);
    }

    protected formConfigValidatorsBase(
        formInputElements: ElementRef[],
        formGroup: FormGroup) {
        
            let controlBlurs: Observable<any>[] = formInputElements
                .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

            merge(...controlBlurs).subscribe(() => {
                this.validateForm(formGroup)
            });
    }

    protected validateForm(formGroup: FormGroup) {
        this.displayMessage = this.genericValidators.proccessMenssage(formGroup);
        this.unsaveChanges = true;
        this.activeButton = false;
    }

    protected fileChangeEvent(event: any): void {
        if (event.currentTarget.files[0].size > Constants.ATTACHMENT_MAXIMUM_SIZE_FILE) {
          this.toastr.warning(this.errors.toString(), this.translateService.instant('br_com_supermarket_ATTACHMENT_FILE_EXCEEDS_MAXIMUM_SIZE'));
          return;
        }
        this.imageChangedEvent = event;
        this.imageName = event.currentTarget.files[0].name;
        this.imageType = event.currentTarget.files[0].type;
      }
    
      protected imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.croppedImageData = this.croppedImage.split(',')[1];
      }
    
      protected imageLoaded() {
        this.showCropper = true;
      }
    
      protected cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
      }
    
      protected loadImageFailed() {
        this.errors.push('O formato do arquivo ' + this.imageName + ' não é aceito');
      }
    
}