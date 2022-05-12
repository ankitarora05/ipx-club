import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/models/http/Response";
import {environment} from "../../../../environments/environment";
import {IChangePassword} from '../model/change-password';

@Injectable()
export class ChangePasswordService {

  constructor(private httpClient: HttpClient) { }

  changePassword(passwordPayload: IChangePassword): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${environment.baseUrl}/accounts/api/change-password`, passwordPayload)
  }
}
