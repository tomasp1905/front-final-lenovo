import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { ModalDetalleBianualMisProyectosService } from './modal-detalle-bianual-mis-proyectos.service';

@Component({
  selector: 'app-detalle-bianual-mis-proyectos',
  templateUrl: './detalle-bianual-mis-proyectos.component.html'
})
export class DetalleBianualMisProyectosComponent implements OnInit {

  constructor(private modalDetalleBianualMisProyectos: ModalDetalleBianualMisProyectosService) { }

  @Input() proyecto: ProyectoBianual;

  ngOnInit() {
  }

  cerrarModal(){
    this.modalDetalleBianualMisProyectos.cerrarModal();
  }



}
