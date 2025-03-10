import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService, private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable < HttpEvent < any >> {

    return next.handle(req).pipe(
      catchError(e => {
        if (e.status===401){ //cuando carece de credenciales validas para autenticacion


          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login'])

        }

        if (e.status===403){  //403 es cuando no tiene el rol correspondiente
          swal.fire('Acceso denegado', `Usuario con clave ${this.authService.usuario.username} no tiene acceso a este recurso`, 'warning')
          this.router.navigate(['/elegir-proyecto'])

        }
      return throwError(e);
      })
    );
  }
}
