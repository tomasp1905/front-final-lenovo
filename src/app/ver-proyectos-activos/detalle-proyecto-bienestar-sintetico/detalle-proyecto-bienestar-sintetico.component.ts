import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ModalProyectoBienestarSinteticoService } from './modal-proyecto-bienestar-sintetico.service';

@Component({
  selector: 'app-detalle-proyecto-bienestar-sintetico',
  templateUrl: './detalle-proyecto-bienestar-sintetico.component.html'
})
export class DetalleProyectoBienestarSinteticoComponent implements OnInit {

    @Input() proyectoBienestar: ProyectoBienestar;

  constructor(private modalProyectoBienestarSinteticoService: ModalProyectoBienestarSinteticoService) { }

  ngOnInit() {
  }

  cerrarModalSintetico(){
    this.modalProyectoBienestarSinteticoService.cerrarModal();
  }

}
