import { Component, OnInit, Input } from '@angular/core';

import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalProgramaEstableAutorizadoService } from './modal-programa-estable-autorizado.service';

@Component({
  selector: 'app-detalle-programa-estable-autorizado',
  templateUrl: './detalle-programa-estable-autorizado.component.html'
})
export class DetalleProgramaEstableAutorizadoComponent implements OnInit {

  @Input() programaEstable: ProgramaEstable;

  constructor(private modalProgramaEstableAutorizadoService:ModalProgramaEstableAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProgramaEstableAutorizadoService.cerrarModal();
  }

}
