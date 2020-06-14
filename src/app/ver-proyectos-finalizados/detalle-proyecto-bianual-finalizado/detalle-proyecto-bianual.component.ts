import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { ModalBianualService } from './modal-service-bianual.service';

@Component({
  selector: 'app-detalle-proyecto-bianual',
  templateUrl: './detalle-proyecto-bianual.component.html'

})
export class DetalleProyectoBianualComponent implements OnInit {

  @Input() proyecto: ProyectoBianual;

  constructor(private modalBianualService:ModalBianualService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalBianualService.cerrarModal();
  }

}
