import { Component, OnInit } from '@angular/core';
import { CodigoRecuperacionPayload } from '../recuperacion/CodigoRecuperacionPayload';
import { RestaurarContraService } from '../restaurar-contra.service';

import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html'
})
export class VerificarCodigoComponent implements OnInit {

  codigoRecuperacionPayload: CodigoRecuperacionPayload = new CodigoRecuperacionPayload()

  constructor(public restaurarContraService: RestaurarContraService, private router: Router) { }

  ngOnInit() {
  }

  public verificarCodigo(): void {
    this.restaurarContraService.verificarCodigo(this.codigoRecuperacionPayload).
      subscribe(response => {
      this.router.navigate(['/cambiar-pass']);
      swal.fire('Recuperacion realizada con éxito', 'Genere una nueva contraseña', 'success')
    console.log(this.codigoRecuperacionPayload.username);
    console.log(this.codigoRecuperacionPayload.codigoDeRecuperacion);
    })
  }

}
