import {BehaviorSubject} from "rxjs";
import {IUser} from "../../../shared/models/abstract-user";

export enum AuthMode {
  CustomServer = 'Custom Server',
  Google = 'Google',
  Facebook = "Facebook",
  MetaMask = "MetaMask"
}

export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userType: String | UserType
  userId: string
}

export interface IServerAuthResponse {
  statusCode: number
  status: string
  data: {
    token: string
    expiry: string
    bearer: string
  }
  message?: string[]
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userType: UserType.USER,
  userId: '',
}

export interface ICredentials {
  email: string,
  password: string
}

export interface IJwt {
  userObj: {
    forcePasswordChange: boolean
  }
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>

  login(credentials: ICredentials): void

  logout(clearToken?: boolean): void

  getToken(): string
}
