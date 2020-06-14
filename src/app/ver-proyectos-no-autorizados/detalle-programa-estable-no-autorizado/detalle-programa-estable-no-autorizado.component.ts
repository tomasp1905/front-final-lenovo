import { Component, OnInit, Input } from '@angular/core';

import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalProgramaEstableNoAutorizadoService } from './modal-programa-estable-no-autorizado.service';

@Component({
  selector: 'app-detalle-programa-estable-no-autorizado',
  templateUrl: './detalle-programa-estable-no-autorizado.component.html'
})
export class DetalleProgramaEstableNoAutorizadoComponent implements OnInit {

  @Input() programaEstable: ProgramaEstable;

  constructor(private modalProgramaEstableNoAutorizadoService: ModalProgramaEstableNoAutorizadoService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalProgramaEstableNoAutorizadoService.cerrarModal();
  }

}
