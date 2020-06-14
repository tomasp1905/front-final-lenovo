import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ModalProyectoBienestarService } from './modal-proyecto-bienestar.service';

@Component({
  selector: 'app-detalle-proyecto-bienestar',
  templateUrl: './detalle-proyecto-bienestar.component.html'
})
export class DetalleProyectoBienestarComponent implements OnInit {

  @Input() proyectoBienestar: ProyectoBienestar;

  constructor(private modalProyectoBienestarService: ModalProyectoBienestarService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoBienestarService.cerrarModal();
  }

}
