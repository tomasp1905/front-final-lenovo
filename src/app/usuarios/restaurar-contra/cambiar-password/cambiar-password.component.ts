import { Component, OnInit } from '@angular/core';
import { NuevoPasswordPayload } from '../recuperacion/NuevoPasswordPayload';
import { RestaurarContraService } from '../restaurar-contra.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html'
})
export class CambiarPasswordComponent implements OnInit {

  nuevoPasswordPayload: NuevoPasswordPayload = new NuevoPasswordPayload();

  constructor(public restaurarContraService: RestaurarContraService, private router: Router) { }

  ngOnInit() {
  }

  public cambiarPassword(): void {
    this.restaurarContraService.cambiarPassword(this.nuevoPasswordPayload).
      subscribe(response => {
      this.router.navigate(['/login']);
      swal.fire('Operación realizada con éxito', 'Nueva contraseña generada', 'success')
    }, err => {
      if(err.status == 500){
          swal.fire('Error de recuperación', 'Clave o Código incorrecto', 'error');
      }
    }
  );
  }

}
