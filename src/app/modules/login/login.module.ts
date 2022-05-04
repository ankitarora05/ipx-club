import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {CustomEmailAuthenticationService} from "../../core/authentication/custom-email-authentication.service";

const routes: Routes = [{
  path: "login", component: LoginComponent
}]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [CustomEmailAuthenticationService]
})
export class LoginModule {
}
