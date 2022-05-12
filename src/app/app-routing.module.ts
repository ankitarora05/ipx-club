import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuardService} from "./modules/login/guards/login-guard.service";
import {LandingPageComponent} from "./core/components/landing-page/landing-page.component";
import {ChangePasswordGuard} from "./modules/change-password/guard/change-password.guard";

const routes: Routes = [
  {
    path: "", component: LandingPageComponent
  },
  {
    path: "",
    loadChildren: () => import("./modules/signup/signup.module").then(m => m.SignupModule)
  },
  {
    path: "",
    loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule),
    canActivate: [LoginGuardService]
  },
  {
    path: "",
    loadChildren: () => import("./modules/forgot-password/forgot-password.module").then(m => m.ForgotPasswordModule)
  },
  {
    path: "",
    loadChildren: () => import("./modules/change-password/change-password.module").then(m => m.ChangePasswordModule),
    canActivate: [ChangePasswordGuard]
  },
  {
    path: "",
    loadChildren: () => import("./modules/dashboard/dashboard.module").then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
