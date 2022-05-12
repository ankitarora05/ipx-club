import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from "rxjs/operators";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      filter(event => event instanceof HttpResponse),
      map((event: any) => this.validateResponseCode(event))
    );
  }

  /*
  * By default every API response will be 200 (success).
  * `statusCode` from API will be validated and observables will be rejected for easy consumption at the services.
  * */
  private validateResponseCode(event: HttpResponse<any>) {
    if (event?.body?.statusCode >= 400) {
      throw new HttpErrorResponse({
        error: event.body,
        status: event.body.statusCode,
        statusText: event.body.message
      })
    }
    return event;
  }
}
