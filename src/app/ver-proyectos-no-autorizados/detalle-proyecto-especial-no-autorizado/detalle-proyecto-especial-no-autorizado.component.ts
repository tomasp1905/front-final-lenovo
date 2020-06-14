import { Component, OnInit, Input } from '@angular/core';

import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialNoAutorizadoService } from './modal-proyecto-especial-no-autorizado.service';

@Component({
  selector: 'app-detalle-proyecto-especial-no-autorizado',
  templateUrl: './detalle-proyecto-especial-no-autorizado.component.html'
})
export class DetalleProyectoEspecialNoAutorizadoComponent implements OnInit {

    @Input() proyectoEspecial: ProyectoEspecial;

  constructor(private modalProyectoEspecialNoAutorizadoService:ModalProyectoEspecialNoAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoEspecialNoAutorizadoService.cerrarModal();
  }

}
