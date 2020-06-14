import { Component, OnInit, Input } from '@angular/core';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ModalProyectoBienestarMiembroService } from './modal-proyecto-bienestar-miembro.service';

@Component({
  selector: 'app-detalle-proyecto-bienestar-miembro',
  templateUrl: './detalle-proyecto-bienestar-miembro.component.html'
})
export class DetalleProyectoBienestarMiembroComponent implements OnInit {

  @Input() proyectoBienestar: ProyectoBienestar;

  constructor(private modalProyectoBienestarMiembroService: ModalProyectoBienestarMiembroService) { }

  ngOnInit() {
  }

  cerrarModalMiembro(){
    this.modalProyectoBienestarMiembroService.cerrarModal();
  }

}
