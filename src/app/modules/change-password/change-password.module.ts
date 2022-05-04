import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './components/change-password.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ChangePasswordService} from "./services/change-password.service";
import {UserService} from "../../shared/services/user.service";

const routes: Routes = [{
  path: "change-password", component: ChangePasswordComponent
}]

@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    ChangePasswordService,
    UserService
  ]
})
export class ChangePasswordModule {
}
