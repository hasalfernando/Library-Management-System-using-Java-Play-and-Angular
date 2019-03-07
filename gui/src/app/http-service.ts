import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.onError(err);
        }
        return throwError(err);
      }));
  }

  private onError(response: HttpErrorResponse): void {
    const clientErrorMessage = this.handleClientSideError(response.status);
    if (clientErrorMessage) {
      return;
    }

    const serverErrorMessage = this.handleServerError(response.error);
    if (serverErrorMessage) {
    }
  }

  private handleClientSideError(status: number): string {
    switch (status) {
      case 0:
        return 'NO INTERNET CONNECTION';
      case 404:
        return 'REQUEST FAILURE';
      default:
        return;
    }
  }

  private handleServerError(errorResponse: any): string {
    return '';
  }
}
