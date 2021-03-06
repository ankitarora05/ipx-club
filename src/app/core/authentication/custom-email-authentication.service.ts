import {Injectable} from '@angular/core';
import {AbstractAuthentication} from "./abstract-authentication";
import {Observable, of} from "rxjs";
import {defaultAuthStatus, IAuthStatus, ICredentials, IServerAuthResponse} from "./models/auth";
import {User} from "../../shared/models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IJwtToken} from "./models/jwtToken";

@Injectable({
  providedIn: "root"
})
export class CustomEmailAuthenticationService extends AbstractAuthentication {
  private userObj: any;

  constructor(private httpClient: HttpClient) {
    super()
  }

  protected authProvider(credentials: ICredentials): Observable<IServerAuthResponse> {
    return this.httpClient.post<any>(` ${environment.baseUrl}/accounts/api/login`, credentials);
  }

  protected getCurrentUser(): Observable<User> {
    return of(User.Build(this.userObj));
  }

  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    if (!token) {
      return defaultAuthStatus;
    }
    const {userObj} = token;
    this.userObj = {...userObj};
    return {
      isAuthenticated: !!userObj.email,
      userId: userObj._id,
      userType: userObj.userType
    }
  }
}
