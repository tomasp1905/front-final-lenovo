import { Component, OnInit, Input } from '@angular/core';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalProgramaEstableSocioService } from './modal-programa-estable-socio.service';

@Component({
  selector: 'app-detalle-programa-estable-socio',
  templateUrl: './detalle-programa-estable-socio.component.html'
})
export class DetalleProgramaEstableSocioComponent implements OnInit {

  @Input() programaEstable: ProgramaEstable;

  constructor(private modalProgramaEstableSocioService: ModalProgramaEstableSocioService) { }

  ngOnInit() {
  }

  cerrarModalSocio(){
    this.modalProgramaEstableSocioService.cerrarModal();
  }

}
