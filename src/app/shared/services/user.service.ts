import { Injectable } from '@angular/core';
import {CustomEmailAuthenticationService} from "../../core/authentication/custom-email-authentication.service";
import {IUser} from "../models/abstract-user";
import {IAuthStatus} from "../../core/authentication/models/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

   currentUser!: IUser
   isAuthenticated!: boolean;

  constructor(private authenticationService: CustomEmailAuthenticationService) {
    this.getCurrentUser();
    this.getAuthStatus();
  }

  getCurrentUser(): void {
    this.authenticationService.currentUser$.subscribe((user: IUser) => this.currentUser = user);
  }

  getAuthStatus(): void {
    this.authenticationService.authStatus$.subscribe((authStatus: IAuthStatus) => this.isAuthenticated = authStatus.isAuthenticated);
  }
}
