import { Component, OnInit, Input } from '@angular/core';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ModalProyectoEspecialService } from './modal-proyecto-especial.service';

@Component({
  selector: 'app-detalle-proyecto-especial',
  templateUrl: './detalle-proyecto-especial.component.html'
})
export class DetalleProyectoEspecialComponent implements OnInit {

  @Input() proyectoEspecial: ProyectoEspecial;

  constructor(private modalProyectoEspecialService:ModalProyectoEspecialService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProyectoEspecialService.cerrarModal();
  }

}
