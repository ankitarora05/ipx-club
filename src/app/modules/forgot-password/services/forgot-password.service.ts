import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/models/http/Response";

export interface IForgotPassword {
  email: string
}

@Injectable()
export class ForgotPasswordService {

  constructor(private httpClient: HttpClient) { }

  handleForgotPassword(forgotPasswordPayload: IForgotPassword): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${environment.stageUrl}/accounts/api/forgot-password`, forgotPasswordPayload);
  }
}
