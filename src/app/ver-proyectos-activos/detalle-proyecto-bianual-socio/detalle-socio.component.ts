import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { ModalSocioService } from './modal-socio.service';

@Component({
  selector: 'app-detalle-socio',
  templateUrl: './detalle-socio.component.html'
})
export class DetalleSocioComponent implements OnInit {

  @Input() proyecto: ProyectoBianual;

  constructor(private modalSocioService: ModalSocioService) { }

  ngOnInit() {
  }

  cerrarModalSocio(){
    this.modalSocioService.cerrarModal();
  }

}
