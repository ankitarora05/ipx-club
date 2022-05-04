import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInputValidator} from "../../../shared/validators/user-input-validator";
import {CustomEmailAuthenticationService} from "../../../core/authentication/custom-email-authentication.service";
import {IServerAuthResponse} from "../../../core/authentication/models/auth";
import {LoginRouter} from "../router/login-router";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends LoginRouter implements OnInit {
    loginForm!: FormGroup;
    hasRequestError: boolean = false;
    formSubmitted: boolean = false;
    httpErrorMessage!: string;

    constructor(private fb: FormBuilder,
                private loginService: CustomEmailAuthenticationService,
                router: Router) {
        super(router);
    }

    get email() {
        return this.loginForm.get("email");
    }

    get password() {
        return this.loginForm.get("password");
    }

    ngOnInit(): void {
        this.loginForm = this.buildLoginForm();
    }

    buildLoginForm(): FormGroup {
        return this.fb.group({
            email: [null, [UserInputValidator.emailValidator, Validators.required]],
            password: [null, [UserInputValidator.passwordValidator, Validators.required]]
        })
    }

    login(submittedForm: FormGroup): void {
        this.formSubmitted = true;
        this.loginForm.valid && this.loginService.login(submittedForm.value).subscribe((res: IServerAuthResponse) => {
            this.loginForm.reset();
            this.handleSuccessLoginRouteChange(res);
        }, (error) => {
            this.handleLoginHttpError(error);
        });
    }

    private handleLoginHttpError(error: any) {
        const [message] = error.message;
        this.hasRequestError = true;
        this.httpErrorMessage = message;
    }
}


