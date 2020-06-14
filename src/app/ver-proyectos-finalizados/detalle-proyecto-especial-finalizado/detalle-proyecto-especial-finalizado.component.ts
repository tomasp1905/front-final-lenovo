import { Component, OnInit, Input } from '@angular/core';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialFinalizadoService } from './modal-proyecto-especial-finalizado.service';

@Component({
  selector: 'app-detalle-proyecto-especial-finalizado',
  templateUrl: './detalle-proyecto-especial-finalizado.component.html'
})
export class DetalleProyectoEspecialFinalizadoComponent implements OnInit {

  @Input() proyectoEspecial: ProyectoEspecial;

  constructor(private modalProyectoEspecialFinalizadoService:ModalProyectoEspecialFinalizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoEspecialFinalizadoService.cerrarModal();
  }

}
