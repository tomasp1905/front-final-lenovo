import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { VerProyectoService } from '../ver-proyecto.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html'
})
export class DetalleProyectoComponent implements OnInit {

    @Input() proyecto: ProyectoBianual;


  constructor(private modalService:ModalService ) { }

  ngOnInit() {

  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
