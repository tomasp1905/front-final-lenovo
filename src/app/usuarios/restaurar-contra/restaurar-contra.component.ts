import { Component, OnInit } from '@angular/core';
import { NuevoPasswordPayload } from './recuperacion/NuevoPasswordPayload';
import { CodigoRecuperacionPayload } from './recuperacion/CodigoRecuperacionPayload';
import { RestaurarContraService } from './restaurar-contra.service';

import swal from 'sweetalert2';

import { IniciarRecuperacionPayload } from './recuperacion/IniciarRecuperacionPayload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurar-contra',
  templateUrl: './restaurar-contra.component.html'
})
export class RestaurarContraComponent implements OnInit {

  iniciarRecuperacionPayload: IniciarRecuperacionPayload = new IniciarRecuperacionPayload()

  constructor(public restaurarContraService: RestaurarContraService, private router: Router) { }

  ngOnInit() {
  }

  public iniciarRecuperacion(): void {
    this.restaurarContraService.iniciarRecuperacion(this.iniciarRecuperacionPayload).
      subscribe(response => {
      this.router.navigate(['/verificar-codigo']);
      swal.fire('Recuperación iniciada con éxito', 'Ingrese a su correo y obtenga el código de verificación', 'success')

    }, err => {
      if(err.status == 500){
          swal.fire('Error de autenticación', 'Clave  incorrecta', 'error');
      }
    }
  );
  }

}
