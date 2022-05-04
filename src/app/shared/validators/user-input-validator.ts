import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export class UserInputValidator {

    static firstNameValidator = Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(50)]);

    static lastNameValidator = Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(50)])

    static emailValidator = Validators.compose([
        UserInputValidator.patternValidator(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {hasInvalidEmail: true})
    ]);

    static phoneNumberValidator = Validators.compose([
        Validators.pattern("[0-9]{10}")
    ]);

    static passwordValidator = Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(10),
        UserInputValidator.patternValidator(/\d/, {hasNoNumber: true}),
        UserInputValidator.patternValidator(/[A-Z]/, {hasNoUpperCase: true}),
        UserInputValidator.patternValidator(/[a-z]/, {hasNoLowerCase: true}),
        UserInputValidator.patternValidator(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/, {hasNoSpecialCharacters: true}),
    ]);

    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password')?.value;
        const confirmPassword: string = control.get('confirmPassword')?.value;
        if (password !== confirmPassword) {
            control.get('confirmPassword')?.setErrors({noPasswordMatch: true});
        }
    }

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (!control.value) {
                return null;
            }
            const isValid = regex.test(control.value);
            return isValid ? null : error;
        };
    }
}
