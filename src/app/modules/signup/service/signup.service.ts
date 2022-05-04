import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../../shared/models/abstract-user";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

export interface IUserPayload {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
}

@Injectable()
export class SignupService {

    constructor(private httpClient: HttpClient) {
    }

    signup(userPayload: IUserPayload): Observable<IUser> {
        return this.httpClient.post<IUser>(`${environment.stageUrl}/accounts/api/user`, userPayload);
    }
}
