import { AbstractControl } from "@angular/forms";

export class DateValidationForm {

    static date(controle: AbstractControl) {
        const date = controle.value;
        const regex = new RegExp(/[0-9]{8}/);
        let isValid: boolean;
        if(!regex.test(date)) {
            isValid = false;
        } else {
            isValid = true
        }
        if (isValid) return null;

        return { invalidDate: true };
    }
}