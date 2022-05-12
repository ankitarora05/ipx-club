import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInputValidator} from "../../../shared/validators/user-input-validator";
import {SignupService} from "../service/signup.service";
import {Router} from "@angular/router";
import {SignupRouter} from "../router/signup-router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent extends SignupRouter implements OnInit {
    signupForm!: FormGroup
    hasRequestError: boolean = false
    httpErrorMessage: boolean = false
    formSubmitted: boolean = false

    constructor(private fb: FormBuilder, private signupService: SignupService, router: Router) {
        super(router)
    }

    ngOnInit(): void {
        this.signupForm = this.buildSignupForm();
    }

    signup(user: FormGroup) {
        this.formSubmitted = true;
        this.signupForm.valid && this.signupService.signup(user.value).subscribe(() => {
            this.formSubmitted = true
            this.signupForm.reset()
            this.handleSuccessSignupRouteChange();
        }, (error) => this.handleSignupError(error))
    }

    private buildSignupForm() {
        return this.fb.group({
            firstName: [null, [UserInputValidator.firstNameValidator, Validators.required]],
            lastName: [null, [UserInputValidator.lastNameValidator, Validators.required]],
            email: [null, [UserInputValidator.emailValidator, Validators.required]],
            password: [null, [UserInputValidator.passwordValidator, Validators.required]],
            phone: [null, [UserInputValidator.phoneNumberValidator, Validators.required]]
        });
    }

    private handleSignupError(error: any): void {
        this.hasRequestError = true
       this.httpErrorMessage = error.message
    }
}
