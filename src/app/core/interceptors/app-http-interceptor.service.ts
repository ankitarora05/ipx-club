import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            this.validateApiStatusCode()
        );
    }

    /*
    * By default every API response will be 200 (success).
    * `statusCode` from API will be validated and observables will be rejected for easy consumption at the services.
    * */
    private validateApiStatusCode() {
        return tap((event: any) => {
            if (event && event instanceof HttpResponse) {
                if (event?.body?.statusCode >= 400) {
                    throw event.body;
                }
            }
        });
    }
}
