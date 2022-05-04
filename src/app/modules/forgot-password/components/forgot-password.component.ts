import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgotPasswordService} from "../services/forgot-password.service";
import {UserInputValidator} from "../../../shared/validators/user-input-validator";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm!: FormGroup;
    hasRequestError: boolean = false;
    requestErrorMessage!: string;
    formSubmitted: boolean = false;
    hasApiResponse: boolean = false;

    constructor(private fb: FormBuilder,
                private fpService: ForgotPasswordService) {
    }

    get email() {
        return this.forgotPasswordForm.get("email");
    }

    ngOnInit(): void {
        this.forgotPasswordForm = this.buildForgotPasswordForm();
    }

    requestPasswordReset(forgotPasswordForm: FormGroup): void {
        this.formSubmitted = true;
        this.forgotPasswordForm.valid && this.fpService.handleForgotPassword(forgotPasswordForm.value).subscribe(() => {
                this.hasApiResponse = true;
                this.forgotPasswordForm.reset();
            },
            (error) => {
                this.hasRequestError = true;
                const [message] = error.message;
                this.requestErrorMessage = message;
            });
    }

    private buildForgotPasswordForm(): FormGroup {
        return this.fb.group({
            email: [null, [UserInputValidator.emailValidator, Validators.required]]
        });
    }
}
