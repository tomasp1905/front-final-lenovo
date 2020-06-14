import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['roleIndividual'] as string;
    console.log(role);
    if(this.authService.hasRole(role)){
      return true;
    }

    let roles = next.data['role'] as string[];
    let hasRole = false;
    roles.forEach(role => {
      if (this.authService.hasRole(role)) {
        hasRole = true;
      }
    });
    if (hasRole) { return true }


    swal.fire('Acceso denegado', `Usuario con clave ${this.authService.usuario.username} no tiene acceso a este recurso`, 'warning')
    this.router.navigate(['/elegir-proyecto']);
    return false;

  }

}
