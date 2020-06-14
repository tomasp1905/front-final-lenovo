import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ModalProyectoBienestarAutorizadoService } from './modal-proyecto-bienestar-autorizado.service';

@Component({
  selector: 'app-detalle-proyecto-bienestar-autorizado',
  templateUrl: './detalle-proyecto-bienestar-autorizado.component.html'
})
export class DetalleProyectoBienestarAutorizadoComponent implements OnInit {

  @Input() proyectoBienestar:ProyectoBienestar;

  constructor(private modalProyectoBienestarAutorizadoService:ModalProyectoBienestarAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoBienestarAutorizadoService.cerrarModal();
  }

}
