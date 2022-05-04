import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "../services/change-password.service";
import {UserInputValidator} from "../../../shared/validators/user-input-validator";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
    changePasswordForm!: FormGroup;
    hasRequestError: boolean = false
    httpErrorMessage: boolean = false
    formSubmitted: boolean = false

    constructor(private fb: FormBuilder,
                private router: Router,
                private changePasswordService: ChangePasswordService,
                private userService: UserService) {
    }

    get password() {
        return this.changePasswordForm.get("password");
    }

    get confirmPassword() {
        return this.changePasswordForm.get("confirmPassword")
    }

    ngOnInit(): void {
        this.changePasswordForm = this.buildResetPasswordForm();
    }

    reset(resetForm: FormGroup): void {
        this.formSubmitted = true;
        const {_id} = this.userService.currentUser
        const updatedPasswordPayload = {...resetForm.value , _id}
        this.changePasswordForm.valid && this.changePasswordService.changePassword(updatedPasswordPayload)
          .subscribe((response) => {
              this.changePasswordForm.reset();
              this.router.navigateByUrl("/dashboard")
          }, (error)=> {
              this.handleChangePasswordHttpError(error)
          })
    }

    private buildResetPasswordForm(): FormGroup {
        return this.fb.group({
            password: [null, [UserInputValidator.passwordValidator, Validators.required]],
            confirmPassword: [null, Validators.required],

        }, {
            validator: UserInputValidator.passwordMatchValidator
        });
    }

    private handleChangePasswordHttpError(error: any) {
        const [message] = error.message;
        this.hasRequestError = true;
        this.httpErrorMessage = message;
    }
}
