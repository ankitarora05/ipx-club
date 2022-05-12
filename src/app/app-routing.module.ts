import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./core/components/landing-page/landing-page.component";
import {AuthGuard} from "./modules/change-password/guard/auth-guard.service";

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
    canActivate: [AuthGuard]
  },
  {
    path: "",
    loadChildren: () => import("./modules/forgot-password/forgot-password.module").then(m => m.ForgotPasswordModule)
  },
  {
    path: "",
    loadChildren: () => import("./modules/change-password/change-password.module").then(m => m.ChangePasswordModule),
    canActivate: [AuthGuard]
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
