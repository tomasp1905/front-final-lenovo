import { Component, OnInit, Input } from '@angular/core';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialAutorizadoService } from './modal-proyecto-especial-autorizado.service';

@Component({
  selector: 'app-detalle-proyecto-especial-autorizado',
  templateUrl: './detalle-proyecto-especial-autorizado.component.html'
})
export class DetalleProyectoEspecialAutorizadoComponent implements OnInit {

  @Input() proyectoEspecial: ProyectoEspecial;

  constructor(private modalProyectoEspecialAutorizadoService:ModalProyectoEspecialAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoEspecialAutorizadoService.cerrarModal();
  }

}
