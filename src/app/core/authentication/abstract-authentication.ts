import {BehaviorSubject, Observable, pipe, Subject} from "rxjs";
import {defaultAuthStatus, IAuthService, IAuthStatus, ICredentials, IServerAuthResponse} from "./models/auth";
import {IUser} from "../../shared/models/abstract-user";
import {User} from "../../shared/models/user";
import {CacheService} from "../../shared/services/cache.service";
import decode from 'jwt-decode';
import {filter, map, mergeMap, tap} from "rxjs/operators";

export abstract class AbstractAuthentication extends CacheService implements IAuthService {
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)))
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(this.getAndUpdateUserIfAuthenticated)

  protected constructor() {
    super();
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }

  login(credentials: ICredentials): Observable<IServerAuthResponse> {
    this.clearToken()
    let loginApiResponse$ = new Subject<IServerAuthResponse>();
    let response!: any;
    this.authProvider(credentials)
      .pipe(
        tap(apiResponse => {
          response = apiResponse
          return apiResponse
        }),
        map((apiResponse: any) => {
          this.setToken(apiResponse.data.token)
          return this.getAuthStatusFromToken()
        }), tap((status) => this.authStatus$.next(status)),
        this.getAndUpdateUserIfAuthenticated,
        tap(() => loginApiResponse$.next(response))
      ).subscribe();
    return loginApiResponse$
  }

  logout(clearToken?: boolean) {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  protected clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken();
    if (jwt) {
      const payload = decode(jwt) as any
      return Date.now() >= payload.expiry * 1000
    }
    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()))
  }

  protected abstract authProvider(credentials: ICredentials): Observable<IServerAuthResponse>

  protected abstract transformJwtToken(token: unknown): IAuthStatus

  protected abstract getCurrentUser(): Observable<User>
}
