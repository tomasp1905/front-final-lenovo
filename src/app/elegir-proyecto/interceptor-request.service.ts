import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorRequestService implements HttpInterceptor {

  public token: string;

  private AUTH_HEADER_KEY = 'Authorization';
  private AUTH_PREFIX = 'Bearer';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    // Funcion para validar token ->  if (token expirado) {
    // Lo mandas al login
    //  }

 /*   if (this._authService.getToken() != null)
      req = req.clone({ headers: req.headers.set(this.AUTH_HEADER_KEY, `${this.AUTH_PREFIX} ${this._authService.getToken()}`) });
*/
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.status === 404) {
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // lo mandas al login;
          }
        }
      }
      ));
  }
  
}
