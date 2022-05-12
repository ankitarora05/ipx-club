import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForgotPasswordService} from "../services/forgot-password.service";
import {UserInputValidator} from "../../../shared/validators/user-input-validator";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  hasRequestError: boolean = false;
  httpErrorMessage!: string;
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
    this.forgotPasswordForm.valid && this.fpService.handleForgotPassword(forgotPasswordForm.value).subscribe(this.handleChangePasswordSuccess(),
      this.handleChangePasswordFailure());
  }

  private handleChangePasswordSuccess() {
    return () => {
      this.hasApiResponse = true;
      this.forgotPasswordForm.reset();
    };
  }

  private handleChangePasswordFailure() {
    return (error: HttpErrorResponse) => {
      this.hasRequestError = true;
      this.httpErrorMessage = error.statusText;
    };
  }

  private buildForgotPasswordForm(): FormGroup {
    return this.fb.group({
      email: [null, [UserInputValidator.emailValidator, Validators.required]]
    });
  }
}
