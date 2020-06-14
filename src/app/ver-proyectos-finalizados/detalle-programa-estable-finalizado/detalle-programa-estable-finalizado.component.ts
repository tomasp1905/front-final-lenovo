import { Component, OnInit, Input } from '@angular/core';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalProgramaEstableFinalizadoService } from './modal-programa-estable-finalizado.service';

@Component({
  selector: 'app-detalle-programa-estable-finalizado',
  templateUrl: './detalle-programa-estable-finalizado.component.html'
})
export class DetalleProgramaEstableFinalizadoComponent implements OnInit {

  @Input() programaEstable: ProgramaEstable;

  constructor(private modalProgramaEstableFinalizadoService:ModalProgramaEstableFinalizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProgramaEstableFinalizadoService.cerrarModal();
  }

}
