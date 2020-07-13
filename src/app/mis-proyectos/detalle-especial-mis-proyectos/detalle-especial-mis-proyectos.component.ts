import { Component, OnInit, Input } from '@angular/core';
import { ModalDetalleEspecialMisProyectosService } from './modal-detalle-especial-mis-proyectos.service';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';

@Component({
  selector: 'app-detalle-especial-mis-proyectos',
  templateUrl: './detalle-especial-mis-proyectos.component.html'
})
export class DetalleEspecialMisProyectosComponent implements OnInit {

  constructor(private modalDetalleEspecialMisProyectosService:ModalDetalleEspecialMisProyectosService) { }

    @Input() proyectoEspecial: ProyectoEspecial;

  ngOnInit() {
  }

  cerrarModal(){
    this.modalDetalleEspecialMisProyectosService.cerrarModal();
  }

}
