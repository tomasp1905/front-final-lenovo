import { Component, OnInit, Input } from '@angular/core';

import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { ModalProyectoBianualAutorizadoService } from './modal-proyecto-bianual-autorizado.service';

@Component({
  selector: 'app-detalle-proyecto-bianual-autorizado',
  templateUrl: './detalle-proyecto-bianual-autorizado.component.html'
})
export class DetalleProyectoBianualAutorizadoComponent implements OnInit {

    @Input() proyecto: ProyectoBianual;

  constructor(private modalProyectoBianualAutorizadoService:ModalProyectoBianualAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
      this.modalProyectoBianualAutorizadoService.cerrarModal();
    }

}
