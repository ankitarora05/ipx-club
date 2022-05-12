import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../../shared/models/abstract-user";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {IUserPayload} from "../../../shared/models/user-payload";

@Injectable()
export class SignupService {

    constructor(private httpClient: HttpClient) {
    }

    signup(userPayload: IUserPayload): Observable<IUser> {
        return this.httpClient.post<IUser>(`${environment.baseUrl}/accounts/api/user`, userPayload);
    }
}
