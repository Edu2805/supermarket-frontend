import { AbstractControl } from "@angular/forms";

export class EmailValidationForm {

    static email(controle: AbstractControl) {
debugger
        const email = controle.value;
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        let isValid: boolean;
        if(!regex.test(email)) {
            isValid = false;
        } else {
            isValid = true
        }
        if (isValid) return null;

        return { invalidEmail: true };
    }
}