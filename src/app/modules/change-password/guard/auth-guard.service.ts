import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../../../shared/services/user.service";
import {WindowLocation} from "../../../shared/models/window-location";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isAuthenticated) {
      if (state.url === WindowLocation.LOGIN)  return this.router.navigate([WindowLocation.DASHBOARD])
      return true
    }
    if(state.url === WindowLocation.LOGIN) return true
    return this.router.navigate([WindowLocation.LOGIN])
  }
}
