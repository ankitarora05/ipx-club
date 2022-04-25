import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
@Injectable({providedIn:'root'})
export class ApiService {
 
  baseURL: string = environment.baseUrl;
 
  constructor(private http: HttpClient) {
  }
 
  addEmail(email: string): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({"email":email});
    return this.http.post(this.baseURL + 'v1/waitlist ', body,{'headers':headers})
  }
 
}
 