import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ModalProyectoBienestarFinalizadoService } from './modal-proyecto-bienestar-finalizado.service';

@Component({
  selector: 'app-detalle-proyecto-bienestar-finalizado',
  templateUrl: './detalle-proyecto-bienestar-finalizado.component.html'
})
export class DetalleProyectoBienestarFinalizadoComponent implements OnInit {

  @Input() proyectoBienestar:ProyectoBienestar;

  constructor(private modalProyectoBienestarFinalizadoService:ModalProyectoBienestarFinalizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoBienestarFinalizadoService.cerrarModal();
  }

}
