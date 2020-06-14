import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { ModalMiembroService } from './modal-miembro.service';

@Component({
  selector: 'app-detalle-miembro',
  templateUrl: './detalle-miembro.component.html'
})
export class DetalleMiembroComponent implements OnInit {

  @Input() proyecto: ProyectoBianual;

  constructor(private modalMiembroService:ModalMiembroService) { }

  ngOnInit() {
  }

  cerrarModalMiembro(){
    this.modalMiembroService.cerrarModal();
  }

}
