import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForgotPasswordComponent} from './components/forgot-password.component';
import {ForgotPasswordService} from "./services/forgot-password.service";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{
  path: "forgot-password", component: ForgotPasswordComponent
}]

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordModule {
}
