import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ModalDetalleBienestarMisProyectosService } from './modal-detalle-bienestar-mis-proyectos.service';


@Component({
  selector: 'app-detalle-bienestar-mis-proyectos',
  templateUrl: './detalle-bienestar-mis-proyectos.component.html'
})
export class DetalleBienestarMisProyectosComponent implements OnInit {

  constructor(private modalDetalleBienestarMisProyectosService:ModalDetalleBienestarMisProyectosService) { }

  @Input() proyectoBienestar: ProyectoBienestar;

  ngOnInit() {
  }

  cerrarModal(){
    this.modalDetalleBienestarMisProyectosService.cerrarModal();
  }

}
