import { Component, OnInit, Input } from '@angular/core';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalDetalleEstableMisProyectosService } from './modal-detalle-estable-mis-proyectos.service';

@Component({
  selector: 'app-detalle-estable-mis-proyectos',
  templateUrl: './detalle-estable-mis-proyectos.component.html'
})
export class DetalleEstableMisProyectosComponent implements OnInit {

  constructor(private modalDetalleEstableMisProyectosService:ModalDetalleEstableMisProyectosService) { }

  @Input() programaEstable: ProgramaEstable;

  ngOnInit() {
  }

  cerrarModal(){
    this.modalDetalleEstableMisProyectosService.cerrarModal();
  }

}
