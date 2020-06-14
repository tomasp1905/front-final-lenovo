import { Component, OnInit, Input } from '@angular/core';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialMiembroService } from './modal-proyecto-especial-miembro.service';

@Component({
  selector: 'app-detalle-proyecto-especial-miembro',
  templateUrl: './detalle-proyecto-especial-miembro.component.html'
})
export class DetalleProyectoEspecialMiembroComponent implements OnInit {

    @Input() proyectoEspecial: ProyectoEspecial;

  constructor(private modalProyectoEspecialMiembroService:ModalProyectoEspecialMiembroService) { }

  ngOnInit() {
  }

  cerrarModalMiembro(){
    this.modalProyectoEspecialMiembroService.cerrarModal();
  }

}
