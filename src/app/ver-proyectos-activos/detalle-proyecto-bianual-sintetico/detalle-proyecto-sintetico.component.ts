import { Component, OnInit, Input } from '@angular/core';
import { ModalSinteticoService } from './modal-sintetico.service';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';

@Component({
  selector: 'app-detalle-proyecto-sintetico',
  templateUrl: './detalle-proyecto-sintetico.component.html'
})
export class DetalleProyectoSinteticoComponent implements OnInit {

  @Input() proyecto: ProyectoBianual;

  constructor(private modalSinteticoService:ModalSinteticoService) { }

  ngOnInit() {
  }

  cerrarModalSintetico(){
    this.modalSinteticoService.cerrarModal();
  }

}
