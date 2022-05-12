import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInputValidator} from "../../../shared/validators/user-input-validator";
import {CustomEmailAuthenticationService} from "../../../core/authentication/custom-email-authentication.service";
import {IServerAuthResponse} from "../../../core/authentication/models/auth";
import {LoginRouter} from "../router/login-router";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends LoginRouter implements OnInit {
  loginForm!: FormGroup;
  hasRequestError: boolean = false;
  formSubmitted: boolean = false;
  httpErrorMessage!: string;
  awaitedForApiResponse: boolean = false;

  constructor(private fb: FormBuilder,
              private loginService: CustomEmailAuthenticationService,
              router: Router) {
    super(router);
  }

  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm(): FormGroup {
    return this.fb.group({
      email: [null, [UserInputValidator.emailValidator, Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login(submittedForm: FormGroup): void {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.awaitedForApiResponse = true;
      this.loginService.login(submittedForm.value)
        .subscribe(this.handleLoginSuccess(), this.handleLoginFailure());
    }
  }

  private handleLoginSuccess() {
    return (res: IServerAuthResponse) => {
      this.awaitedForApiResponse = false;
      this.loginForm.reset();
      this.handleSuccessLoginRouteChange(res);
    };
  }

  private handleLoginFailure() {
    return (error: HttpErrorResponse) => {
      this.awaitedForApiResponse = false;
      this.hasRequestError = true;
      this.httpErrorMessage = error.statusText;
    };
  }
}


