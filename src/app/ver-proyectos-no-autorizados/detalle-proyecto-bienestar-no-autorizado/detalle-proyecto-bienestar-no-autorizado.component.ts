import { Component, OnInit, Input } from '@angular/core';

import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ModalProyectoBienestarNoAutorizadoService } from './modal-proyecto-bienestar-no-autorizado.service';

@Component({
  selector: 'app-detalle-proyecto-bienestar-no-autorizado',
  templateUrl: './detalle-proyecto-bienestar-no-autorizado.component.html'
})
export class DetalleProyectoBienestarNoAutorizadoComponent implements OnInit {

  @Input() proyectoBienestar:ProyectoBienestar;

  constructor(private modalProyectoBienestarNoAutorizadoService: ModalProyectoBienestarNoAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoBienestarNoAutorizadoService.cerrarModal();
  }

}
