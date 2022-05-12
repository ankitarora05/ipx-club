import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

export function transformHttpError(error: HttpErrorResponse | string) {
  let errorMessage;
  if(typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = error.message;
  }
  return throwError(errorMessage);

}
