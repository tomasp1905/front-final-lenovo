import { Component, OnInit, Input } from '@angular/core';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialSinteticoService } from './modal-proyecto-especial-sintetico.service';

@Component({
  selector: 'app-detalle-proyecto-especial-sintetico',
  templateUrl: './detalle-proyecto-especial-sintetico.component.html'
})
export class DetalleProyectoEspecialSinteticoComponent implements OnInit {

  @Input() proyectoEspecial: ProyectoEspecial;

  constructor(private modalProyectoEspecialSinteticoService:ModalProyectoEspecialSinteticoService) { }

  ngOnInit() {
  }

  cerrarModalSintetico(){
    this.modalProyectoEspecialSinteticoService.cerrarModal();
  }

}
