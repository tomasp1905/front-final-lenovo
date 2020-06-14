import { Component, OnInit, Input } from '@angular/core';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalProgramaEstableMiembroService } from './modal-programa-estable-miembro.service';

@Component({
  selector: 'app-detalle-programa-estable-miembro',
  templateUrl: './detalle-programa-estable-miembro.component.html'
})
export class DetalleProgramaEstableMiembroComponent implements OnInit {

  @Input() programaEstable: ProgramaEstable;

  constructor(private modalProgramaEstableMiembroService: ModalProgramaEstableMiembroService) { }

  ngOnInit() {
  }

  cerrarModalMiembro(){
    this.modalProgramaEstableMiembroService.cerrarModal();
  }

}
