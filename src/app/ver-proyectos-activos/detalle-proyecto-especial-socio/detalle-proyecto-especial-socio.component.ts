import { Component, OnInit, Input } from '@angular/core';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialSocioService } from './modal-proyecto-especial-socio.service';

@Component({
  selector: 'app-detalle-proyecto-especial-socio',
  templateUrl: './detalle-proyecto-especial-socio.component.html'
})
export class DetalleProyectoEspecialSocioComponent implements OnInit {

    @Input() proyectoEspecial: ProyectoEspecial;

  constructor(private modalProyectoEspecialSocioService: ModalProyectoEspecialSocioService) { }

  ngOnInit() {
  }

  cerrarModalSocio(){
    this.modalProyectoEspecialSocioService.cerrarModal();
  }

}
