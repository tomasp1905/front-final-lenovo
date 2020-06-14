import { Component, OnInit, Input } from '@angular/core';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalProgramaEstableService } from './modal-programa-estable.service';

@Component({
  selector: 'app-detalle-programa-estable',
  templateUrl: './detalle-programa-estable.component.html'
})
export class DetalleProgramaEstableComponent implements OnInit {

  @Input() programaEstable: ProgramaEstable;

  constructor(private modalServiceProgramaEstable:ModalProgramaEstableService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalServiceProgramaEstable.cerrarModal();
  }

}
