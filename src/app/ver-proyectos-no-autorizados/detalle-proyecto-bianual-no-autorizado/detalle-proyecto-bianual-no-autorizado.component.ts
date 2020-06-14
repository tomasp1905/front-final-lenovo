import { Component, OnInit, Input } from '@angular/core';

import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { ModalProyectoBianualNoAutorizadoService } from './modal-proyecto-bianual-no-autorizado.service';

@Component({
  selector: 'app-detalle-proyecto-bianual-no-autorizado',
  templateUrl: './detalle-proyecto-bianual-no-autorizado.component.html'
})
export class DetalleProyectoBianualNoAutorizadoComponent implements OnInit {

    @Input() proyecto: ProyectoBianual;

  constructor(private modalProyectoBianualNoAutorizadoService:ModalProyectoBianualNoAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoBianualNoAutorizadoService.cerrarModal();
  }

}
